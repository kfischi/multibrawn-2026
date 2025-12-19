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
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Landing pages by region (SEO gold!)
  const landingPages = [
    // By Region
    `${baseUrl}/zimmers-north`,
    `${baseUrl}/zimmers-center`,
    `${baseUrl}/zimmers-south`,
    `${baseUrl}/villas-north`,
    `${baseUrl}/villas-center`,
    `${baseUrl}/villas-south`,
    `${baseUrl}/hotels-north`,
    `${baseUrl}/hotels-center`,
    `${baseUrl}/hotels-south`,
    
    // By Specific Location
    `${baseUrl}/zimmers-galilee`,
    `${baseUrl}/zimmers-golan`,
    `${baseUrl}/zimmers-jerusalem`,
    `${baseUrl}/zimmers-dead-sea`,
    `${baseUrl}/villas-galilee`,
    `${baseUrl}/event-venues-north`,
    `${baseUrl}/event-venues-center`,
    `${baseUrl}/event-venues-south`,
    
    // By Feature
    `${baseUrl}/zimmers-with-pool`,
    `${baseUrl}/zimmers-with-jacuzzi`,
    `${baseUrl}/romantic-zimmers`,
    `${baseUrl}/family-villas`,
    `${baseUrl}/shabbat-observant`,
    `${baseUrl}/kosher-venues`,
    
    // By Occasion
    `${baseUrl}/bar-mitzvah-venues`,
    `${baseUrl}/wedding-venues`,
    `${baseUrl}/birthday-venues`,
    `${baseUrl}/corporate-events`,
  ].map(url => ({
    url,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Blog posts (to be created)
  const blogPosts = [
    `${baseUrl}/blog`,
    `${baseUrl}/blog/best-zimmers-north-2025`,
    `${baseUrl}/blog/planning-perfect-shabbat-hatan`,
    `${baseUrl}/blog/zimmers-with-pools-guide`,
    `${baseUrl}/blog/romantic-weekend-getaway-ideas`,
    `${baseUrl}/blog/family-vacation-villas-israel`,
  ].map(url => ({
    url,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...mainPages, ...landingPages, ...blogPosts];
}
