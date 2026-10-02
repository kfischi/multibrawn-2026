// MULTIBRAWN CHECK — ערכים משותפים לשאלון, לפאנל הניהול ולעמוד התשובה של המקום.

export const REGIONS = [
  { value: 'north',     label: 'צפון' },
  { value: 'sharon',    label: 'שרון' },
  { value: 'center',    label: 'מרכז' },
  { value: 'jerusalem', label: 'ירושלים והסביבה' },
  { value: 'south',     label: 'דרום' },
] as const;

export type RegionCode = (typeof REGIONS)[number]['value'];

/** אזור בבקשה: אחד מהאזורים, או "כל הארץ". */
export const REGION_ANY = 'any';

export const KASHRUT_OPTIONS = [
  { value: 'any',               label: 'לא משנה' },
  { value: 'rabbanut',          label: 'רבנות' },
  { value: 'rabbanut_mehadrin', label: 'מהדרין רבנות' },
  { value: 'eda_haredit',       label: 'בד"ץ העדה החרדית' },
  { value: 'beit_yosef',        label: 'בד"ץ בית יוסף' },
  { value: 'machpud',           label: 'הרב מחפוד' },
  { value: 'landau',            label: 'הרב לנדאו' },
  { value: 'rubin',             label: 'הרב רובין' },
  { value: 'kehilot',           label: 'קהילות' },
  { value: 'chatam_sofer',      label: 'חתם סופר' },
] as const;

/** הכשר של מקום: אותה רשימה בלי "לא משנה", ועם "לא כשר". */
export const VENUE_KASHRUT_OPTIONS = [
  ...KASHRUT_OPTIONS.filter(k => k.value !== 'any'),
  { value: 'none', label: 'לא כשר' },
] as const;

export const EVENT_TYPES = [
  'חתונה',
  'בר מצווה / בת מצווה',
  'ברית / בריתה',
  'חינה',
  'אירוסין',
  'יום הולדת',
  'אירוע חברה',
  'אחר',
] as const;

export const MUST_HAVES = [
  'חניה',
  'נגישות',
  'קייטרינג חיצוני',
  'רחבת ריקודים',
  'מקום פתוח',
  'מקום סגור וממוזג',
  'לינה במקום',
  'הפרדה',
] as const;

export const REQUEST_STATUSES = [
  { value: 'new',      label: 'חדשה' },
  { value: 'approved', label: 'אושרה' },
  { value: 'rejected', label: 'נדחתה' },
  { value: 'sent',     label: 'נשלחה למקומות' },
  { value: 'meeting',  label: 'נקבעה פגישה' },
  { value: 'closed',   label: 'נסגר אירוע' },
  { value: 'lost',     label: 'לא נסגר' },
] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number]['value'];

/** ההתחייבות של ערדית: עד 10 מקומות פעילים בכל אזור. */
export const MAX_ACTIVE_VENUES_PER_REGION = 10;

/** כל בקשה יוצאת ל-4 מקומות לכל היותר. */
export const MAX_VENUES_PER_REQUEST = 4;

/** דמי השירות ללקוח, בשקלים. */
export const SERVICE_FEE_NIS = 50;

export function regionLabel(code: string | null | undefined): string {
  if (!code) return '';
  if (code === REGION_ANY) return 'כל הארץ';
  return REGIONS.find(r => r.value === code)?.label ?? code;
}

export function kashrutLabel(code: string | null | undefined): string {
  if (!code) return '';
  if (code === 'none') return 'לא כשר';
  return KASHRUT_OPTIONS.find(k => k.value === code)?.label ?? code;
}

export function requestStatusLabel(code: string): string {
  return REQUEST_STATUSES.find(s => s.value === code)?.label ?? code;
}

const HE_DAYS = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

/** "2026-11-19" -> "חמישי, 19.11.2026". בלי תלות באזור הזמן של השרת. */
export function formatEventDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const day = new Date(Date.UTC(Number(y), Number(mo) - 1, Number(d))).getUTCDay();
  return `${HE_DAYS[day]}, ${Number(d)}.${Number(mo)}.${y}`;
}

export interface SummaryInput {
  eventType: string;
  guestCount: number;
  eventDate?: string | null;
  dateText?: string | null;
  dateFlexible?: boolean;
  region: string;
  budgetAmount?: number | null;
  budgetUnit?: 'per_guest' | 'total' | null;
  kashrut: string;
  mustHaves?: string[];
}

/**
 * שורת הסיכום שהלקוח רואה בסוף השאלון ושהמקום רואה בפנייה.
 * אין בה שם או טלפון, כדי שאפשר יהיה להציג אותה למקום כמו שהיא.
 */
export function buildSummary(r: SummaryInput): string {
  const parts: string[] = [r.eventType, `${r.guestCount} אורחים`];

  const date = r.eventDate ? formatEventDate(r.eventDate) : (r.dateText || '').trim();
  if (date) parts.push(r.dateFlexible ? `${date} (גמיש)` : date);
  else if (r.dateFlexible) parts.push('תאריך גמיש');

  parts.push(regionLabel(r.region));

  if (r.budgetAmount && r.budgetAmount > 0) {
    const amount = r.budgetAmount.toLocaleString('he-IL');
    parts.push(r.budgetUnit === 'total' ? `עד ${amount} ₪ לאירוע` : `עד ${amount} ₪ למנה`);
  }

  if (r.kashrut && r.kashrut !== 'any') parts.push(`הכשר: ${kashrutLabel(r.kashrut)}`);

  const must = (r.mustHaves || []).filter(Boolean);
  if (must.length) parts.push(`חובה: ${must.join(', ')}`);

  return parts.filter(Boolean).join(' | ');
}

/** טלפון ישראלי -> קישור wa.me. מחזיר null אם המספר לא נראה כמו נייד. */
export function whatsappLink(phone: string | null | undefined, text?: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  let intl: string;
  if (digits.startsWith('972')) intl = digits;
  else if (digits.startsWith('0')) intl = `972${digits.slice(1)}`;
  else intl = `972${digits}`;
  if (!/^9725\d{8}$/.test(intl)) return null;
  return `https://wa.me/${intl}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
}
