import { NextRequest, NextResponse } from 'next/server';
import { adminGuard, isUuid } from '@/lib/check/server';
import { REQUEST_STATUSES } from '@/lib/check/constants';

// PATCH /api/admin/check/requests/[id] — סטטוס, דמי שירות, הערות פנימיות.
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const g = adminGuard(request);
  if (g instanceof NextResponse) return g;
  const { id } = await params;
  if (!isUuid(id)) return NextResponse.json({ error: 'מזהה לא תקין' }, { status: 400 });

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 });

  const update: Record<string, unknown> = {};
  if (body.status !== undefined) {
    if (!REQUEST_STATUSES.some(s => s.value === body.status))
      return NextResponse.json({ error: 'סטטוס לא מוכר' }, { status: 400 });
    update.status = body.status;
  }
  if (body.fee_paid !== undefined) update.fee_paid = body.fee_paid === true;
  if (body.admin_notes !== undefined)
    update.admin_notes = typeof body.admin_notes === 'string' ? body.admin_notes.trim().slice(0, 2000) || null : null;

  if (!Object.keys(update).length) return NextResponse.json({ error: 'אין מה לעדכן' }, { status: 400 });

  const { data, error } = await g.db.from('check_requests').update(update).eq('id', id).select('id, status, fee_paid, admin_notes').single();
  if (error || !data) return NextResponse.json({ error: error?.message || 'הבקשה לא נמצאה' }, { status: error ? 500 : 404 });
  return NextResponse.json({ request: data });
}
