import Script from 'next/script';

const authorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://multibrawn.co.il/#ardit',
  name: 'ערדית בראון',
  alternateName: ['Ardit Brown', 'Ardit', 'ערדית'],
  jobTitle: 'מומחית נופש ואירועים | מייסדת MULTIBRAWN',
  url: 'https://multibrawn.co.il/about',
  image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg',
  worksFor: { '@id': 'https://multibrawn.co.il/#organization' },
  sameAs: [
    'https://www.instagram.com/multibrawn',
    'https://www.facebook.com/multibrawn',
    'https://www.tiktok.com/@multibrawn',
  ],
  knowsAbout: [
    'שבת חתן', 'צימרים בישראל', 'וילות להשכרה',
    'ארגון אירועים', 'שבע ברכות', 'נופש משפחתי',
  ],
};

const blogSectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': 'https://multibrawn.co.il/blog#blog',
  name: 'בלוג MULTIBRAWN',
  description: 'מדריכים מקצועיים לבחירת צימר, וילה ומתחם אירועים בישראל',
  url: 'https://multibrawn.co.il/blog',
  publisher: { '@id': 'https://multibrawn.co.il/#organization' },
  author: { '@id': 'https://multibrawn.co.il/#ardit' },
  inLanguage: 'he-IL',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="schema-blog-author"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />
      <Script
        id="schema-blog-section"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSectionSchema) }}
      />
      {children}
    </>
  );
}
