/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack設定
  turbopack: {
    root: __dirname,
  },
  
  // 画像最適化
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // セキュリティヘッダー
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  
  // リダイレクト設定
  async redirects() {
    return [
      {
        source: '/booking',
        destination: '/',
        permanent: false,
      },
      {
        source: '/booking/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
  
  // 実験的機能
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
