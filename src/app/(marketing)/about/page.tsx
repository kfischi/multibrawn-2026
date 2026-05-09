import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'אודות MULTIBRAWN | הסיפור שלנו',
  description: 'MULTIBRAWN — מומחים למציאת צימרים, וילות ומתחמי אירועים בישראל. הכירו את הצוות והחזון שלנו.',
  alternates: { canonical: 'https://multibrawn.co.il/about' },
  openGraph: {
    title: 'אודות MULTIBRAWN | הסיפור שלנו',
    description: 'מומחים למציאת הלוקיישן המושלם — שבת חתן, נופש משפחתי, רומנטיקה.',
    url: 'https://multibrawn.co.il/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
