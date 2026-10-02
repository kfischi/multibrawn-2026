import { NextRequest, NextResponse } from 'next/server';
import { adminGuard, isUuid } from '@/lib/check/server';
import { REGION_ANY } from '@/lib/check/constants';

type KashrutMatch = 'exact' | 'unknown' | 'other' | 'na';

// GET /api/admin/check/requests/[id]/matches?all=1&q=...
// מקומות שמתאימים לבקשה לפי אזור וקיבולת. ההכשר לא מסנן אלא מסומן, וערדית מחליטה.
// ברירת מחדל: רק מקומות פעילים. all=1 מוסיף גם לא פעילים (לחיפוש מקום להפעיל).
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const g = adminGuard(request);
  if (g instanceof NextResponse) return g;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: 'מזהה לא תקין' }, { status: 400 });

  const { data: req, error: reqErr } = await g.db
    .from('check_requests').select('id, region, guest_count, kashrut').eq('id', id).single();
  if (reqErr || !req) return NextResponse.json({ error: 'הבקשה לא נמצאה' }, { status: 404 });

  const includeInactive = request.nextUrl.searchParams.get('all') === '1';
  const q = (request.nextUrl.searchParams.get('q') || '').trim().replace(/[%,()]/g, '').slice(0, 60);

  let query = g.db
    .from('check_venues')
    .select('id, name, venue_type, city, region, capacity_min, capacity_max, capacity_text, kashrut, kashrut_raw, kashrut_verified, contact_name, contact_phone, agreement_signed, active')
    .order('active', { ascending: false })
    .order('name', { ascending: true })
    .limit(includeInactive ? 60 : 100);

  if (!includeInactive) query = query.eq('active', true);
  if (req.region !== REGION_ANY) query = query.eq('region', req.region);
  if (q) query = query.ilike('name', `%${q}%`);
  // קיבולת: מקום בלי נתון נשאר ברשימה, כי רוב הקטלוג עדיין חסר.
  query = query.or(`capacity_max.is.null,capacity_max.gte.${req.guest_count}`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const wanted = req.kashrut;
  const rank: Record<KashrutMatch, number> = { exact: 0, na: 0, unknown: 1, other: 2 };
  const venues = (data ?? [])
    .map(v => {
      let kashrutMatch: KashrutMatch = 'na';
      if (wanted && wanted !== 'any') {
        kashrutMatch = !v.kashrut ? 'unknown' : v.kashrut === wanted ? 'exact' : 'other';
      }
      return { ...v, kashrutMatch };
    })
    .sort((a, b) => Number(b.active) - Number(a.active) || rank[a.kashrutMatch] - rank[b.kashrutMatch]);

  return NextResponse.json({ venues });
}
