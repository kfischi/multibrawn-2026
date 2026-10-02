// MULTIBRAWN CHECK — עזרי צד שרת: גישה למסד הנתונים, אימות מנהל, והודעה ל-n8n.
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes, timingSafeEqual } from 'node:crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cfulruffxneijmcvpclz.supabase.co';

let _db: SupabaseClient | null = null;

/**
 * טבלאות CHECK מכילות שם וטלפון של לקוחות, ואין להן הרשאות anon.
 * לכן, בשונה מ-supabaseAdmin הכללי, כאן אין נפילה חזרה ל-anon key:
 * בלי SUPABASE_SERVICE_ROLE_KEY מחזירים null, וה-route עונה 503.
 */
export function getCheckDb(): SupabaseClient | null {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return null;
  if (!_db) _db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
  return _db;
}

export const DB_NOT_CONFIGURED = {
  error: 'המערכת עדיין לא הוגדרה (חסר SUPABASE_SERVICE_ROLE_KEY).',
};

// המפתח שפורסם בקוד הפתוח של האתר. הוא ידוע לכל מי שקורא את המאגר, ולכן לא מקובל כאן.
const PUBLIC_DEFAULT_SECRET = 'multibrawn-admin-2025';

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/**
 * אימות מנהל לנתיבי CHECK. מחמיר יותר משאר /api/admin, כי כאן יש פרטי לקוחות:
 * - חייב ADMIN_SECRET בסביבה, ושונה מהמפתח שפורסם בקוד. אחרת 503 (סגור כברירת מחדל).
 * - המפתח מגיע רק בכותרת x-admin-secret, לא בכתובת (כתובות נשמרות בלוגים).
 */
export function adminGuard(request: NextRequest): { db: SupabaseClient } | NextResponse {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret === PUBLIC_DEFAULT_SECRET) {
    return NextResponse.json(
      { error: 'צריך להגדיר ADMIN_SECRET חדש בסביבה לפני שמשתמשים ב-CHECK.', code: 'admin_secret_missing' },
      { status: 503 },
    );
  }
  const given = request.headers.get('x-admin-secret') || '';
  if (!safeEqual(given, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const db = getCheckDb();
  if (!db) return NextResponse.json({ ...DB_NOT_CONFIGURED, code: 'db_missing' }, { status: 503 });
  return { db };
}

export const isUuid = (v: unknown): v is string =>
  typeof v === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);

export function newToken(): string {
  return randomBytes(18).toString('base64url');
}

/** שולח אירוע ל-n8n, אם הוגדר webhook. לא חוסם ולא מפיל את הבקשה. */
export function notifyN8n(source: string, payload: Record<string, unknown>): void {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) return;
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Source': 'multibrawn-check' },
    body: JSON.stringify({ timestamp: new Date().toISOString(), source, ...payload }),
    signal: AbortSignal.timeout(8000),
  }).catch(e => console.error('CHECK n8n forward error:', e));
}

export function siteOrigin(request: NextRequest): string {
  return process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
}
