import Link from 'next/link'
import { getDomainConfig, getPostsByTags } from '@/lib/get-domain-config'
import { redirect } from 'next/navigation'

// 强制动态渲染
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const config = await getDomainConfig()

  // 如果没有配置，显示错误页面
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">域名未配置</h1>
          <p className="text-gray-600 mb-6">
            请联系管理员配置当前域名
          </p>
        </div>
      </div>
    )
  }

  // 获取相关文章
  const allTags = [...config.primaryTags, ...config.secondaryTags]
  const posts = await getPostsByTags(config.website.id, allTags, 12)

  // 判断内链目标（根据标签）
  const isDownloadFocused = config.primaryTags.some(tag =>
    ['下载', 'APK', '安装', '安卓', '版本', '更新'].includes(tag)
  )
  const mainCTA = isDownloadFocused
    ? { url: process.env.NEXT_PUBLIC_DOWNLOAD_SITE || 'https://tg-downloads.com', text: '立即下载 Telegram' }
    : { url: process.env.NEXT_PUBLIC_MAIN_SITE || 'https://telegramconnects.com', text: '访问 Telegram 官网' }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-telegram-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">{config.siteName}</h1>
              <p className="text-xs text-gray-600">Telegram 官方资源</p>
            </div>
          </div>
          <a
            href={mainCTA.url}
            className="bg-telegram-blue text-white px-6 py-2 rounded-full hover:bg-telegram-dark transition font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {mainCTA.text}
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-telegram-blue to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {config.siteName}
          </h2>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            {config.siteDescription}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {config.primaryTags.map(tag => (
              <span key={tag} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={mainCTA.url}
            className="inline-block bg-white text-telegram-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {mainCTA.text} →
          </a>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          相关文章推荐
        </h3>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                {post.coverImage && (
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  {post.category && (
                    <span className="inline-block px-3 py-1 bg-telegram-blue text-white rounded-full text-xs mb-3">
                      {post.category}
                    </span>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h4>
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {new Date(post.publishedAt || post.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                    <a
                      href={`${mainCTA.url}/blog/${post.slug}`}
                      className="text-telegram-blue font-semibold hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      阅读全文 →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">暂无相关文章</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-telegram-blue to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            立即使用 Telegram
          </h3>
          <p className="text-xl opacity-90 mb-8">
            免费、快速、安全的即时通讯应用
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={process.env.NEXT_PUBLIC_DOWNLOAD_SITE || 'https://tg-downloads.com'}
              className="inline-block bg-white text-telegram-blue px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              下载 Telegram
            </a>
            <a
              href={process.env.NEXT_PUBLIC_MAIN_SITE || 'https://telegramconnects.com'}
              className="inline-block bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition border-2 border-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              了解更多
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} {config.siteName}. Telegram 相关资源站点。
          </p>
          <p className="text-xs opacity-50 mt-2">
            本站非 Telegram 官方网站，仅提供资源聚合服务。
          </p>
        </div>
      </footer>
    </div>
  )
}
