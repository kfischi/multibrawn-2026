/**
 * API Route: Run Tzimer360 Scraper
 * Path: /api/scraper/run
 * Method: POST
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Tzimer360Scraper from '@/lib/scrapers/tzimer360-puppeteer-scraper';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, provider, maxResults = 3 } = body;

    if (action !== 'scrape') {
      return NextResponse.json(
        { error: 'Invalid action. Use "scrape".' },
        { status: 400 }
      );
    }

    if (provider !== 'tzimer360') {
      return NextResponse.json(
        { error: 'Invalid provider. Only "tzimer360" is supported.' },
        { status: 400 }
      );
    }

    const authHeader = request.headers.get('authorization');
    const secretKey = process.env.SCRAPER_SECRET_KEY || 'your-secret-key-here';
    
    if (authHeader !== `Bearer ${secretKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log(`🤖 Starting Puppeteer scraper: ${provider}, max: ${maxResults}`);

    const scraper = new Tzimer360Scraper('affiliate26');
    
    // Use known working location IDs
    const knownLocations = ['C4620', 'C4681', 'C4617'];
    const properties = await scraper.scrapeMultiple(knownLocations.slice(0, maxResults));
    
    // Clean up browser
    await scraper.close();

    console.log(`📊 Scraped ${properties.length} properties`);

    const results = {
      inserted: 0,
      updated: 0,
      errors: 0,
      details: [] as any[],
    };

    for (const property of properties) {
      try {
        const { data: existing } = await supabase
          .from('affiliate_properties')
          .select('id')
          .eq('id', property.id)
          .single();

        if (existing) {
          const { error } = await supabase
            .from('affiliate_properties')
            .update({
              name: property.name,
              description: property.description,
              property_type: property.propertyType,
              capacity: property.capacity,
              price_range: property.priceRange,
              rating: property.rating,
              location: property.location,
              images: property.images,
              affiliate: property.affiliate,
              features: property.features,
              amenities: property.amenities,
              booking_info: property.bookingInfo,
              pricing: property.pricing,
              reviews: property.reviews,
              host_info: property.hostInfo,
              area_info: property.areaInfo,
              seo_metadata: property.seoMetadata,
              status: property.status,
              last_scraped: new Date().toISOString(),
            })
            .eq('id', property.id);

          if (error) throw error;
          results.updated++;
          results.details.push({ id: property.id, action: 'updated' });
        } else {
          const { error } = await supabase
            .from('affiliate_properties')
            .insert({
              id: property.id,
              name: property.name,
              description: property.description,
              property_type: property.propertyType,
              capacity: property.capacity,
              price_range: property.priceRange,
              rating: property.rating,
              location: property.location,
              images: property.images,
              affiliate: property.affiliate,
              features: property.features,
              amenities: property.amenities,
              booking_info: property.bookingInfo,
              pricing: property.pricing,
              reviews: property.reviews,
              host_info: property.hostInfo,
              area_info: property.areaInfo,
              seo_metadata: property.seoMetadata,
              status: property.status,
              last_scraped: new Date().toISOString(),
            });

          if (error) throw error;
          results.inserted++;
          results.details.push({ id: property.id, action: 'inserted' });
        }
      } catch (error: any) {
        console.error(`❌ Error saving property ${property.id}:`, error.message);
        results.errors++;
        results.details.push({ 
          id: property.id, 
          action: 'error', 
          error: error.message 
        });
      }
    }

    console.log(`✅ Results: ${results.inserted} inserted, ${results.updated} updated, ${results.errors} errors`);

    return NextResponse.json({
      success: true,
      message: 'Scraping completed',
      results,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('❌ Scraper API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Scraper API is running',
    usage: 'POST /api/scraper/run with { action: "scrape", provider: "tzimer360", maxResults: 3 }',
    auth: 'Required: Authorization header with Bearer token',
  });
}
