/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // 适合VPS部署
  poweredByHeader: false,
  compress: true,

  // 优化
  swcMinify: true,

  // 图片优化
  images: {
    domains: ['bsuvzqihxbgoclfvgbhx.supabase.co'],
    unoptimized: true // VPS上不需要Next.js图片优化
  },

  // 环境变量
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_MAIN_SITE: process.env.NEXT_PUBLIC_MAIN_SITE,
    NEXT_PUBLIC_DOWNLOAD_SITE: process.env.NEXT_PUBLIC_DOWNLOAD_SITE,
  },

  // 重定向配置（可选）
  async redirects() {
    return []
  },
}

module.exports = nextConfig
