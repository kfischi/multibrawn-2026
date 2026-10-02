import type { Metadata } from 'next';
import CheckClient from './CheckClient';

export const metadata: Metadata = {
  title: 'MULTIBRAWN CHECK | בדיקת התאמה למקום לאירוע',
  description:
    'ממלאים בקשה אחת: תאריך, כמות אורחים, אזור, תקציב והכשר. אנחנו בודקים מול המקומות המתאימים ומחזירים תשובה: מי פנוי ובאיזה מחיר.',
  alternates: { canonical: 'https://multibrawn.co.il/check' },
  // גרסה ראשונה, בהזמנה בלבד: הקישור נשלח ללקוחות ישירות ולא מקודם בגוגל.
  robots: { index: false, follow: false },
};

export default function CheckPage() {
  return <CheckClient />;
}
