import { NextRequest, NextResponse } from 'next/server';
import { getCheckDb, DB_NOT_CONFIGURED, notifyN8n } from '@/lib/check/server';
import { validateRequest } from '@/lib/check/validate';
import { sendLeadEmail } from '@/lib/email';
import { regionLabel } from '@/lib/check/constants';

// POST /api/check/requests — הלקוח שולח את השאלון.
export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 });
  }

  // שדה מלכודת: בני אדם לא רואים אותו. בוט שממלא אותו מקבל "הצלחה" ולא נשמר.
  if (typeof body?.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true });
  }

  const result = validateRequest(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error, field: result.field }, { status: 400 });
  }

  const db = getCheckDb();
  if (!db) return NextResponse.json(DB_NOT_CONFIGURED, { status: 503 });

  const v = result.value;
  const { data, error } = await db
    .from('check_requests')
    .insert({
      requester_type: v.requesterType,
      business_name: v.businessName,
      event_type: v.eventType,
      event_date: v.eventDate,
      date_text: v.dateText,
      date_flexible: v.dateFlexible,
      guest_count: v.guestCount,
      region: v.region,
      budget_amount: v.budgetAmount,
      budget_unit: v.budgetUnit,
      kashrut: v.kashrut,
      must_haves: v.mustHaves,
      notes: v.notes,
      name: v.name,
      phone: v.phone,
      summary: result.summary,
    })
    .select('id')
    .single();

  if (error || !data) {
    console.error('CHECK request insert error:', error);
    return NextResponse.json({ error: 'לא הצלחנו לשמור את הבקשה. נסו שוב בעוד רגע.' }, { status: 500 });
  }

  // התראה לערדית: מייל (אם Resend מוגדר) ו-n8n (אם ה-webhook מוגדר). לא חוסם את התשובה.
  sendLeadEmail({
    name: v.name,
    phone: v.phone,
    propertyType: `CHECK: ${v.eventType}`,
    location: regionLabel(v.region),
    dates: v.eventDate || v.dateText,
    guestCount: v.guestCount,
    budget: result.summary,
    source: 'check',
    leadId: data.id,
  }).catch(e => console.error('CHECK email error:', e));

  notifyN8n('check_request', { requestId: data.id, summary: result.summary, request: v });

  return NextResponse.json({ success: true, requestId: data.id, summary: result.summary });
}
