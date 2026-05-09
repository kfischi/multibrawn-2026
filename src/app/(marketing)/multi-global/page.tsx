import type { Metadata } from 'next';
import MultiGlobalClient from './MultiGlobalClient';

export const metadata: Metadata = {
  title: 'Multi-Global | נכסי יוקרה בינלאומיים',
  description: 'וילות, פנטהאוזים ומתחמים בלעדיים ב-30+ יעדים עולמיים — שירות אישי בעברית מישראל. יוון, איטליה, ספרד, דובאי, תאילנד ועוד.',
  alternates: { canonical: 'https://multibrawn.co.il/multi-global' },
  openGraph: {
    title: 'Multi-Global | נכסי יוקרה בינלאומיים | MULTIBRAWN',
    description: 'נסעו לעולם עם MULTIBRAWN — וילות ומתחמים יוקרתיים בכל יעד חלומי.',
    url: 'https://multibrawn.co.il/multi-global',
    type: 'website',
  },
  keywords: ['וילה בחו"ל', 'נכסים בינלאומיים', 'נופש יוון', 'וילה איטליה', 'נופש דובאי', 'Multi-Global'],
};

export default function MultiGlobalPage() {
  return <MultiGlobalClient />;
}
