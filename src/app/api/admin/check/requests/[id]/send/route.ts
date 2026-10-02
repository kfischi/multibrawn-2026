import { NextRequest, NextResponse } from 'next/server';
import { adminGuard, isUuid, newToken, siteOrigin } from '@/lib/check/server';
import { MAX_VENUES_PER_REQUEST } from '@/lib/check/constants';

// POST /api/admin/check/requests/[id]/send  { venueIds: string[] }
// יוצר קישור תשובה אישי לכל מקום. ההודעה עצמה יוצאת מהוואטסאפ של ערדית, לא מכאן.
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const g = adminGuard(request);
  if (g instanceof NextResponse) return g;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: 'מזהה לא תקין' }, { status: 400 });

  const body = await request.json().catch(() => null);
  const venueIds: string[] = Array.isArray(body?.venueIds) ? Array.from(new Set((body.venueIds as unknown[]).filter(isUuid))) : [];
  if (!venueIds.length) return NextResponse.json({ error: 'צריך לבחור לפחות מקום אחד' }, { status: 400 });

  const { data: req } = await g.db.from('check_requests').select('id, status').eq('id', id).single();
  if (!req) return NextResponse.json({ error: 'הבקשה לא נמצאה' }, { status: 404 });
  if (req.status === 'new' || req.status === 'rejected')
    return NextResponse.json({ error: 'קודם מאשרים את הבקשה, ורק אז שולחים למקומות' }, { status: 409 });

  const { data: existing } = await g.db.from('check_request_venues').select('venue_id').eq('request_id', id);
  const already = new Set((existing ?? []).map(r => r.venue_id));
  const fresh = venueIds.filter(v => !already.has(v));
  if (already.size + fresh.length > MAX_VENUES_PER_REQUEST)
    return NextResponse.json(
      { error: `כל בקשה יוצאת ל-${MAX_VENUES_PER_REQUEST} מקומות לכל היותר (כבר נשלחה ל-${already.size})` },
      { status: 409 },
    );
  if (!fresh.length) return NextResponse.json({ error: 'הבקשה כבר נשלחה למקומות האלה' }, { status: 409 });

  // שולחים רק למקומות פעילים: זו ההתחייבות של "עד 10 בכל אזור".
  const { data: venues } = await g.db.from('check_venues').select('id, active').in('id', fresh);
  const inactive = fresh.filter(v => !(venues ?? []).some(x => x.id === v && x.active));
  if (inactive.length)
    return NextResponse.json({ error: 'אפשר לשלוח רק למקומות פעילים. קודם מפעילים את המקום בלשונית "מקומות".' }, { status: 409 });

  const rows = fresh.map(venue_id => ({ request_id: id, venue_id, token: newToken() }));
  const { data: created, error } = await g.db.from('check_request_venues').insert(rows).select('id, venue_id, token');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (req.status === 'approved') await g.db.from('check_requests').update({ status: 'sent' }).eq('id', id);

  const origin = siteOrigin(request);
  return NextResponse.json({
    created: (created ?? []).map(r => ({ ...r, link: `${origin}/check/reply/${r.token}` })),
  });
}
