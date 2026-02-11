import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check env vars
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Fetching from Supabase...');

    // Direct fetch to Supabase
    const response = await fetch(
      `${supabaseUrl}/rest/v1/affiliate_properties?select=*&status=eq.active&order=created_at.desc`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Supabase fetch failed:', response.status);
      return NextResponse.json(
        { error: 'Failed to fetch from database' },
        { status: 500 }
      );
    }

    const properties = await response.json();
    console.log(`Found ${properties.length} properties`);

    // Transform to match frontend
    const transformed = properties.map((p: any) => ({
      id: p.id,
      name: p.name || 'נכס',
      description: p.description || '',
      property_type: p.property_type || 'צימר',
      capacity: p.capacity || 2,
      location: p.location || { city: 'ישראל', area: 'כללי' },
      images: p.images || { main: '/images/placeholder.jpg', gallery: [] },
      price_range: p.price_range || 'לפי בקשה',
      rating: p.rating,
      features: p.features || [],
      affiliate: {
        affiliateUrl: p.affiliate_url || p.affiliate?.affiliateUrl || 'https://tzimer360.co.il',
        provider: 'tzimer360',
      },
    }));

    return NextResponse.json(transformed);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
