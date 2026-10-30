import Script from 'next/script';

interface ArticleJsonLdProps {
  url: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  keywords?: string[];
}

export default function ArticleJsonLd({
  url,
  title,
  description,
  datePublished,
  dateModified,
  image = 'https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg',
  keywords = [],
}: ArticleJsonLdProps) {
  const slug = url.split('/').pop() ?? '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: title,
    description,
    url,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { '@id': 'https://multibrawn.co.il/#ardit' },
    publisher: { '@id': 'https://multibrawn.co.il/#organization' },
    inLanguage: 'he-IL',
    isPartOf: { '@id': 'https://multibrawn.co.il/blog#blog' },
    keywords: keywords.join(', '),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'בית', item: 'https://multibrawn.co.il' },
        { '@type': 'ListItem', position: 2, name: 'בלוג', item: 'https://multibrawn.co.il/blog' },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ],
    },
  };

  return (
    <Script
      id={`schema-article-${slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
