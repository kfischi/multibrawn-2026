import type { Metadata } from 'next';
import './globals.css';
import ChatBot from '@/components/layout/ChatBot/ChatBot';
import WhatsAppButton from '@/components/ui/WhatsAppButton/WhatsAppButton';
import AccessibilityMenu from '@/components/ui/AccessibilityMenu/AccessibilityMenu';

export const metadata: Metadata = {
  title: 'MULTIBRAWN | מולטיבראון - צימרים, וילות ומתחמי אירועים',
  description: 'מולטיבראון - השותף שלכם למציאת המקום המושלם לחופשה! צימרים רומנטיים, וילות משפחתיות, מלונות בוטיק ומתחמי אירועים ברחבי הארץ. שירות אישי מהיר ומקצועי.',
  keywords: [
    'צימרים',
    'וילות',
    'מלונות בוטיק',
    'מתחמי אירועים',
    'חופשה',
    'נופש',
    'צימר רומנטי',
    'וילה משפחתית',
    'סופ"ש',
    'multibrawn',
    'מולטיבראון',
    'ערדית',
  ],
  authors: [{ name: 'MULTIBRAWN' }],
  creator: 'MULTIBRAWN',
  publisher: 'MULTIBRAWN',
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
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://multibrawn.co.il',
    title: 'MULTIBRAWN | מולטיבראון - צימרים ווילות',
    description: 'השותף שלכם למציאת המקום המושלם לחופשה! צימרים, וילות ומתחמי אירועים',
    siteName: 'MULTIBRAWN',
    images: [
      {
        url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1762012646/Ardit_znq9aj.jpg',
        width: 1200,
        height: 630,
        alt: 'MULTIBRAWN - צימרים ווילות',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MULTIBRAWN | מולטיבראון - צימרים ווילות',
    description: 'השותף שלכם למציאת המקום המושלם לחופשה!',
    images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1762012646/Ardit_znq9aj.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
        <ChatBot />
        <WhatsAppButton />
        <AccessibilityMenu />
      </body>
    </html>
  );
}
