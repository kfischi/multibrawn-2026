import type { Metadata } from 'next';
import TipsClient from './TipsClient';

export const metadata: Metadata = {
  title: 'טיפים | איך לבחור את הנכס המושלם',
  description: 'טיפים מקצועיים לבחירת צימר, וילה ומתחם אירועים — שאלות שחייבים לשאול לפני ההזמנה.',
  alternates: { canonical: 'https://multibrawn.co.il/tips' },
  openGraph: {
    title: 'טיפים | MULTIBRAWN',
    description: 'כל הטיפים לנופש מושלם בישראל.',
    url: 'https://multibrawn.co.il/tips',
    type: 'website',
  },
};

export default function TipsPage() {
  return <TipsClient />;
}
