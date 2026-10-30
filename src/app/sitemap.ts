import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://multibrawn.co.il';

  // Main pages
  const mainPages = [
    { url: baseUrl, lastModified: '2026-10-01', changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/gallery`, lastModified: '2026-10-01', changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/shabbat-hatan`, lastModified: '2026-09-01', changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/tips`, lastModified: '2026-08-01', changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: '2026-09-01', changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: '2026-08-01', changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: '2025-01-01', changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/accessibility-statement`, lastModified: '2025-01-01', changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  // Landing pages
  const landingPages = [
    { url: `${baseUrl}/zimmerim-galil-elyon`, lastModified: '2026-09-01' },
    { url: `${baseUrl}/affiliate-gallery`, lastModified: '2026-10-01' },
    { url: `${baseUrl}/multi-global`, lastModified: '2026-09-01' },
  ].map(({ url, lastModified }) => ({
    url,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Blog posts with real publish dates
  const blogPosts: Array<{ url: string; lastModified: string }> = [
    { url: `${baseUrl}/blog`, lastModified: '2026-10-01' },
    { url: `${baseUrl}/blog/shabbat-hatan-rosh-shaket`, lastModified: '2025-03-01' },
    { url: `${baseUrl}/blog/shabbat-hatan-cost-guide`, lastModified: '2025-04-01' },
    { url: `${baseUrl}/blog/shabbat-hatan-jerusalem`, lastModified: '2025-04-01' },
    { url: `${baseUrl}/blog/why-multi`, lastModified: '2025-05-01' },
    { url: `${baseUrl}/blog/villa-30-guests`, lastModified: '2025-05-01' },
    { url: `${baseUrl}/blog/eilat-warning`, lastModified: '2025-06-01' },
    { url: `${baseUrl}/blog/cheap-zimmer-warning`, lastModified: '2025-06-01' },
    { url: `${baseUrl}/blog/villa-dangers`, lastModified: '2025-06-01' },
    { url: `${baseUrl}/blog/heated-pool-guide`, lastModified: '2025-07-01' },
    { url: `${baseUrl}/blog/modesty-check-religious`, lastModified: '2025-07-01' },
    { url: `${baseUrl}/blog/jacuzzi-hygiene-check`, lastModified: '2025-07-01' },
    { url: `${baseUrl}/blog/adults-only-quiet-guide`, lastModified: '2025-08-01' },
    { url: `${baseUrl}/blog/breakfast-value-guide`, lastModified: '2025-08-01' },
    { url: `${baseUrl}/blog/photos-vs-reality-guide`, lastModified: '2025-08-01' },
    { url: `${baseUrl}/blog/real-fireplace-guide`, lastModified: '2025-09-01' },
    { url: `${baseUrl}/blog/last-minute-deals-guide`, lastModified: '2025-09-01' },
    { url: `${baseUrl}/blog/massage-to-room-guide`, lastModified: '2025-09-01' },
    { url: `${baseUrl}/blog/hidden-villa-costs`, lastModified: '2025-10-01' },
    { url: `${baseUrl}/blog/luxury-villa-wear-and-tear`, lastModified: '2025-10-01' },
    { url: `${baseUrl}/blog/villa-greece-guide`, lastModified: '2025-11-01' },
    { url: `${baseUrl}/blog/10-zimmer-mistakes`, lastModified: '2025-11-01' },
    { url: `${baseUrl}/blog/villa-vs-hotel`, lastModified: '2025-12-01' },
    { url: `${baseUrl}/blog/galil-elyon-family`, lastModified: '2026-01-01' },
    { url: `${baseUrl}/blog/passover-vacation-tips`, lastModified: '2026-02-01' },
    { url: `${baseUrl}/blog/pool-villa-checklist`, lastModified: '2026-03-01' },
  ].map(({ url, lastModified }) => ({
    url,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [...mainPages, ...landingPages, ...blogPosts];
}
