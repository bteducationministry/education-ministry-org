#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════
# deploy.sh — Education Ministry React SPA Deployment
# Target: app.educationministry.org on Hostinger VPS
# ═══════════════════════════════════════════════════════════

# --- Configuration ---
APP_NAME="education-ministry-org"
REPO_URL="https://github.com/bteducationministry/education-ministry-org.git"
DEPLOY_DIR="/var/www/${APP_NAME}"
BACKUP_DIR="/var/www/backups/${APP_NAME}"
NGINX_CONF="/etc/nginx/sites-available/${APP_NAME}"
BRANCH="${1:-main}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# --- Colors ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[DEPLOY]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
err()  { echo -e "${RED}[ERROR]${NC} $1" >&2; }

# --- Pre-flight checks ---
log "Starting deployment of ${APP_NAME} (branch: ${BRANCH})"
log "Timestamp: ${TIMESTAMP}"

if [ "$(id -u)" -ne 0 ]; then
  err "This script must be run as root (or with sudo)"
  exit 1
fi

if ! command -v nginx &> /dev/null; then
  err "Nginx is not installed. Install with: apt install nginx"
  exit 1
fi

if ! command -v git &> /dev/null; then
  err "Git is not installed. Install with: apt install git"
  exit 1
fi

# --- Create backup of current deployment ---
if [ -d "${DEPLOY_DIR}" ]; then
  log "Backing up current deployment to ${BACKUP_DIR}/${TIMESTAMP}"
  mkdir -p "${BACKUP_DIR}"
  cp -a "${DEPLOY_DIR}" "${BACKUP_DIR}/${TIMESTAMP}"
  # Keep only last 5 backups
  ls -dt "${BACKUP_DIR}"/*/ 2>/dev/null | tail -n +6 | xargs -r rm -rf
  log "Backup complete. Keeping last 5 backups."
else
  log "No existing deployment found. Fresh install."
fi

# --- Pull latest code ---
TMP_DIR=$(mktemp -d)
log "Cloning branch '${BRANCH}' into temp directory..."
git clone --depth 1 --branch "${BRANCH}" "${REPO_URL}" "${TMP_DIR}"

# --- Deploy files ---
log "Deploying to ${DEPLOY_DIR}..."
mkdir -p "${DEPLOY_DIR}"

# Sync only the web-servable files (not .git, docs, etc.)
rsync -a --delete \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='docs/' \
  --exclude='*.md' \
  --exclude='*.pdf' \
  --exclude='CNAME' \
  --exclude='.abacus.donotdelete' \
  "${TMP_DIR}/" "${DEPLOY_DIR}/"

# --- Set permissions ---
log "Setting file permissions..."
chown -R www-data:www-data "${DEPLOY_DIR}"
find "${DEPLOY_DIR}" -type d -exec chmod 755 {} \;
find "${DEPLOY_DIR}" -type f -exec chmod 644 {} \;

# --- Verify Nginx config ---
log "Testing Nginx configuration..."
if nginx -t 2>&1; then
  log "Nginx config OK. Reloading..."
  systemctl reload nginx
else
  err "Nginx config test failed! Not reloading."
  err "Fix the config and run: systemctl reload nginx"
  exit 1
fi

# --- Cleanup ---
rm -rf "${TMP_DIR}"

# --- Verify deployment ---
log "Verifying deployment..."
if [ -f "${DEPLOY_DIR}/index.html" ]; then
  log "✅ index.html found"
else
  err "❌ index.html NOT found in ${DEPLOY_DIR}"
  exit 1
fi

if [ -f "${DEPLOY_DIR}/assets/js/app.js" ]; then
  log "✅ app.js found"
else
  err "❌ app.js NOT found"
  exit 1
fi

if [ -f "${DEPLOY_DIR}/assets/js/config.js" ]; then
  log "✅ config.js found"
else
  err "❌ config.js NOT found"
  exit 1
fi

log "═══════════════════════════════════════════════"
log "✅ Deployment complete!"
log "   Site: https://app.educationministry.org"
log "   Deploy dir: ${DEPLOY_DIR}"
log "   Backup: ${BACKUP_DIR}/${TIMESTAMP}"
log "═══════════════════════════════════════════════"
