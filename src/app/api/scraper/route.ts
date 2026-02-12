import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { maxResults = 10 } = await request.json();

    // Mock data - החלף בסקרייפר אמיתי
    const mockProperties = Array.from({ length: maxResults }, (_, i) => ({
      id: `mock-${Date.now()}-${i}`,
      name: `נכס דוגמה ${i + 1}`,
      property_type: ['צימר', 'וילה', 'דירת נופש'][i % 3],
      location: {
        city: ['רמות נפתלי', 'כנרת', 'תל אביב'][i % 3],
        area: ['גליל עליון', 'צפון', 'מרכז'][i % 3],
      },
      capacity: 4 + (i % 4) * 2,
      images: {
        main: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/sample.jpg',
        gallery: [],
      },
      description: `תיאור נכס ${i + 1}`,
      features: ['בריכה', 'ג\'קוזי', 'נוף'],
      affiliate: {
        affiliateUrl: 'https://tzimer360.com',
      },
      status: 'active',
      rating: 4.5 + (i % 10) * 0.05,
    }));

    let inserted = 0;
    let updated = 0;

    for (const property of mockProperties) {
      const { error } = await supabase
        .from('affiliate_properties')
        .upsert(property, { onConflict: 'id' });

      if (!error) {
        inserted++;
      }
    }

    return NextResponse.json({
      success: true,
      inserted,
      updated,
      total: maxResults,
    });
  } catch (error: any) {
    console.error('Scraper error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
