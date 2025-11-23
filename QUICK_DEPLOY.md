# 🚀 快速部署指南

## 📋 VPS 域名分配

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

---

## 🔧 部署步骤（在每台VPS上执行）

### 1️⃣ 上传代码

**使用Git（推荐）：**
```bash
cd /www/wwwroot
git clone <your-repo-url> spider-site
cd spider-site
```

**或使用宝塔面板文件管理器上传ZIP包**

---

### 2️⃣ 配置环境变量

根据VPS编号选择对应的配置文件：

**VPS-1：**
```bash
cp .env.vps1.example .env.local
```

**VPS-2：**
```bash
cp .env.vps2.example .env.local
```

**VPS-3：**
```bash
cp .env.vps3.example .env.local
```

---

### 3️⃣ 运行部署脚本

```bash
chmod +x deploy.sh
./deploy.sh
```

脚本会自动完成：
- ✅ 安装依赖
- ✅ 生成 Prisma Client
- ✅ 构建项目
- ✅ 启动 PM2 进程
- ✅ 配置开机自启

---

### 4️⃣ 宝塔面板配置

#### A. 添加网站

对于 VPS-1，添加3个网站：
1. `autopushnetwork.xyz`
2. `contentpoolzone.site`
3. `crawlboostnet.xyz`

配置：
- 根目录：`/www/wwwroot/spider-site`
- PHP版本：纯静态

#### B. 配置 Nginx 反向代理

对每个网站，进入 **设置 → 反向代理 → 添加反向代理**

**目标URL：** `http://127.0.0.1:3000`

**配置内容：**
```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_cache_bypass $http_upgrade;
}
```

#### C. 配置 SSL 证书

1. 网站设置 → SSL → Let's Encrypt
2. 勾选域名
3. 点击申请
4. 开启"强制HTTPS"

---

### 5️⃣ 验证部署

```bash
# 检查PM2状态
pm2 status

# 查看日志
pm2 logs spider-site --lines 50

# 测试域名（以VPS-1为例）
curl -I https://autopushnetwork.xyz
```

---

## 🔍 常用命令

```bash
# 查看应用状态
pm2 status

# 查看实时日志
pm2 logs spider-site

# 重启应用
pm2 restart spider-site

# 停止应用
pm2 stop spider-site

# 查看监控
pm2 monit
```

---

## 🔄 更新代码

```bash
cd /www/wwwroot/spider-site
git pull origin main
npm install
npm run build
pm2 restart spider-site
```

---

## ⚠️ 故障排除

### 问题：PM2 无法启动
```bash
# 检查端口是否被占用
netstat -tulpn | grep 3000

# 查看详细日志
pm2 logs spider-site --err
```

### 问题：502 Bad Gateway
```bash
# 确认应用正在运行
pm2 status

# 重启应用
pm2 restart spider-site

# 检查 Nginx 配置
nginx -t
```

### 问题：域名无法访问
1. 检查 DNS 解析：`nslookup yourdomain.xyz`
2. 检查防火墙：确保80和443端口开放
3. 检查 Nginx 配置：宝塔面板 → 网站 → 配置文件
4. 查看 Nginx 错误日志：`/www/wwwlogs/yourdomain.xyz.error.log`

---

## 📊 性能优化建议

### Nginx 静态资源缓存

在网站配置文件中添加：
```nginx
# 静态资源缓存
location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 启用 Gzip 压缩

在 Nginx 配置中添加：
```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

---

## ✅ 部署检查清单

- [ ] 代码已上传到 `/www/wwwroot/spider-site`
- [ ] 已复制正确的 `.env.local` 文件
- [ ] 运行了 `deploy.sh` 脚本
- [ ] PM2 显示应用正在运行
- [ ] 在宝塔面板添加了所有域名
- [ ] 配置了 Nginx 反向代理
- [ ] 申请了 SSL 证书
- [ ] 开启了强制 HTTPS
- [ ] 测试访问所有域名返回200状态
- [ ] 确认文章内容正常显示
- [ ] 确认内链跳转到下载页和主站

---

**部署完成后，每个域名都会根据数据库配置自动显示对应的内容和标签！** 🎉
