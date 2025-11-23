# 🕷️ SEO蜘蛛池网站

轻量级、高性能的蜘蛛池网站，用于SEO引流和权重分散。

## ✨ 特性

- 🚀 **自动域名识别** - 根据访问域名自动匹配数据库配置
- 📊 **动态内容** - 基于标签匹配显示相关文章
- 🎯 **智能内链** - 自动引流到主站和下载页
- 📈 **访问统计** - 记录每个域名的访问次数
- ⚡ **高性能** - Next.js 14 + Standalone 模式
- 🔒 **安全** - 数据库连接使用 SSL + 连接池

## 🏗️ 技术栈

- **框架：** Next.js 14 (App Router)
- **数据库：** PostgreSQL (Supabase)
- **ORM：** Prisma
- **样式：** Tailwind CSS
- **部署：** PM2 + Nginx (宝塔面板)

## 📦 安装

```bash
# 克隆项目
git clone <repo-url>
cd seo-spider-site

# 安装依赖
npm install

# 配置环境变量
cp .env.local.example .env.local
# 编辑 .env.local 填入数据库连接等信息

# 生成 Prisma Client
npx prisma generate

# 开发模式
npm run dev

# 构建
npm run build

# 生产模式
npm start
```

## 🚀 部署

详见 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### 快速部署（VPS）

```bash
# 1. 上传代码到服务器
cd /www/wwwroot/spider-site

# 2. 配置环境变量
cp .env.local.example .env.local
nano .env.local

# 3. 运行部署脚本
chmod +x deploy.sh
./deploy.sh
```

## 🌐 域名配置

### VPS-1
- autopushnetwork.xyz
- contentpoolzone.site
- crawlboostnet.xyz

### VPS-2
- globalinsighthub.xyz
- crawlenginepro.xyz
- linkpushmatrix.site
- rankspiderchain.xyz

### VPS-3
- infostreammedia.xyz
- seohubnetwork.xyz
- spidertrackzone.xyz
- trafficboostflow.site
- adminapihub.xyz

## 📖 工作原理

```
用户访问蜘蛛池域名
  ↓
Next.js 获取访问域名
  ↓
查询数据库获取该域名的配置
  ↓
根据标签匹配文章
  ↓
渲染页面（包含内链到主站/下载页）
  ↓
记录访问统计
```

## 🔧 配置说明

### 数据库配置

在数据库的 `domain_alias` 表中配置：

```sql
{
  "domain": "autopushnetwork.xyz",
  "siteName": "Telegram 下载资源",
  "siteDescription": "Telegram APK下载和安装指南",
  "primaryTags": ["下载", "APK", "安卓"],
  "secondaryTags": ["安装", "教程"],
  "domainType": "SPIDER_POOL"
}
```

### 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `DATABASE_URL` | 数据库连接 | `postgresql://...` |
| `NEXT_PUBLIC_MAIN_SITE` | 主站URL | `https://telegramconnects.com` |
| `NEXT_PUBLIC_DOWNLOAD_SITE` | 下载页URL | `https://tg-downloads.com` |
| `VPS_NUMBER` | VPS编号 | `1`, `2`, `3` |

## 📊 监控

```bash
# PM2 状态
pm2 status

# 查看日志
pm2 logs spider-site

# 性能监控
pm2 monit
```

## 🔐 安全

- ✅ 数据库连接使用 SSL
- ✅ 环境变量加密存储
- ✅ 限制数据库连接数
- ✅ XSS 防护
- ✅ HTTPS 强制

## 📈 性能优化

- ✅ Standalone 模式（减少依赖）
- ✅ Gzip 压缩
- ✅ 静态资源缓存
- ✅ 数据库查询优化
- ✅ 图片懒加载

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

Private - All Rights Reserved
