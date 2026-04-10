/** @type {import('next').NextConfig} */
const nextConfig = {
  // Workaround: Next.js 15.5.x generates validator.ts with wrong paths for src/ projects
  // (imports ../../app/ instead of ../../src/app/) — suppress TS errors only in build
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dptyfvwyo/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/decirk3zb/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  compress: true,
};

module.exports = nextConfig;
