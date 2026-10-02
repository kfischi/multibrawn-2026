// MULTIBRAWN CHECK — בדיקת הקלט של השאלון. רץ בשרת, לפני שמשהו נשמר.
import { KASHRUT_OPTIONS, REGIONS, REGION_ANY, buildSummary } from './constants';

export interface RequestInput {
  requesterType: 'private' | 'producer';
  businessName: string | null;
  eventType: string;
  eventDate: string | null;
  dateText: string | null;
  dateFlexible: boolean;
  guestCount: number;
  region: string;
  budgetAmount: number | null;
  budgetUnit: 'per_guest' | 'total' | null;
  kashrut: string;
  mustHaves: string[];
  notes: string | null;
  name: string;
  phone: string;
}

export type ValidationResult =
  | { ok: true; value: RequestInput; summary: string }
  | { ok: false; field: string; error: string };

const str = (v: unknown, max: number): string =>
  typeof v === 'string' ? v.trim().slice(0, max) : '';

/** מחזיר טלפון ישראלי בספרות בלבד (0XXXXXXXXX), או null אם הוא לא תקין. */
export function normalizePhone(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('972')) d = `0${d.slice(3)}`;
  return /^0\d{8,9}$/.test(d) ? d : null;
}

function isRealDate(iso: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const dt = new Date(Date.UTC(y, mo - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === mo - 1 && dt.getUTCDate() === d;
}

export function validateRequest(body: any): ValidationResult {
  const fail = (field: string, error: string): ValidationResult => ({ ok: false, field, error });
  if (!body || typeof body !== 'object') return fail('form', 'בקשה לא תקינה');

  const requesterType = body.requesterType === 'producer' ? 'producer' : 'private';
  const businessName = requesterType === 'producer' ? str(body.businessName, 80) || null : null;

  const eventType = str(body.eventType, 60);
  if (!eventType) return fail('eventType', 'צריך לבחור סוג אירוע');

  const eventDateRaw = str(body.eventDate, 10);
  const eventDate = eventDateRaw || null;
  if (eventDate && !isRealDate(eventDate)) return fail('eventDate', 'התאריך לא תקין');
  // יום אחד של מרווח, כי השרת רץ ב-UTC והלקוח בשעון ישראל.
  if (eventDate && eventDate < new Date(Date.now() - 86_400_000).toISOString().slice(0, 10))
    return fail('eventDate', 'התאריך כבר עבר');
  const dateText = eventDate ? null : str(body.dateText, 80) || null;
  if (!eventDate && !dateText) return fail('eventDate', 'צריך לבחור תאריך, או לכתוב מתי בערך');
  const dateFlexible = body.dateFlexible === true;

  const guestCount = Number(body.guestCount);
  if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 5000)
    return fail('guestCount', 'צריך למלא כמות אורחים');

  const region = str(body.region, 20);
  if (region !== REGION_ANY && !REGIONS.some(r => r.value === region))
    return fail('region', 'צריך לבחור אזור');

  let budgetAmount: number | null = null;
  let budgetUnit: 'per_guest' | 'total' | null = null;
  if (body.budgetAmount !== null && body.budgetAmount !== undefined && body.budgetAmount !== '') {
    const n = Number(body.budgetAmount);
    if (!Number.isInteger(n) || n < 0 || n > 10_000_000) return fail('budgetAmount', 'התקציב לא תקין');
    if (n > 0) {
      budgetAmount = n;
      budgetUnit = body.budgetUnit === 'total' ? 'total' : 'per_guest';
    }
  }

  const kashrut = str(body.kashrut, 30) || 'any';
  if (!KASHRUT_OPTIONS.some(k => k.value === kashrut)) return fail('kashrut', 'צריך לבחור הכשר');

  const mustHaves: string[] = Array.isArray(body.mustHaves)
    ? Array.from(new Set(body.mustHaves.map((m: unknown) => str(m, 40)).filter(Boolean) as string[])).slice(0, 12)
    : [];

  const notes = str(body.notes, 500) || null;

  const name = str(body.name, 80);
  if (name.length < 2) return fail('name', 'צריך למלא שם');

  const phone = normalizePhone(body.phone);
  if (!phone) return fail('phone', 'מספר הטלפון לא תקין');

  const value: RequestInput = {
    requesterType, businessName, eventType, eventDate, dateText, dateFlexible,
    guestCount, region, budgetAmount, budgetUnit, kashrut, mustHaves, notes, name, phone,
  };
  return { ok: true, value, summary: buildSummary(value) };
}
