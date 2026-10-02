import { NextRequest, NextResponse } from 'next/server';
import { adminGuard } from '@/lib/check/server';
import { REGIONS, MAX_ACTIVE_VENUES_PER_REGION } from '@/lib/check/constants';

// GET /api/admin/check/venues?region=center&active=1&q=...
// רשימת מקומות, ומונה "פעילים לפי אזור" מול התקרה של 10.
export async function GET(request: NextRequest) {
  const g = adminGuard(request);
  if (g instanceof NextResponse) return g;

  const sp = request.nextUrl.searchParams;
  const region = sp.get('region') || '';
  const activeOnly = sp.get('active') === '1';
  const q = (sp.get('q') || '').trim().replace(/[%,()]/g, '').slice(0, 60);

  let query = g.db
    .from('check_venues')
    .select('*')
    .order('active', { ascending: false })
    .order('name', { ascending: true })
    .limit(100);

  if (region === 'none') query = query.is('region', null);
  else if (REGIONS.some(r => r.value === region)) query = query.eq('region', region);
  if (activeOnly) query = query.eq('active', true);
  if (q) query = query.ilike('name', `%${q}%`);

  const [list, active] = await Promise.all([
    query,
    g.db.from('check_venues').select('region').eq('active', true),
  ]);
  if (list.error) return NextResponse.json({ error: list.error.message }, { status: 500 });

  const activeByRegion: Record<string, number> = {};
  for (const r of REGIONS) activeByRegion[r.value] = 0;
  for (const v of active.data ?? []) if (v.region) activeByRegion[v.region] = (activeByRegion[v.region] || 0) + 1;

  return NextResponse.json({ venues: list.data ?? [], activeByRegion, maxPerRegion: MAX_ACTIVE_VENUES_PER_REGION });
}
