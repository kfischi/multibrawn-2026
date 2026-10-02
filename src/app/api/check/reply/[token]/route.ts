import { NextRequest, NextResponse } from 'next/server';
import { getCheckDb, DB_NOT_CONFIGURED, notifyN8n } from '@/lib/check/server';
import { formatEventDate, kashrutLabel, regionLabel } from '@/lib/check/constants';
import type { VenueReplyView } from '@/lib/check/types';

const TOKEN_RE = /^[A-Za-z0-9_-]{20,40}$/;
const CLOSED = ['rejected', 'closed', 'lost'];

// שים לב: בוחרים במפורש רק שדות שמותר למקום לראות. אין כאן name / phone / admin_notes.
const SELECT =
  'id, response, price_text, venue_note, venue:check_venues(name), request:check_requests(id, status, summary, requester_type, event_type, event_date, date_text, date_flexible, guest_count, region, budget_amount, budget_unit, kashrut, must_haves, notes)';

const one = <T,>(v: T | T[] | null | undefined): T | null => (Array.isArray(v) ? v[0] ?? null : v ?? null);

async function load(token: string) {
  const db = getCheckDb();
  if (!db) return { db: null, row: null };
  const { data } = await db.from('check_request_venues').select(SELECT).eq('token', token).maybeSingle();
  return { db, row: data };
}

// GET /api/check/reply/[token] — מה שהמקום רואה: הבקשה בלי פרטי הלקוח.
export async function GET(_request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!TOKEN_RE.test(token)) return NextResponse.json({ error: 'הקישור לא תקין' }, { status: 404 });

  const { db, row } = await load(token);
  if (!db) return NextResponse.json(DB_NOT_CONFIGURED, { status: 503 });
  const req = one(row?.request as any);
  const venue = one(row?.venue as any);
  if (!row || !req || !venue) return NextResponse.json({ error: 'הקישור לא תקין' }, { status: 404 });

  const date = req.event_date ? formatEventDate(req.event_date) : req.date_text || '';
  const view: VenueReplyView = {
    venueName: venue.name,
    summary: req.summary,
    eventType: req.event_type,
    guestCount: req.guest_count,
    dateLabel: req.date_flexible ? (date ? `${date} (גמיש)` : 'גמיש') : date,
    regionLabel: regionLabel(req.region),
    budgetLabel: req.budget_amount
      ? `עד ${Number(req.budget_amount).toLocaleString('he-IL')} ₪ ${req.budget_unit === 'total' ? 'לאירוע' : 'למנה'}`
      : '',
    kashrutLabel: req.kashrut && req.kashrut !== 'any' ? kashrutLabel(req.kashrut) : '',
    mustHaves: req.must_haves ?? [],
    notes: req.notes,
    requesterType: req.requester_type,
    response: row.response,
    priceText: row.price_text,
    venueNote: row.venue_note,
    closed: CLOSED.includes(req.status),
  };
  return NextResponse.json({ view }, { headers: { 'Cache-Control': 'no-store' } });
}

// POST /api/check/reply/[token]  { response: 'available' | 'unavailable', priceText?, note? }
export async function POST(request: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!TOKEN_RE.test(token)) return NextResponse.json({ error: 'הקישור לא תקין' }, { status: 404 });

  const body = await request.json().catch(() => null);
  const response = body?.response;
  if (response !== 'available' && response !== 'unavailable')
    return NextResponse.json({ error: 'צריך לבחור: פנוי או לא פנוי' }, { status: 400 });

  const priceText = typeof body.priceText === 'string' ? body.priceText.trim().slice(0, 200) : '';
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 500) : '';
  if (response === 'available' && !priceText)
    return NextResponse.json({ error: 'כשפנוי, צריך לכתוב מחיר', field: 'priceText' }, { status: 400 });

  const { db, row } = await load(token);
  if (!db) return NextResponse.json(DB_NOT_CONFIGURED, { status: 503 });
  const req = one(row?.request as any);
  const venue = one(row?.venue as any);
  if (!row || !req || !venue) return NextResponse.json({ error: 'הקישור לא תקין' }, { status: 404 });
  if (CLOSED.includes(req.status)) return NextResponse.json({ error: 'הבקשה הזו כבר נסגרה' }, { status: 409 });

  const { error } = await db
    .from('check_request_venues')
    .update({
      response,
      price_text: response === 'available' ? priceText : null,
      venue_note: note || null,
      responded_at: new Date().toISOString(),
    })
    .eq('id', row.id);
  if (error) return NextResponse.json({ error: 'לא הצלחנו לשמור את התשובה. נסו שוב.' }, { status: 500 });

  notifyN8n('check_reply', {
    requestId: req.id,
    summary: req.summary,
    venueName: venue.name,
    response,
    priceText: response === 'available' ? priceText : null,
    note: note || null,
  });

  return NextResponse.json({ success: true });
}
