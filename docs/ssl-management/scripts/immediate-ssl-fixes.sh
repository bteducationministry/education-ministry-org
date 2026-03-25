#!/bin/bash
# Immediate SSL Fixes for Education Ministry Infrastructure
# Run this script on the VPS: root@72.62.80.207

set -e  # Exit on error

echo "=== Education Ministry SSL Emergency Fixes ==="
echo "Date: $(date)"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root"
    exit 1
fi

echo "=== Step 1: Verify Nginx Status ==="
if systemctl is-active --quiet nginx; then
    print_status "Nginx is running"
else
    print_warning "Nginx is not running, starting..."
    systemctl start nginx
    systemctl enable nginx
    print_status "Nginx started and enabled"
fi

echo ""
echo "=== Step 2: Check Current Certificate Status ==="
certbot certificates

echo ""
echo "=== Step 3: Renew Expired btpma.org Certificate ==="
print_warning "Forcing renewal of btpma.org certificate..."
if certbot renew --cert-name btpma.org --force-renewal; then
    print_status "btpma.org certificate renewed successfully"
else
    print_error "Failed to renew btpma.org certificate"
    echo "Check logs: tail -50 /var/log/letsencrypt/letsencrypt.log"
    exit 1
fi

echo ""
echo "=== Step 4: Check platform.btpma.org (expires soon) ==="
PLATFORM_DAYS=$(openssl x509 -in /etc/letsencrypt/live/platform.btpma.org/fullchain.pem -noout -enddate | cut -d= -f2 | xargs -I {} date -d "{}" +%s)
CURRENT_DAYS=$(date +%s)
DAYS_LEFT=$(( ($PLATFORM_DAYS - $CURRENT_DAYS) / 86400 ))

if [ $DAYS_LEFT -lt 7 ]; then
    print_warning "platform.btpma.org expires in $DAYS_LEFT days, renewing..."
    certbot renew --cert-name platform.btpma.org --force-renewal
    print_status "platform.btpma.org certificate renewed"
else
    print_status "platform.btpma.org has $DAYS_LEFT days remaining (OK)"
fi

echo ""
echo "=== Step 5: Reload Nginx ==="
if systemctl reload nginx; then
    print_status "Nginx reloaded successfully"
else
    print_error "Failed to reload Nginx"
    nginx -t
    exit 1
fi

echo ""
echo "=== Step 6: Verify All Certificates ==="
certbot certificates

echo ""
echo "=== Step 7: Test SSL Connectivity ==="
for domain in educationministry.org btpma.org aemp-dashboard.btpma.org platform.btpma.org; do
    echo "Testing $domain..."
    if curl -I "https://$domain" > /dev/null 2>&1; then
        print_status "$domain - SSL working"
    else
        print_error "$domain - SSL not working"
    fi
done

echo ""
echo "=== Step 8: Setup Post-Renewal Hooks ==="
mkdir -p /etc/letsencrypt/renewal-hooks/post

cat > /etc/letsencrypt/renewal-hooks/post/reload-nginx.sh << 'HOOK'
#!/bin/bash
# Reload Nginx after certificate renewal
systemctl reload nginx
echo "$(date): Nginx reloaded after certificate renewal" >> /var/log/certbot-renewal.log
HOOK

chmod +x /etc/letsencrypt/renewal-hooks/post/reload-nginx.sh
print_status "Post-renewal hook created"

echo ""
echo "=== Step 9: Test Renewal Process ==="
print_warning "Running dry-run test of renewal process..."
if certbot renew --dry-run; then
    print_status "Renewal process test passed"
else
    print_error "Renewal process test failed"
    echo "Check logs: tail -50 /var/log/letsencrypt/letsencrypt.log"
fi

echo ""
echo "=== Step 10: Verify Certbot Timer ==="
if systemctl is-active --quiet certbot.timer; then
    print_status "Certbot timer is active"
    systemctl status certbot.timer --no-pager | grep -E "Active|Trigger"
else
    print_warning "Certbot timer is not active, enabling..."
    systemctl enable certbot.timer
    systemctl start certbot.timer
    print_status "Certbot timer enabled and started"
fi

echo ""
echo "=== SUMMARY ==="
print_status "All immediate fixes completed!"
echo ""
echo "Next steps:"
echo "1. Monitor certificate expiry: certbot certificates"
echo "2. Check logs regularly: tail -f /var/log/letsencrypt/letsencrypt.log"
echo "3. Set up external monitoring (UptimeRobot, etc.)"
echo ""
echo "Certificate status:"
certbot certificates | grep -E "Certificate Name|Expiry Date"

echo ""
print_status "Done! $(date)"
