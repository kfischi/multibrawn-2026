import { NextRequest, NextResponse } from 'next/server';
import { adminGuard, isUuid } from '@/lib/check/server';
import { MAX_ACTIVE_VENUES_PER_REGION, REGIONS, VENUE_KASHRUT_OPTIONS, regionLabel } from '@/lib/check/constants';
import { normalizePhone } from '@/lib/check/validate';

const text = (v: unknown, max: number): string | null =>
  typeof v === 'string' ? v.trim().slice(0, max) || null : null;

// PATCH /api/admin/check/venues/[id] — השדות שערדית מנהלת: פעיל, אזור, הכשר, איש קשר, הסכם, הערות.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const g = adminGuard(request);
  if (g instanceof NextResponse) return g;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: 'מזהה לא תקין' }, { status: 400 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 });

  const { data: current } = await g.db.from('check_venues').select('id, region, active').eq('id', id).single();
  if (!current) return NextResponse.json({ error: 'המקום לא נמצא' }, { status: 404 });

  const update: Record<string, unknown> = {};

  if (body.region !== undefined) {
    if (body.region !== null && !REGIONS.some(r => r.value === body.region))
      return NextResponse.json({ error: 'אזור לא מוכר' }, { status: 400 });
    update.region = body.region;
  }
  if (body.kashrut !== undefined) {
    if (body.kashrut !== null && body.kashrut !== '' && !VENUE_KASHRUT_OPTIONS.some(k => k.value === body.kashrut))
      return NextResponse.json({ error: 'הכשר לא מוכר' }, { status: 400 });
    update.kashrut = body.kashrut || null;
    if (!update.kashrut) update.kashrut_verified = false;
  }
  if (body.kashrut_verified !== undefined) update.kashrut_verified = body.kashrut_verified === true;
  if (body.agreement_signed !== undefined) update.agreement_signed = body.agreement_signed === true;
  if (body.contact_name !== undefined) update.contact_name = text(body.contact_name, 80);
  if (body.contact_phone !== undefined) {
    const raw = text(body.contact_phone, 30);
    const phone = raw ? normalizePhone(raw) : null;
    if (raw && !phone) return NextResponse.json({ error: 'מספר הטלפון לא תקין' }, { status: 400 });
    update.contact_phone = phone;
  }
  if (body.virtual_tour_url !== undefined) {
    const url = text(body.virtual_tour_url, 300);
    if (url && !/^https?:\/\//i.test(url)) return NextResponse.json({ error: 'הקישור צריך להתחיל ב-https://' }, { status: 400 });
    update.virtual_tour_url = url;
  }
  if (body.notes !== undefined) update.notes = text(body.notes, 1000);

  const nextRegion = (update.region !== undefined ? update.region : current.region) as string | null;
  const nextActive = body.active !== undefined ? body.active === true : current.active;
  if (body.active !== undefined) update.active = nextActive;

  // התקרה: עד 10 מקומות פעילים באזור. נבדק גם בהפעלה וגם כשמעבירים מקום פעיל לאזור אחר.
  const activating = nextActive && (!current.active || nextRegion !== current.region);
  if (activating) {
    if (!nextRegion) return NextResponse.json({ error: 'קודם בוחרים אזור למקום, ואז מפעילים' }, { status: 409 });
    const { count, error: countErr } = await g.db
      .from('check_venues').select('id', { count: 'exact', head: true })
      .eq('active', true).eq('region', nextRegion).neq('id', id);
    if (countErr) return NextResponse.json({ error: countErr.message }, { status: 500 });
    if ((count ?? 0) >= MAX_ACTIVE_VENUES_PER_REGION)
      return NextResponse.json(
        { error: `באזור ${regionLabel(nextRegion)} כבר יש ${MAX_ACTIVE_VENUES_PER_REGION} מקומות פעילים. כדי להפעיל מקום נוסף, קודם מכבים אחד.` },
        { status: 409 },
      );
  }

  if (!Object.keys(update).length) return NextResponse.json({ error: 'אין מה לעדכן' }, { status: 400 });
  update.updated_at = new Date().toISOString();

  const { data, error } = await g.db.from('check_venues').update(update).eq('id', id).select('*').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ venue: data });
}
