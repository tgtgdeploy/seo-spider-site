#!/bin/bash

##############################################
# 蜘蛛池网站部署脚本 - 宝塔面板适配
# 用于在VPS上部署蜘蛛池网站
##############################################

set -e

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}  ${YELLOW}🕷️  蜘蛛池网站部署脚本${NC}                                     ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}\n"

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ 未安装 Node.js${NC}"
    echo "请先通过宝塔面板安装 Node.js (推荐 18.x)"
    exit 1
fi

echo -e "${GREEN}✓ Node.js 版本: $(node -v)${NC}"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ 未安装 npm${NC}"
    exit 1
fi

echo -e "${GREEN}✓ npm 版本: $(npm -v)${NC}\n"

# 步骤1: 安装依赖
echo -e "${YELLOW}📦 安装依赖...${NC}"
npm install --production=false

# 步骤2: 生成 Prisma Client
echo -e "\n${YELLOW}🔧 生成 Prisma Client...${NC}"
npx prisma generate

# 步骤3: 构建项目
echo -e "\n${YELLOW}🏗️  构建项目...${NC}"
npm run build

# 步骤4: 创建日志目录
echo -e "\n${YELLOW}📁 创建日志目录...${NC}"
mkdir -p logs

# 步骤5: PM2 部署
if ! command -v pm2 &> /dev/null; then
    echo -e "\n${YELLOW}📦 安装 PM2...${NC}"
    npm install -g pm2
fi

echo -e "\n${YELLOW}🚀 启动应用...${NC}"

# 停止旧进程
pm2 stop spider-site 2>/dev/null || true
pm2 delete spider-site 2>/dev/null || true

# 启动新进程
pm2 start ecosystem.config.js --env production

# 保存 PM2 配置
pm2 save

# 设置开机自启
pm2 startup | tail -1 | bash || true

echo -e "\n${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}  ${GREEN}🎉 部署完成！${NC}                                              ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}\n"

echo -e "${GREEN}✅ 应用已启动！${NC}"
echo -e "   PM2 进程名: spider-site"
echo -e "   端口: 3000"
echo -e ""
echo -e "${YELLOW}💡 常用命令:${NC}"
echo -e "   查看状态: ${BLUE}pm2 status${NC}"
echo -e "   查看日志: ${BLUE}pm2 logs spider-site${NC}"
echo -e "   重启应用: ${BLUE}pm2 restart spider-site${NC}"
echo -e "   停止应用: ${BLUE}pm2 stop spider-site${NC}"
echo -e ""
echo -e "${YELLOW}📋 下一步:${NC}"
echo -e "   1. 在宝塔面板配置 Nginx 反向代理"
echo -e "   2. 绑定域名"
echo -e "   3. 配置 SSL 证书"
echo -e ""
