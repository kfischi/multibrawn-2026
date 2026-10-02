import { NextRequest, NextResponse } from 'next/server';
import { adminGuard } from '@/lib/check/server';

const REQUEST_SELECT =
  '*, venues:check_request_venues(id, request_id, venue_id, token, response, price_text, venue_note, responded_at, customer_details_shared, venue:check_venues(id, name, city, contact_name, contact_phone, agreement_signed))';

// GET /api/admin/check/requests — כל הבקשות, החדשות למעלה, עם הפניות למקומות.
export async function GET(request: NextRequest) {
  const g = adminGuard(request);
  if (g instanceof NextResponse) return g;

  const { data, error } = await g.db
    .from('check_requests')
    .select(REQUEST_SELECT)
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ requests: data ?? [] });
}
