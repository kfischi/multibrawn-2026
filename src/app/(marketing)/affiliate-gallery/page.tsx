import type { Metadata } from 'next';
import AffiliateClient from './AffiliateClient';

export const metadata: Metadata = {
  title: 'גלריית שותפים | נכסים נבחרים MULTIBRAWN',
  description: 'גלריית נכסים נבחרים — צימרים, וילות ומתחמי אירועים מומלצים בישראל.',
  alternates: { canonical: 'https://multibrawn.co.il/affiliate-gallery' },
  openGraph: {
    title: 'גלריית שותפים | MULTIBRAWN',
    description: 'נכסים נבחרים ומומלצים לנופש ואירועים.',
    url: 'https://multibrawn.co.il/affiliate-gallery',
    type: 'website',
  },
};

export default function AffiliateGalleryPage() {
  return <AffiliateClient />;
}
