import type { Metadata } from 'next';
import VillasClient from './VillasClient';

export const metadata: Metadata = {
  title: 'וילות וצימרים בהתאמה אישית | MULTIBRAWN',
  description:
    'וילות, בתי נופש ומתחמי אירוח למשפחות ולקבוצות בכל הארץ. ספרו לנו מה אתם מחפשים — אנחנו מאתרים את ההתאמה הנכונה לפי הרכב, תקציב ואופי האירוח.',
  alternates: { canonical: 'https://multibrawn.co.il/villas' },
  keywords: [
    'וילות להשכרה',
    'צימרים בישראל',
    'מתחמי נופש',
    'וילה לקבוצה',
    'נופש משפחתי',
    'multibrawn',
  ],
  openGraph: {
    title: 'וילות וצימרים | MULTIBRAWN — התאמה אישית, לא קטלוג',
    description:
      'מתחמי נופש ואירוח בבחירה אישית. אתם מגדירים את הצורך, אנחנו מאתרים את ההתאמה.',
    url: 'https://multibrawn.co.il/villas',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'website',
  },
};

export default function VillasPage() {
  return <VillasClient />;
}
