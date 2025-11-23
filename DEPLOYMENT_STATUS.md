# 🎯 蜘蛛池网站部署状态

## ✅ 已完成

### 1. 项目结构
```
seo-spider-site/
├── app/
│   ├── layout.tsx          # 动态metadata生成
│   ├── page.tsx            # 首页，根据域名显示内容
│   └── globals.css         # 全局样式
├── lib/
│   ├── database.ts         # Prisma客户端
│   └── get-domain-config.ts # 域名配置和文章匹配核心逻辑
├── prisma/
│   └── schema.prisma       # 数据库schema
├── .env.vps1.example       # VPS-1 环境变量模板
├── .env.vps2.example       # VPS-2 环境变量模板
├── .env.vps3.example       # VPS-3 环境变量模板
├── deploy.sh               # 自动部署脚本
├── ecosystem.config.js     # PM2配置
├── nginx-baota-config.conf # 宝塔Nginx配置模板
├── QUICK_DEPLOY.md         # 快速部署指南
├── DEPLOYMENT_GUIDE.md     # 完整部署文档
└── README.md               # 项目说明
```

### 2. 核心功能

#### ✅ 自动域名识别
- 读取请求的 `host` header
- 从数据库查询匹配的域名配置
- 返回对应的站点名称、描述、标签

#### ✅ 标签匹配文章
- 根据域名配置的 `primaryTags` 和 `secondaryTags`
- 自动从数据库筛选相关文章
- 支持多标签匹配和权重排序

#### ✅ 智能内链
- 根据域名标签判断主要内链目标
- 下载类标签 → tg-downloads.com (70%流量)
- 教程/资讯类标签 → telegramconnects.com (30%流量)

#### ✅ 访问统计
- 每次访问自动记录 `visits` 字段
- 更新 `lastVisit` 时间戳

#### ✅ SEO优化
- 动态生成 meta tags
- Schema.org 结构化数据
- Open Graph 支持
- Sitemap 生成

### 3. 部署配置

#### VPS-1 (3个域名)
```
autopushnetwork.xyz      → 下载、APK、安卓
contentpoolzone.site     → 下载、APK、安卓
crawlboostnet.xyz        → 下载、APK、安卓
```
**环境变量:** `.env.vps1.example` → `.env.local`
**VPS_NUMBER:** 1

#### VPS-2 (6个域名)
```
seohubnetwork.xyz        → 下载、安装、指南
spidertrackzone.xyz      → 下载、安装、指南
trafficboostflow.site    → 下载、安装、指南
globalinsighthub.xyz     → 教程、使用、功能
adminapihub.xyz          → 分析、趋势、营销
infostreammedia.xyz      → 资讯、动态、新闻
```
**环境变量:** `.env.vps2.example` → `.env.local`
**VPS_NUMBER:** 2

#### VPS-3 (3个域名)
```
rankspiderchain.xyz      → 更新、版本、新功能
linkpushmatrix.site      → 更新、版本、新功能
crawlenginepro.xyz       → 更新、版本、新功能
```
**环境变量:** `.env.vps3.example` → `.env.local`
**VPS_NUMBER:** 3

### 4. Git提交记录

```
46d0f33 feat: 添加VPS部署配置文件
28d399c feat: 初始化蜘蛛池网站项目
```

---

## 📋 下一步操作

### 步骤1: 上传代码到VPS

**方式A - 使用Git（推荐）:**
```bash
# 在每台VPS上执行
cd /www/wwwroot
git clone <你的仓库地址> spider-site
cd spider-site
```

**方式B - 使用宝塔面板:**
1. 压缩项目文件夹为 `spider-site.zip`
2. 通过宝塔面板上传到 `/www/wwwroot/`
3. 解压

### 步骤2: 配置环境变量

**VPS-1:**
```bash
cd /www/wwwroot/spider-site
cp .env.vps1.example .env.local
```

**VPS-2:**
```bash
cd /www/wwwroot/spider-site
cp .env.vps2.example .env.local
```

**VPS-3:**
```bash
cd /www/wwwroot/spider-site
cp .env.vps3.example .env.local
```

### 步骤3: 运行部署脚本

```bash
chmod +x deploy.sh
./deploy.sh
```

### 步骤4: 宝塔面板配置

#### 添加网站
- 根据VPS编号添加对应的域名
- 根目录: `/www/wwwroot/spider-site`
- PHP版本: 纯静态

#### 配置反向代理
- 设置 → 反向代理 → 添加反向代理
- 目标URL: `http://127.0.0.1:3000`
- 复制 `nginx-baota-config.conf` 内容到配置框

#### 配置SSL
- SSL → Let's Encrypt → 申请证书
- 开启"强制HTTPS"

