/**
 * API Route: Run Tzimer360 Scraper
 * Path: /api/scraper/run
 * Method: POST
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Tzimer360Scraper from '@/lib/scrapers/tzimer360-scraper';

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

    console.log(`🤖 Starting scraper: ${provider}, max: ${maxResults}`);

    const scraper = new Tzimer360Scraper('affiliate26');
    
    // Return empty for now since scraper doesn't work without browser
    const properties: any[] = [];

    console.log(`📊 Scraped ${properties.length} properties`);

    const results = {
      inserted: 0,
      updated: 0,
      errors: 0,
      details: [] as any[],
    };

    console.log(`✅ Results: ${results.inserted} inserted, ${results.updated} updated, ${results.errors} errors`);

    return NextResponse.json({
      success: true,
      message: 'Scraping completed (manual entry recommended)',
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
    note: 'Automated scraping not available - use manual SQL insert instead',
  });
}
