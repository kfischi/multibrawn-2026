import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://multibrawn.co.il';
  const currentDate = new Date().toISOString().split('T')[0];

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shabbat-hatan`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tips`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/accessibility-statement`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Existing landing page
  const landingPages = [
    `${baseUrl}/zimmerim-galil-elyon`,
    `${baseUrl}/affiliate-gallery`,
    `${baseUrl}/multi-global`,
  ].map(url => ({
    url,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Actual blog posts that exist
  const blogPosts = [
    `${baseUrl}/blog`,
    `${baseUrl}/blog/shabbat-hatan-rosh-shaket`,
    `${baseUrl}/blog/eilat-warning`,
    `${baseUrl}/blog/cheap-zimmer-warning`,
    `${baseUrl}/blog/villa-dangers`,
    `${baseUrl}/blog/heated-pool-guide`,
    `${baseUrl}/blog/modesty-check-religious`,
    `${baseUrl}/blog/jacuzzi-hygiene-check`,
    `${baseUrl}/blog/adults-only-quiet-guide`,
    `${baseUrl}/blog/breakfast-value-guide`,
    `${baseUrl}/blog/photos-vs-reality-guide`,
    `${baseUrl}/blog/real-fireplace-guide`,
    `${baseUrl}/blog/last-minute-deals-guide`,
    `${baseUrl}/blog/massage-to-room-guide`,
    `${baseUrl}/blog/hidden-villa-costs`,
    `${baseUrl}/blog/luxury-villa-wear-and-tear`,
  ].map(url => ({
    url,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [...mainPages, ...landingPages, ...blogPosts];
}
