/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tours.tzimer360.co.il',
        pathname: '/Images/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
    unoptimized: true, // אם יש בעיות עם אופטימיזציה
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
