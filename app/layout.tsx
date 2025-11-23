import type { Metadata } from 'next'
import './globals.css'
import { getDomainConfig } from '@/lib/get-domain-config'

// 强制动态渲染
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getDomainConfig()

  if (!config) {
    return {
      title: 'Telegram下载 - 官方网站',
      description: 'Telegram官方下载页面，免费安全的即时通讯应用。',
    }
  }

  const keywords = [...config.primaryTags, ...config.secondaryTags]

  return {
    title: {
      default: config.siteName,
      template: `%s | ${config.siteName}`
    },
    description: config.siteDescription,
    keywords: keywords.join(', '),
    robots: {
      index: true,
      follow: true
    },
    openGraph: {
      title: config.siteName,
      description: config.siteDescription,
      type: 'website',
      locale: 'zh_CN'
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
