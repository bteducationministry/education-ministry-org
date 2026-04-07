#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════
# initial-server-setup.sh — First-time VPS setup
# Run this ONCE on a fresh Hostinger VPS
# ═══════════════════════════════════════════════════════════

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[SETUP]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

if [ "$(id -u)" -ne 0 ]; then
  echo "Run as root: sudo ./initial-server-setup.sh"
  exit 1
fi

# --- System Updates ---
log "Updating system packages..."
apt-get update -qq
apt-get upgrade -y -qq

# --- Install Nginx ---
log "Installing Nginx..."
apt-get install -y -qq nginx
systemctl enable nginx
systemctl start nginx

# --- Install Certbot ---
log "Installing Certbot..."
apt-get install -y -qq certbot python3-certbot-nginx

# --- Install Git ---
log "Installing Git..."
apt-get install -y -qq git

# --- Install useful tools ---
log "Installing utility packages..."
apt-get install -y -qq curl rsync bc

# --- Create directory structure ---
log "Creating directory structure..."
mkdir -p /var/www/education-ministry-org
mkdir -p /var/www/backups/education-ministry-org
mkdir -p /var/www/certbot

# --- Set ownership ---
chown -R www-data:www-data /var/www/education-ministry-org

# --- Configure Nginx ---
log "Setting up Nginx site configuration..."

# Remove default site if present
rm -f /etc/nginx/sites-enabled/default

# Copy initial HTTP-only config (for certbot to work)
cp /home/ubuntu/deployment-package/nginx/nginx-initial-http-only.conf /etc/nginx/sites-available/education-ministry-org
ln -sf /etc/nginx/sites-available/education-ministry-org /etc/nginx/sites-enabled/

# Test and reload
nginx -t && systemctl reload nginx

# --- Configure Firewall ---
log "Configuring firewall..."
if command -v ufw &> /dev/null; then
  ufw allow 'Nginx Full'
  ufw allow OpenSSH
  ufw --force enable
  log "UFW enabled with Nginx Full and SSH"
else
  warn "UFW not installed. Ensure ports 80, 443, 22 are open."
fi

# --- Summary ---
log "═══════════════════════════════════════════════"
log "✅ Initial server setup complete!"
log ""
log "Next steps:"
log "  1. Configure DNS: CNAME  app → 72.62.80.207 (or A record)"
log "  2. Deploy code:   sudo ./deploy.sh"
log "  3. Setup SSL:     sudo ./setup-ssl.sh"
log "  4. Run health:    ./health-check.sh"
log "═══════════════════════════════════════════════"
