# 🕷️ 蜘蛛池网站部署指南（宝塔面板）

## 📋 服务器规划

### VPS 分配方案
```
VPS-1 (IP: xxx.xxx.xxx.1)
├─ autopushnetwork.xyz
├─ contentpoolzone.site
└─ crawlboostnet.xyz

VPS-2 (IP: xxx.xxx.xxx.2)
├─ globalinsighthub.xyz
├─ crawlenginepro.xyz
├─ linkpushmatrix.site
└─ rankspiderchain.xyz

VPS-3 (IP: xxx.xxx.xxx.3)
├─ infostreammedia.xyz
├─ seohubnetwork.xyz
├─ spidertrackzone.xyz
├─ trafficboostflow.site
└─ adminapihub.xyz
```

---

## 🚀 部署步骤

### 1. 准备工作

**在每台 VPS 上安装：**
- Node.js 18.x 或更高
- PM2（进程管理器）
- Nginx（已有宝塔面板则跳过）

```bash
# 通过宝塔面板安装 Node.js
# 软件商店 → Node.js → 安装 v18.x

# 安装 PM2
npm install -g pm2
```

### 2. 上传代码

**方式A：Git 克隆（推荐）**
```bash
cd /www/wwwroot
git clone <your-repo-url> spider-site
cd spider-site
```

**方式B：FTP 上传**
- 使用宝塔面板的文件管理器
- 上传整个项目文件夹到 `/www/wwwroot/spider-site`

### 3. 配置环境变量

```bash
cd /www/wwwroot/spider-site
cp .env.local.example .env.local
nano .env.local
```

**VPS-1 配置：**
```env
DATABASE_URL="postgresql://postgres:bBUoi3ezVB5pRvXY@db.bsuvzqihxbgoclfvgbhx.supabase.co:5432/postgres?schema=public&pgbouncer=true&connection_limit=1"

NEXT_PUBLIC_SITE_NAME="Telegram SEO Spider"
NEXT_PUBLIC_MAIN_SITE="https://telegramconnects.com"
NEXT_PUBLIC_DOWNLOAD_SITE="https://tg-downloads.com"
ADMIN_API_URL="https://adminseohub.xyz"

VPS_NUMBER=1
NODE_ENV=production
PORT=3000
```

**VPS-2 和 VPS-3：** 只需修改 `VPS_NUMBER` 为 2 和 3

### 4. 运行部署脚本

```bash
chmod +x deploy.sh
./deploy.sh
```

脚本会自动：
- ✅ 安装依赖
- ✅ 生成 Prisma Client
- ✅ 构建项目
- ✅ 启动 PM2 进程
- ✅ 配置开机自启

### 5. 宝塔面板配置

#### 5.1 添加网站

**对于 VPS-1：**

1. 进入宝塔面板 → 网站 → 添加站点
2. 域名填写：`autopushnetwork.xyz`
3. 根目录：`/www/wwwroot/spider-site`
4. PHP版本：纯静态
5. 重复以上步骤添加其他2个域名

#### 5.2 配置 Nginx 反向代理

点击网站 → 设置 → 反向代理 → 添加反向代理

**目标URL：** `http://127.0.0.1:3000`

**配置文件内容：**
```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # WebSocket 支持（如果需要）
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # 缓存设置
    proxy_cache_bypass $http_upgrade;
}
```

#### 5.3 配置 SSL 证书

1. 网站设置 → SSL → Let's Encrypt
2. 勾选所有域名
3. 点击申请
4. 开启"强制HTTPS"

### 6. 验证部署

**检查服务状态：**
```bash
pm2 status
pm2 logs spider-site --lines 50
```

**测试域名：**
```bash
curl -I https://autopushnetwork.xyz
```

应该返回 200 状态码。

### 7. 性能优化

#### 7.1 Nginx 缓存配置

编辑网站配置文件，添加缓存规则：

```nginx
# 静态资源缓存
location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML 不缓存
location ~* \.(html)$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

#### 7.2 Gzip 压缩

在 Nginx 配置中启用：
```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

---

## 🔧 维护命令

### PM2 管理

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs spider-site

# 重启应用
pm2 restart spider-site

# 停止应用
pm2 stop spider-site

# 删除应用
pm2 delete spider-site

# 监控
pm2 monit
```

### 更新代码

```bash
cd /www/wwwroot/spider-site

# 拉取最新代码
git pull origin main

# 重新构建
npm install
npm run build

# 重启应用
pm2 restart spider-site
```

### 清理日志

```bash
# 清空 PM2 日志
pm2 flush

# 或手动清理
rm -rf logs/*.log
```

---

## 📊 监控和日志

### 日志位置

- **PM2 日志：** `/root/.pm2/logs/`
- **应用日志：** `/www/wwwroot/spider-site/logs/`
- **Nginx 日志：** `/www/wwwlogs/`

### 日志查看

```bash
# 实时查看应用日志
pm2 logs spider-site --lines 100

# 查看错误日志
tail -f /www/wwwroot/spider-site/logs/error.log

# 查看 Nginx 访问日志
tail -f /www/wwwlogs/autopushnetwork.xyz.log
```

---

## ⚠️ 故障排除

### 问题1：无法启动

```bash
# 检查端口占用
netstat -tulpn | grep 3000

# 如果端口被占用，修改 ecosystem.config.js 中的端口
```

### 问题2：数据库连接失败

```bash
# 测试数据库连接
npx prisma db pull

# 检查环境变量
cat .env.local | grep DATABASE_URL
```

### 问题3：域名无法访问

1. 检查 DNS 是否生效：`nslookup autopushnetwork.xyz`
2. 检查 Nginx 配置：`nginx -t`
3. 检查防火墙：`ufw status` 或宝塔安全规则
4. 检查 PM2 状态：`pm2 status`

### 问题4：502 Bad Gateway

```bash
# 确认应用正在运行
pm2 status

# 检查应用日志
pm2 logs spider-site

# 重启应用
pm2 restart spider-site
```

---

## 📈 性能建议

1. **服务器配置**
   - 最低：1核2G内存
   - 推荐：2核4G内存
   - 硬盘：20G SSD

2. **数据库连接池**
   - 使用 PgBouncer（已在 DATABASE_URL 中配置）
   - 限制并发连接数

3. **CDN 加速**
   - 静态资源使用 CDN
   - 图片使用 Supabase Storage

4. **监控工具**
   - PM2 Plus（免费版）
   - UptimeRobot（网站监控）
   - 宝塔面板监控

---

## 🔐 安全建议

1. **定期更新**
   ```bash
   npm audit fix
   npm update
   ```

2. **防火墙配置**
   - 只开放 80, 443, 22 端口
   - 禁用不必要的服务

3. **SSL 证书**
   - 使用 Let's Encrypt 免费证书
   - 设置自动续期

4. **备份**
   - 每日备份数据库
   - 每周备份代码

---

## 📞 支持

如有问题：
1. 查看日志：`pm2 logs spider-site`
2. 检查 Admin 后台：https://adminseohub.xyz
3. 查看数据库配置

---

**部署成功后，记得在数据库中更新域名配置！**
