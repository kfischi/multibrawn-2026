/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cloudinary Loader - אופטימיזציה אוטומטית!
    loader: 'custom',
    loaderFile: './src/lib/cloudinaryLoader.js',
    
    // Fallback למקרה שה-loader לא עובד
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
    ],
    
    // פורמטים מודרניים
    formats: ['image/avif', 'image/webp'],
    
    // Device sizes - Next.js ייצור גרסאות בגדלים האלה
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Image sizes לתמונות קטנות יותר
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Cache optimization
    minimumCacheTTL: 60,
    
    // Disable static imports (optional)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Build optimization
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
  trailingSlash: false,
  
  // Output optimization
  poweredByHeader: false,
  
  // Experimental features
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
