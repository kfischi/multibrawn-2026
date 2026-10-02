import { NextRequest, NextResponse } from 'next/server';
import { adminGuard, isUuid } from '@/lib/check/server';

// PATCH /api/admin/check/request-venues/[id]
// - response / price_text / venue_note: כשהמקום ענה בוואטסאפ ולא דרך הקישור, ערדית מזינה בעצמה.
// - customer_details_shared: סימון שפרטי הלקוח הועברו. מותר רק למקום עם הסכם חתום.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const g = adminGuard(request);
  if (g instanceof NextResponse) return g;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: 'מזהה לא תקין' }, { status: 400 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 });

  const { data: row } = await g.db
    .from('check_request_venues')
    .select('id, venue:check_venues(agreement_signed)')
    .eq('id', id)
    .single();
  if (!row) return NextResponse.json({ error: 'הפנייה לא נמצאה' }, { status: 404 });

  const update: Record<string, unknown> = {};

  if (body.response !== undefined) {
    if (!['pending', 'available', 'unavailable'].includes(body.response))
      return NextResponse.json({ error: 'תשובה לא מוכרת' }, { status: 400 });
    update.response = body.response;
    update.responded_at = body.response === 'pending' ? null : new Date().toISOString();
  }
  if (body.price_text !== undefined)
    update.price_text = typeof body.price_text === 'string' ? body.price_text.trim().slice(0, 200) || null : null;
  if (body.venue_note !== undefined)
    update.venue_note = typeof body.venue_note === 'string' ? body.venue_note.trim().slice(0, 500) || null : null;

  if (body.customer_details_shared !== undefined) {
    const share = body.customer_details_shared === true;
    const venue = Array.isArray(row.venue) ? row.venue[0] : row.venue;
    if (share && !venue?.agreement_signed)
      return NextResponse.json({ error: 'פרטי לקוח עוברים רק למקום עם הסכם חתום' }, { status: 409 });
    update.customer_details_shared = share;
  }

  if (!Object.keys(update).length) return NextResponse.json({ error: 'אין מה לעדכן' }, { status: 400 });

  const { data, error } = await g.db
    .from('check_request_venues').update(update).eq('id', id)
    .select('id, response, price_text, venue_note, responded_at, customer_details_shared').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ requestVenue: data });
}
