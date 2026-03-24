import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'גלריית נכסים | וילות, צימרים ומתחמים — MULTIBRAWN',
  description: 'גלו את מגוון הנכסים של MULTIBRAWN: וילות יוקרה עם בריכה פרטית, צימרים רומנטיים עם ג׳קוזי, מלונות בוטיק ומתחמי אירועים בכל ישראל. סנן לפי אזור, סוג ומחיר.',
  keywords: ['גלריית צימרים', 'וילות להשכרה ישראל', 'צימרים עם בריכה', 'מתחמי אירועים', 'נכסי נופש', 'וילה עם בריכה פרטית', 'צימר עם ג׳קוזי', 'מלון בוטיק ישראל'],
  alternates: { canonical: 'https://multibrawn.co.il/gallery' },
  openGraph: {
    title: 'גלריית נכסים | MULTIBRAWN',
    description: '21 נכסים מאומתים — וילות, צימרים, מלונות בוטיק ומתחמי אירועים בכל ישראל',
    url: 'https://multibrawn.co.il/gallery',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'website',
    images: [{
      url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg',
      width: 1200, height: 630,
      alt: 'גלריית נכסים MULTIBRAWN',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'גלריית נכסים | MULTIBRAWN',
    description: 'וילות, צימרים ומתחמי אירועים בכל ישראל',
    images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg'],
  },
};

const galleryJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'גלריית נכסים — MULTIBRAWN',
  description: 'אוסף של וילות, צימרים, מלונות בוטיק ומתחמי אירועים בכל ישראל',
  url: 'https://multibrawn.co.il/gallery',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'בית', item: 'https://multibrawn.co.il' },
      { '@type': 'ListItem', position: 2, name: 'גלריה', item: 'https://multibrawn.co.il/gallery' },
    ],
  },
};

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryJsonLd) }}
      />
      <GalleryClient />
    </>
  );
}
