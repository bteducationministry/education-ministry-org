#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════════
# rollback.sh — Revert to previous deployment
# ═══════════════════════════════════════════════════════════

APP_NAME="education-ministry-org"
DEPLOY_DIR="/var/www/${APP_NAME}"
BACKUP_DIR="/var/www/backups/${APP_NAME}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()  { echo -e "${GREEN}[ROLLBACK]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
err()  { echo -e "${RED}[ERROR]${NC} $1" >&2; }

if [ "$(id -u)" -ne 0 ]; then
  err "This script must be run as root (or with sudo)"
  exit 1
fi

# --- List available backups ---
if [ ! -d "${BACKUP_DIR}" ]; then
  err "No backup directory found at ${BACKUP_DIR}"
  exit 1
fi

BACKUPS=($(ls -dt "${BACKUP_DIR}"/*/ 2>/dev/null))

if [ ${#BACKUPS[@]} -eq 0 ]; then
  err "No backups available for rollback."
  exit 1
fi

# --- Select backup ---
if [ -n "${1:-}" ]; then
  # Specific backup requested
  TARGET="${BACKUP_DIR}/${1}"
  if [ ! -d "${TARGET}" ]; then
    err "Backup '${1}' not found."
    echo "Available backups:"
    for b in "${BACKUPS[@]}"; do
      echo "  $(basename "$b")"
    done
    exit 1
  fi
else
  # Use most recent backup
  TARGET="${BACKUPS[0]}"
  log "No backup specified. Using most recent: $(basename "${TARGET}")"
fi

log "Rolling back to: $(basename "${TARGET}")"

# --- Backup current (failed) deployment ---
FAILED_TIMESTAMP="failed_$(date +%Y%m%d_%H%M%S)"
if [ -d "${DEPLOY_DIR}" ]; then
  log "Saving current (failed) state as ${FAILED_TIMESTAMP}"
  cp -a "${DEPLOY_DIR}" "${BACKUP_DIR}/${FAILED_TIMESTAMP}"
fi

# --- Restore from backup ---
log "Restoring files..."
rsync -a --delete "${TARGET}/" "${DEPLOY_DIR}/"

# --- Set permissions ---
chown -R www-data:www-data "${DEPLOY_DIR}"
find "${DEPLOY_DIR}" -type d -exec chmod 755 {} \;
find "${DEPLOY_DIR}" -type f -exec chmod 644 {} \;

# --- Reload Nginx ---
log "Reloading Nginx..."
if nginx -t 2>&1; then
  systemctl reload nginx
  log "Nginx reloaded successfully."
else
  err "Nginx config test failed! Manual intervention needed."
  exit 1
fi

# --- Verify ---
if [ -f "${DEPLOY_DIR}/index.html" ]; then
  log "✅ Rollback complete!"
  log "   Restored from: $(basename "${TARGET}")"
  log "   Failed state saved as: ${FAILED_TIMESTAMP}"
else
  err "❌ Rollback verification failed — index.html not found"
  exit 1
fi

# --- Show available backups ---
log "\nAvailable backups:"
for b in $(ls -dt "${BACKUP_DIR}"/*/ 2>/dev/null); do
  echo "  $(basename "$b")"
done