### 步骤5: 验证部署

```bash
# 检查PM2状态
pm2 status

# 测试域名（根据VPS替换域名）
curl -I https://autopushnetwork.xyz
```

---

## 📊 数据库配置状态

### ✅ 已在数据库配置的蜘蛛池域名

| 域名 | VPS | 主要标签 | 内链目标 |
|------|-----|---------|---------|
| autopushnetwork.xyz | 1 | 下载,APK,安卓 | tg-downloads.com |
| contentpoolzone.site | 1 | 下载,APK,安卓 | tg-downloads.com |
| crawlboostnet.xyz | 1 | 下载,APK,安卓 | tg-downloads.com |
| globalinsighthub.xyz | 2 | 教程,使用,功能 | telegramconnects.com |
| crawlenginepro.xyz | 2 | 更新,版本,新功能 | tg-downloads.com |
| linkpushmatrix.site | 2 | 更新,版本,新功能 | tg-downloads.com |
| rankspiderchain.xyz | 2 | 更新,版本,新功能 | tg-downloads.com |
| infostreammedia.xyz | 3 | 资讯,动态,新闻 | telegramconnects.com |
| seohubnetwork.xyz | 3 | 下载,安装,指南 | tg-downloads.com |
| spidertrackzone.xyz | 3 | 下载,安装,指南 | tg-downloads.com |
| trafficboostflow.site | 3 | 下载,安装,指南 | tg-downloads.com |
| adminapihub.xyz | 3 | 分析,趋势,营销 | telegramconnects.com |

**数据配置脚本:** `/home/ubuntu/WebstormProjects/seo-admin/scripts/seo/optimize_spider_pool.js`

---

## 🎯 SEO策略

### 70/30 流量分配
- **70%流量 → 下载页** (9个高优先级域名)
  - 转化导向
  - 下载关键词
  - 直接变现

- **30%流量 → 主站** (3个中优先级域名)
  - 内容建设
  - 品牌信任
  - 教程资讯

### 完整SEO指南
参考: `/home/ubuntu/WebstormProjects/seo-admin/docs/SEO_RANKING_GUIDE.md`

---

## 🛠️ 维护和监控

### PM2 命令
```bash
pm2 status                  # 查看状态
pm2 logs spider-site        # 查看日志
pm2 restart spider-site     # 重启
pm2 monit                   # 性能监控
```

### 更新代码
```bash
cd /www/wwwroot/spider-site
git pull origin main
npm install
npm run build
pm2 restart spider-site
```

### 日志位置
- PM2日志: `/root/.pm2/logs/`
- 应用日志: `/www/wwwroot/spider-site/logs/`
- Nginx日志: `/www/wwwlogs/`

---

## ✅ 部署检查清单

### 代码和配置
- [ ] 代码已上传到所有3台VPS
- [ ] 每台VPS配置了正确的 `.env.local`
- [ ] `VPS_NUMBER` 分别设置为 1, 2, 3

### 部署脚本
- [ ] VPS-1 运行了 `deploy.sh`
- [ ] VPS-2 运行了 `deploy.sh`
- [ ] VPS-3 运行了 `deploy.sh`

### PM2 状态
- [ ] VPS-1 的 PM2 显示 `spider-site` 在线
- [ ] VPS-2 的 PM2 显示 `spider-site` 在线
- [ ] VPS-3 的 PM2 显示 `spider-site` 在线

### 宝塔面板配置
- [ ] VPS-1 添加了3个网站
- [ ] VPS-2 添加了6个网站
- [ ] VPS-3 添加了3个网站
- [ ] 所有网站配置了Nginx反向代理
- [ ] 所有网站申请了SSL证书
- [ ] 所有网站开启了强制HTTPS

### DNS配置
- [ ] 所有域名的A记录指向正确的VPS IP
- [ ] DNS解析已生效（使用 `nslookup` 检查）

### 功能测试
- [ ] 访问每个域名返回200状态
- [ ] 每个域名显示正确的站点名称
- [ ] 文章列表正常显示
- [ ] 内链跳转到正确的目标站（下载页/主站）
- [ ] SSL证书有效，HTTPS正常工作

---

## 📞 技术支持

### 常见问题
参考: `DEPLOYMENT_GUIDE.md` 的"故障排除"章节

### 项目文档
- `README.md` - 项目介绍
- `QUICK_DEPLOY.md` - 快速部署指南
- `DEPLOYMENT_GUIDE.md` - 完整部署文档
- `/home/ubuntu/WebstormProjects/seo-admin/docs/SEO_RANKING_GUIDE.md` - SEO策略

---

**状态: 🟢 代码已完成，等待部署到VPS**

**准备程度: 100%**
