// src/app/layout.tsx

import type { Metadata } from 'next';
import { Heebo } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const heebo = Heebo({ 
  subsets: ['latin', 'hebrew'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-heebo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://multibrawn.co.il'),
  title: {
    default: 'MULTIBRAWN - צימרים, וילות ומתחמי אירועים בישראל',
    template: '%s | MULTIBRAWN'
  },
  description: 'מומחים למציאת הצימר, הוילה או מתחם האירועים המושלם עבורכם. 10+ שנות ניסיון, 500+ לקוחות מרוצים',
  keywords: ['צימרים', 'וילות', 'מתחמי אירועים', 'שבת חתן', 'צפון', 'ישראל'],
  authors: [{ name: 'MULTIBRAWN' }],
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://multibrawn.co.il',
    siteName: 'MULTIBRAWN',
    title: 'MULTIBRAWN - צימרים, וילות ומתחמי אירועים',
    description: 'מומחים למציאת הצימר המושלם',
    images: [{
      url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg',
      width: 1200,
      height: 630,
      alt: 'MULTIBRAWN לוגו',
    }],
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
    // תוסיף את זה אחרי שתקבל מ-Google Search Console
    google: 'YOUR-VERIFICATION-CODE-HERE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <head>
        {/* Google Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX');
              `}
            </Script>
          </>
        )}

        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "MULTIBRAWN",
              "url": "https://multibrawn.co.il",
              "logo": "https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg",
              "description": "מומחים למציאת צימרים, וילות ומתחמי אירועים בישראל",
              "telephone": "+972-52-398-3394",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IL"
              },
              "sameAs": [
                "https://www.facebook.com/multibrawn",
                "https://www.instagram.com/multibrawn",
                "https://wa.me/972523983394"
              ]
            })
          }}
        />
      </head>
      <body className={heebo.className}>
        {children}
      </body>
    </html>
  );
}
