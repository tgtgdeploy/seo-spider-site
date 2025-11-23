/**
 * 蜘蛛池域名配置获取
 * 根据访问域名自动匹配数据库配置
 */

import { prisma } from './database'
import { headers } from 'next/headers'

export interface DomainConfig {
  domain: string
  siteName: string
  siteDescription: string
  primaryTags: string[]
  secondaryTags: string[]
  website: {
    id: string
    name: string
    domain: string
  }
}

/**
 * 根据当前访问域名获取配置
 */
export async function getDomainConfig(): Promise<DomainConfig | null> {
  try {
    const headersList = headers()
    const host = headersList.get('host') || ''
    const domain = host.split(':')[0]

    console.log(`[Spider] 访问域名: ${domain}`)

    // 查询域名配置
    const domainAlias = await prisma.domainAlias.findFirst({
      where: {
        domain: {
          equals: domain,
          mode: 'insensitive'
        },
        status: 'ACTIVE',
        domainType: 'SPIDER_POOL' // 只匹配蜘蛛池类型
      },
      include: {
        website: {
          select: {
            id: true,
            name: true,
            domain: true
          }
        }
      }
    })

    if (!domainAlias) {
      console.log(`[Spider] ⚠️  未找到域名配置: ${domain}`)
      return null
    }

    console.log(`[Spider] ✅ 找到配置: ${domainAlias.domain} → ${domainAlias.website.name}`)

    // 记录访问
    await prisma.domainAlias.update({
      where: { id: domainAlias.id },
      data: {
        visits: { increment: 1 },
        lastVisit: new Date()
      }
    }).catch(err => console.error('记录访问失败:', err))

    return {
      domain: domainAlias.domain,
      siteName: domainAlias.siteName,
      siteDescription: domainAlias.siteDescription,
      primaryTags: domainAlias.primaryTags,
      secondaryTags: domainAlias.secondaryTags,
      website: domainAlias.website
    }

  } catch (error) {
    console.error('[Spider] 获取域名配置失败:', error)
    return null
  }
}

/**
 * 根据标签获取文章
 */
export async function getPostsByTags(websiteId: string, tags: string[], limit = 10) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        websiteId,
        status: 'PUBLISHED',
        OR: tags.map(tag => ({
          OR: [
            { metaKeywords: { has: tag } },
            { tags: { has: tag } },
            { category: { contains: tag, mode: 'insensitive' } },
            { title: { contains: tag, mode: 'insensitive' } }
          ]
        }))
      },
      orderBy: {
        publishedAt: 'desc'
      },
      take: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        coverImage: true,
        category: true,
        tags: true,
        publishedAt: true,
        createdAt: true
      }
    })

    return posts
  } catch (error) {
    console.error('[Spider] 获取文章失败:', error)
    return []
  }
}
