#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════
# setup-ssl.sh — Obtain Let's Encrypt SSL certificate
# Run AFTER DNS is configured and HTTP server is working
# ═══════════════════════════════════════════════════════════

DOMAIN="app.educationministry.org"
EMAIL="info@educationministry.org"
NGINX_CONF_DIR="/etc/nginx/sites-available"
NGINX_ENABLED_DIR="/etc/nginx/sites-enabled"
CERTBOT_WEBROOT="/var/www/certbot"

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[SSL]${NC} $1"; }
err() { echo -e "${RED}[ERROR]${NC} $1" >&2; }

if [ "$(id -u)" -ne 0 ]; then
  err "Run as root: sudo ./setup-ssl.sh"
  exit 1
fi

# --- Install certbot if needed ---
if ! command -v certbot &> /dev/null; then
  log "Installing certbot..."
  apt-get update -qq
  apt-get install -y -qq certbot python3-certbot-nginx
fi

# --- Create webroot ---
mkdir -p "${CERTBOT_WEBROOT}"

# --- Obtain certificate ---
log "Requesting SSL certificate for ${DOMAIN}..."
certbot certonly \
  --nginx \
  -d "${DOMAIN}" \
  --email "${EMAIL}" \
  --agree-tos \
  --no-eff-email \
  --non-interactive

# --- Switch to HTTPS config ---
log "Switching to HTTPS Nginx config..."
cp /home/ubuntu/deployment-package/nginx/app.educationministry.org.conf "${NGINX_CONF_DIR}/education-ministry-org"

# --- Test and reload ---
if nginx -t 2>&1; then
  systemctl reload nginx
  log "✅ SSL setup complete!"
  log "   Certificate: /etc/letsencrypt/live/${DOMAIN}/"
  log "   Auto-renewal: certbot handles this via systemd timer"
else
  err "Nginx config test failed after SSL setup."
  exit 1
fi

# --- Verify auto-renewal timer ---
if systemctl is-active --quiet certbot.timer; then
  log "✅ Certbot auto-renewal timer is active"
else
  log "Setting up certbot renewal cron..."
  echo "0 3 * * * root certbot renew --quiet --post-hook 'systemctl reload nginx'" > /etc/cron.d/certbot-renew
  log "✅ Cron job created for daily renewal check"
fi
