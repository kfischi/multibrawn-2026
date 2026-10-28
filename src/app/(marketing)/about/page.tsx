import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: { absolute: 'ערדית בראון | המייסדת של MULTIBRAWN — הסיפור שלי' },
  description:
    'ערדית בראון — יזמית עם 10+ שנות ניסיון, מייסדת MULTIBRAWN. מחברת משפחות, זוגות וקבוצות לוילות, צימרים ומתחמי שבת חתן בכל הארץ. הכירו את הסיפור.',
  alternates: { canonical: 'https://multibrawn.co.il/about' },
  openGraph: {
    title: 'ערדית בראון | המייסדת של MULTIBRAWN',
    description:
      'יזמית עם 10+ שנות ניסיון בחיבורים בין אנשים ללוקיישנים — וילות, צימרים, שבת חתן ואירועים.',
    url: 'https://multibrawn.co.il/about',
    type: 'profile',
  },
};

// ── Schema.org: Person — ערדית בראון ──
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://multibrawn.co.il/#ardit',
  name: 'ערדית בראון',
  alternateName: 'Ardit Brown',
  jobTitle: 'מייסדת MULTIBRAWN',
  description:
    'יזמית עם מעל 10 שנות ניסיון בהפקות, אירועים וחיבורים עסקיים. מייסדת MULTIBRAWN — התאמה אישית של וילות, צימרים, מתחמי שבת חתן ואירועים בישראל.',
  url: 'https://multibrawn.co.il/about',
  worksFor: { '@id': 'https://multibrawn.co.il/#organization' },
  knowsAbout: [
    'שבת חתן',
    'וילות נופש',
    'צימרים',
    'מתחמי אירועים',
    'ניהול קהילות',
    'פרסום אורגני',
  ],
  sameAs: [
    'https://www.facebook.com/multibrawn',
    'https://www.instagram.com/multibrawn',
    'https://www.tiktok.com/@multibrawn',
    'https://www.youtube.com/@multibrawn',
  ],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutClient />
    </>
  );
}
