/**
 * API Route: Fetch Affiliate Properties from Supabase
 * Path: /api/properties/affiliate
 * Method: GET
 * FIXED VERSION - Better error handling
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    console.log('📥 Fetching properties from Supabase...');

    // Fetch all active properties
    const { data: properties, error } = await supabase
      .from('affiliate_properties')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch properties', details: error.message },
        { status: 500 }
      );
    }

    if (!properties || properties.length === 0) {
      console.log('⚠️ No properties found');
      return NextResponse.json([]);
    }

    console.log(`✅ Found ${properties.length} properties`);

    // Transform properties to match frontend interface
    const transformedProperties = properties.map((property) => {
      // Fix image URLs - handle Cloudinary paths
      let images = property.images || { main: '/images/placeholder.jpg', gallery: [] };
      
      // If images.main has a relative Cloudinary path, make it absolute
      if (typeof images === 'object' && images.main) {
        if (images.main.startsWith('https://res.cloudinary.com/')) {
          // Already absolute - keep it
        } else if (images.main.includes('cloudinary') && !images.main.startsWith('http')) {
          // Relative Cloudinary path - make absolute
          images = {
            main: `https://res.cloudinary.com/${images.main}`,
            gallery: images.gallery || []
          };
        }
      }

      return {
        id: property.id,
        name: property.name || 'נכס ללא שם',
        description: property.description || '',
        property_type: property.property_type || 'צימר',
        capacity: property.capacity || 2,
        location: property.location || { city: 'ישראל', area: 'לא צוין' },
        images: images,
        price_range: property.price_range || 'לפי בקשה',
        rating: property.rating || undefined,
        features: property.features || [],
        affiliate: {
          affiliateUrl: property.affiliate_url || // Fallback to old column name
                       property.affiliate?.affiliateUrl || 
                       property.affiliate?.originalUrl || 
                       'https://tzimer360.co.il',
          provider: property.affiliate?.provider || 'tzimer360',
        },
      };
    });

    // Log sample for debugging
    if (transformedProperties.length > 0) {
      console.log('📦 Sample property:', {
        id: transformedProperties[0].id,
        name: transformedProperties[0].name,
        images_type: typeof transformedProperties[0].images,
        has_main: transformedProperties[0].images?.main ? 'yes' : 'no',
      });
    }

    return NextResponse.json(transformedProperties);
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function HEAD() {
  try {
    const { count, error } = await supabase
      .from('affiliate_properties')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return new NextResponse(null, {
      status: 200,
      headers: {
        'X-Property-Count': String(count || 0),
        'X-Supabase-Status': 'connected',
      },
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 503,
      headers: {
        'X-Supabase-Status': 'error',
      },
    });
  }
}
