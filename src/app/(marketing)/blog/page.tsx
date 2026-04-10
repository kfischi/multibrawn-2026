import type { Metadata } from 'next';
import BlogClient from './BlogClient';
import { getAllBlogPosts } from '@/sanity/queries';

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

export default async function BlogPage() {
  const rawPosts = await getAllBlogPosts().catch(() => []);

  const sanityPosts = rawPosts.map((p: any) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || '',
    category: p.category || 'מדריכים',
    image: p.coverImage || p.coverImageUrl || '',
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString('he-IL', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '',
    readTime: '5 דקות',
  }));

  return <BlogClient sanityPosts={sanityPosts} />;
}
