import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'בלוג | טיפים ומדריכים לנופש מושלם',
  description: 'מדריכים מקצועיים לבחירת צימר, וילה ומתחם אירועים — בריכה מחוממת, ג׳קוזי, שבת חתן ועוד.',
  alternates: { canonical: 'https://multibrawn.co.il/blog' },
  openGraph: {
    title: 'בלוג MULTIBRAWN | טיפים ומדריכים',
    description: 'כל מה שצריך לדעת לפני שמזמינים צימר או וילה בישראל.',
    url: 'https://multibrawn.co.il/blog',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
