import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'צרו קשר | MULTIBRAWN — דברו עם ערדית',
  description: 'צרו קשר עם ערדית מ-MULTIBRAWN ומצאו את הצימר, הוילה או מתחם האירועים המושלם עבורכם. זמינים בוואטסאפ, אינסטגרם ובצ׳אטבוט 24/7.',
  keywords: ['צרו קשר צימר', 'MULTIBRAWN ערדית', 'ייעוץ נופש', 'בקשת הצעת מחיר', 'שבת חתן יעוץ', 'ייעוץ וילה', 'iiuux nxe mulbrawn'],
  alternates: { canonical: 'https://multibrawn.co.il/contact' },
  openGraph: {
    title: 'צרו קשר | MULTIBRAWN',
    description: 'דברו עם ערדית ומצאו את הנכס המושלם. זמינים 24/7 בוואטסאפ ובצ׳אטבוט.',
    url: 'https://multibrawn.co.il/contact',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'website',
    images: [{
      url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1772920963/צרו_קשר3_w97trj.png',
      width: 1200, height: 630,
      alt: 'צרו קשר עם MULTIBRAWN',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'צרו קשר | MULTIBRAWN',
    description: 'דברו עם ערדית ומצאו את הנכס המושלם',
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1772920963/צרו_קשר3_w97trj.png'],
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'צרו קשר — MULTIBRAWN',
  url: 'https://multibrawn.co.il/contact',
  description: 'דברו עם ערדית ומצאו את הנכס המושלם',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'בית', item: 'https://multibrawn.co.il' },
      { '@type': 'ListItem', position: 2, name: 'צרו קשר', item: 'https://multibrawn.co.il/contact' },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
