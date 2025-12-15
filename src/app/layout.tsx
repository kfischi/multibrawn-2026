import type { Metadata } from 'next';
import './globals.css';
import ChatBot from '@/components/layout/ChatBot/ChatBot';
import WhatsAppButton from '@/components/ui/WhatsAppButton/WhatsAppButton';
import AccessibilityMenu from '@/components/ui/AccessibilityMenu/AccessibilityMenu';

export const metadata: Metadata = {
  title: 'MULTIBRAWN | מולטיבראון - צימרים, וילות ודירות נופש',
  description: 'מולטיבראון - השותף שלכם למציאת המקום המושלם לחופשה! צימרים רומנטיים, וילות משפחתיות, דירות נופש, מלונות בוטיק ומתחמי אירועים ברחבי הארץ. שירות אישי מהיר ומקצועי.',
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
    title: 'MULTIBRAWN | מולטיבראון - צימרים, וילות ודירות נופש',
    description: 'השותף שלכם למציאת המקום המושלם לחופשה! צימרים, וילות, דירות נופש ומתחמי אירועים',
    siteName: 'MULTIBRAWN',
    images: [
      {
        url: 'https://res.cloudinary.com/dptyfvwyo/video/upload/so_0/%D7%95%D7%99%D7%93%D7%90%D7%95_%D7%9C%D7%95%D7%95%D7%98%D7%A1%D7%90%D7%A4_rxu1cb.jpg',
        width: 1200,
        height: 630,
        alt: 'MULTIBRAWN - צימרים וילות ודירות נופש',
      },
    ],
    videos: [
      {
        url: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1765392616/%D7%95%D7%99%D7%93%D7%90%D7%95_%D7%9C%D7%95%D7%95%D7%98%D7%A1%D7%90%D7%A4_rxu1cb.mp4',
        type: 'video/mp4',
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MULTIBRAWN | מולטיבראון - צימרים, וילות ודירות נופש',
    description: 'השותף שלכם למציאת המקום המושלם לחופשה!',
    images: ['https://res.cloudinary.com/dptyfvwyo/video/upload/so_0/%D7%95%D7%99%D7%93%D7%90%D7%95_%D7%9C%D7%95%D7%95%D7%98%D7%A1%D7%90%D7%A4_rxu1cb.jpg'],
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
      <head>
  <head>
     <meta name="google-site-verification: google566cd679430f73f1.html" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
        />
      </head>
      <body>
        {children}
        <ChatBot />
        <WhatsAppButton />
        <AccessibilityMenu />
      </body>
    </html>
  );
}
