#!/usr/bin/env bash
set -uo pipefail

# ═══════════════════════════════════════════════════════════
# health-check.sh — Verify site is responding correctly
# Usage: ./health-check.sh [--verbose]
# Exit code: 0 = all checks pass, 1 = one or more failures
# ═══════════════════════════════════════════════════════════

DOMAIN="app.educationministry.org"
URL="https://${DOMAIN}"
VERBOSE="${1:-}"
PASSED=0
FAILED=0

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

check() {
  local label="$1"
  local result="$2"  # 0 = pass
  if [ "$result" -eq 0 ]; then
    echo -e "  ${GREEN}✅ PASS${NC}  $label"
    ((PASSED++))
  else
    echo -e "  ${RED}❌ FAIL${NC}  $label"
    ((FAILED++))
  fi
}

echo "═══════════════════════════════════════════════"
echo "  Health Check: ${DOMAIN}"
echo "  Time: $(date -u +'%Y-%m-%d %H:%M:%S UTC')"
echo "═══════════════════════════════════════════════"
echo ""

# --- 1. DNS Resolution ---
echo "[DNS]"
DNS_RESULT=$(dig +short "${DOMAIN}" 2>/dev/null)
if [ -n "${DNS_RESULT}" ]; then
  check "DNS resolves (${DNS_RESULT})" 0
else
  check "DNS resolves" 1
fi

# --- 2. HTTPS Response ---
echo "[HTTPS]"
HTTP_CODE=$(curl -so /dev/null -w '%{http_code}' --max-time 10 "${URL}" 2>/dev/null || echo "000")
if [ "${HTTP_CODE}" = "200" ]; then
  check "HTTPS returns 200" 0
else
  check "HTTPS returns 200 (got ${HTTP_CODE})" 1
fi

# --- 3. HTTP→HTTPS Redirect ---
REDIR_CODE=$(curl -so /dev/null -w '%{http_code}' --max-time 10 "http://${DOMAIN}" 2>/dev/null || echo "000")
if [ "${REDIR_CODE}" = "301" ] || [ "${REDIR_CODE}" = "302" ]; then
  check "HTTP→HTTPS redirect (${REDIR_CODE})" 0
else
  check "HTTP→HTTPS redirect (got ${REDIR_CODE})" 1
fi

# --- 4. SSL Certificate ---
echo "[SSL]"
SSL_EXPIRY=$(echo | openssl s_client -connect "${DOMAIN}:443" -servername "${DOMAIN}" 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
if [ -n "${SSL_EXPIRY}" ]; then
  EXPIRY_EPOCH=$(date -d "${SSL_EXPIRY}" +%s 2>/dev/null || echo 0)
  NOW_EPOCH=$(date +%s)
  DAYS_LEFT=$(( (EXPIRY_EPOCH - NOW_EPOCH) / 86400 ))
  if [ "${DAYS_LEFT}" -gt 7 ]; then
    check "SSL valid (${DAYS_LEFT} days left, expires ${SSL_EXPIRY})" 0
  else
    check "SSL expiring soon! (${DAYS_LEFT} days left)" 1
  fi
else
  check "SSL certificate readable" 1
fi

# --- 5. Content Verification ---
echo "[Content]"
PAGE_CONTENT=$(curl -s --max-time 10 "${URL}" 2>/dev/null)

# Check for index.html content
if echo "${PAGE_CONTENT}" | grep -q 'id="root"'; then
  check "Root div present" 0
else
  check "Root div present" 1
fi

if echo "${PAGE_CONTENT}" | grep -q 'config.js'; then
  check "config.js referenced" 0
else
  check "config.js referenced" 1
fi

if echo "${PAGE_CONTENT}" | grep -q 'app.js'; then
  check "app.js referenced" 0
else
  check "app.js referenced" 1
fi

# --- 6. Asset Loading ---
echo "[Assets]"
for asset in "assets/js/config.js" "assets/js/app.js" "assets/css/main.css"; do
  ASSET_CODE=$(curl -so /dev/null -w '%{http_code}' --max-time 10 "${URL}/${asset}" 2>/dev/null || echo "000")
  if [ "${ASSET_CODE}" = "200" ]; then
    check "${asset} loads (200)" 0
  else
    check "${asset} loads (got ${ASSET_CODE})" 1
  fi
done

# --- 7. Response Time ---
echo "[Performance]"
RESPONSE_TIME=$(curl -so /dev/null -w '%{time_total}' --max-time 10 "${URL}" 2>/dev/null || echo "99")
RESP_MS=$(echo "${RESPONSE_TIME} * 1000" | bc 2>/dev/null | cut -d. -f1 || echo "9999")
if [ "${RESP_MS:-9999}" -lt 3000 ]; then
  check "Response time < 3s (${RESP_MS}ms)" 0
else
  check "Response time < 3s (${RESP_MS}ms)" 1
fi

# --- 8. Gzip ---
echo "[Compression]"
GZIP_HEADER=$(curl -sI -H 'Accept-Encoding: gzip' --max-time 10 "${URL}" 2>/dev/null | grep -i 'content-encoding' || true)
if echo "${GZIP_HEADER}" | grep -qi 'gzip'; then
  check "Gzip compression enabled" 0
else
  check "Gzip compression enabled" 1
fi

# --- 9. Security Headers ---
echo "[Security]"
HEADERS=$(curl -sI --max-time 10 "${URL}" 2>/dev/null)
for header in "X-Frame-Options" "X-Content-Type-Options" "Referrer-Policy"; do
  if echo "${HEADERS}" | grep -qi "${header}"; then
    check "${header} header present" 0
  else
    check "${header} header present" 1
  fi
done

# --- Summary ---
echo ""
echo "═══════════════════════════════════════════════"
TOTAL=$((PASSED + FAILED))
echo -e "  Results: ${GREEN}${PASSED} passed${NC} / ${RED}${FAILED} failed${NC} / ${TOTAL} total"
echo "═══════════════════════════════════════════════"

if [ "${FAILED}" -gt 0 ]; then
  echo -e "  ${RED}❌ HEALTH CHECK FAILED${NC}"
  exit 1
else
  echo -e "  ${GREEN}✅ ALL CHECKS PASSED${NC}"
  exit 0
fi
