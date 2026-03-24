// src/app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

// ── GTM ID ── החלף כאן כשיהיה לך את ה-ID
const GTM_ID = 'GTM-T2DCKBL5';
const GA4_ID = 'G-7JN4LBTR2B';

export const metadata: Metadata = {
  metadataBase: new URL('https://multibrawn.co.il'),

  title: {
    default: 'MULTIBRAWN | צימרים, וילות ומתחמי אירועים בישראל',
    template: '%s | MULTIBRAWN',
  },
  description:
    'MULTIBRAWN — המומחים למציאת הצימר, הוילה או מתחם האירועים המושלם. שירות אישי 24/7, נכסים מאומתים, תוצאות מדויקות. שבת חתן, נופש משפחתי, אירועים.',
  keywords: [
    'צימרים בישראל',
    'וילות להשכרה',
    'מתחמי אירועים',
    'שבת חתן',
    'צימר רומנטי',
    'צימר עם בריכה',
    'צימר גליל',
    'צימר גולן',
    'וילה עם בריכה',
    'נופש בישראל',
    'multibrawn',
  ],
  authors: [{ name: 'MULTIBRAWN', url: 'https://multibrawn.co.il' }],
  creator: 'MULTIBRAWN',
  publisher: 'MULTIBRAWN',

  alternates: {
    canonical: 'https://multibrawn.co.il',
    languages: { 'he-IL': 'https://multibrawn.co.il' },
  },

  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://multibrawn.co.il',
    siteName: 'MULTIBRAWN',
    title: 'MULTIBRAWN | צימרים, וילות ומתחמי אירועים בישראל',
    description:
      'מומחים למציאת הלוקיישן המושלם — שבת חתן, נופש משפחתי, רומנטיקה. שירות אישי 24/7.',
    images: [
      {
        url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg',
        width: 1200,
        height: 630,
        alt: 'MULTIBRAWN - צימרים, וילות ומתחמי אירועים',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'MULTIBRAWN | צימרים, וילות ומתחמי אירועים',
    description: 'מומחים למציאת הלוקיישן המושלם בישראל',
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'google566cd679430f73f1',
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// ── Schema.org JSON-LD ──
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://multibrawn.co.il/#organization',
  name: 'MULTIBRAWN',
  url: 'https://multibrawn.co.il',
  logo: {
    '@type': 'ImageObject',
    url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg',
    width: 512,
    height: 512,
  },
  image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg',
  description: 'מומחים למציאת צימרים, וילות ומתחמי אירועים בישראל. שירות אישי 24/7.',
  telephone: '+972-52-398-3394',
  email: 'info@multibrawn.co.il',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IL',
    addressLocality: 'ישראל',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.7683,
    longitude: 35.2137,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Friday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+972-52-398-3394',
    contactType: 'customer service',
    availableLanguage: 'Hebrew',
    contactOption: 'TollFree',
  },
  sameAs: [
    'https://www.facebook.com/multibrawn',
    'https://www.instagram.com/multibrawn',
    'https://wa.me/972523983394',
  ],
  priceRange: '₪₪',
  areaServed: {
    '@type': 'Country',
    name: 'Israel',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'נכסים להשכרה',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'צימרים' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'וילות' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'מתחמי אירועים' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'שבת חתן' } },
    ],
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://multibrawn.co.il/#website',
  url: 'https://multibrawn.co.il',
  name: 'MULTIBRAWN',
  description: 'מומחים למציאת צימרים, וילות ומתחמי אירועים בישראל',
  inLanguage: 'he-IL',
  publisher: { '@id': 'https://multibrawn.co.il/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://multibrawn.co.il/gallery?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* ── Google Tag Manager ── */}
        <Script id="gtm-init" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* ── Fonts (loaded at runtime to avoid build-time network dependency) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* ── Schema.org JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body>
        {/* ── GTM noscript fallback ── */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* ── GA4 (גם דרך GTM אבל נשאיר כ-backup) ── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>
      </body>
    </html>
  );
}
