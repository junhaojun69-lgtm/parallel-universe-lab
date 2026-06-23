#!/bin/bash
set -e

# ============================================
# 人生平行宇宙实验室 - 一键部署脚本
# 目标: Ubuntu/Debian 香港 VPS
# 用法: sudo bash deploy.sh
# ============================================

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}  人生平行宇宙实验室 - 部署脚本${NC}"
echo -e "${CYAN}========================================${NC}"

# ---- 配置项（按需修改） ----
DOMAIN="your-domain.com"
APP_DIR="/opt/universe-lab"
NODE_VERSION="20"
DEEPSEEK_API_KEY=""
DB_PASSWORD=""

# ---- 1. 安装系统依赖 ----
echo -e "${YELLOW}[1/8] 安装系统依赖...${NC}"
apt-get update -y
apt-get install -y curl wget git build-essential nginx certbot python3-certbot-nginx

# ---- 2. 安装 Node.js ----
echo -e "${YELLOW}[2/8] 安装 Node.js ${NODE_VERSION}...${NC}"
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
    apt-get install -y nodejs
fi
echo -e "${GREEN}Node: $(node -v)${NC}"
echo -e "${GREEN}npm:  $(npm -v)${NC}"

# ---- 3. 安装 PM2 ----
echo -e "${YELLOW}[3/8] 安装 PM2...${NC}"
npm install -g pm2
echo -e "${GREEN}PM2: $(pm2 -v)${NC}"

# ---- 4. 部署代码 ----
echo -e "${YELLOW}[4/8] 部署代码到 ${APP_DIR}...${NC}"
mkdir -p ${APP_DIR}

# 方式A: 从本地上传（推荐）
# 你需要在本地执行: scp -r ./* root@你的IP:${APP_DIR}/
# 方式B: 从 Git 克隆（如果已推送到 GitHub）
# git clone https://github.com/your-username/parallel-universe-lab.git ${APP_DIR}

if [ ! -f "${APP_DIR}/backend/package.json" ]; then
    echo -e "${RED}请先将代码上传到 ${APP_DIR}${NC}"
    echo -e "${YELLOW}本地执行: scp -r ./* root@服务器IP:${APP_DIR}/${NC}"
    echo -e "${YELLOW}然后重新运行此脚本${NC}"
    exit 1
fi

# ---- 5. 安装依赖 + 构建前端 ----
echo -e "${YELLOW}[5/8] 安装依赖并构建前端...${NC}"
cd ${APP_DIR}/backend
npm install --production

cd ${APP_DIR}/frontend
npm install
npm run build

# ---- 6. 配置环境变量 ----
echo -e "${YELLOW}[6/8] 配置环境变量...${NC}"
cat > ${APP_DIR}/backend/.env << EOF
PORT=3000
DEEPSEEK_API_KEY=${DEEPSEEK_API_KEY}
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
DEEPSEEK_MODEL=deepseek-chat
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=${DB_PASSWORD}
DB_NAME=parallel_universe_lab
EOF

# ---- 7. 启动 PM2 ----
echo -e "${YELLOW}[7/8] 启动 PM2 守护进程...${NC}"
mkdir -p /var/log/universe-lab

cd ${APP_DIR}/backend
pm2 delete universe-lab 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -y --service-name universe-lab

echo -e "${GREEN}PM2 状态:${NC}"
pm2 status

# ---- 8. 配置 Nginx + SSL ----
echo -e "${YELLOW}[8/8] 配置 Nginx 和 SSL...${NC}"

# 复制 Nginx 配置
cp ${APP_DIR}/deploy/nginx-universe-lab.conf /etc/nginx/sites-available/universe-lab
ln -sf /etc/nginx/sites-available/universe-lab /etc/nginx/sites-enabled/universe-lab
rm -f /etc/nginx/sites-enabled/default

# 替换域名
sed -i "s/your-domain.com/${DOMAIN}/g" /etc/nginx/sites-available/universe-lab

# 先用 HTTP 启动 Nginx（SSL 证书需要域名解析生效后才能申请）
nginx -t
systemctl restart nginx
systemctl enable nginx

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  部署完成!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${CYAN}下一步:${NC}"
echo -e "  1. 将域名 ${DOMAIN} 的 A 记录解析到服务器 IP"
echo -e "  2. 等待 DNS 生效后执行 SSL 申请:"
echo -e "     ${YELLOW}sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos -m your@email.com${NC}"
echo -e "  3. 设置 SSL 自动续期（certbot 自动配置）:"
echo -e "     ${YELLOW}sudo certbot renew --dry-run${NC}"
echo ""
echo -e "${CYAN}访问地址:${NC}"
echo -e "  http://${DOMAIN}"
echo -e "  https://${DOMAIN} (SSL 配置后)"
echo ""
echo -e "${CYAN}PM2 管理:${NC}"
echo -e "  pm2 status          # 查看状态"
echo -e "  pm2 logs universe-lab  # 查看日志"
echo -e "  pm2 restart universe-lab  # 重启"
echo -e "  pm2 stop universe-lab  # 停止"
echo ""
