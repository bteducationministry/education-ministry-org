#!/bin/bash
# Quick SSL Status Check
# Can be run from anywhere with SSH access

SERVER="root@72.62.80.207"
PASSWORD="@Trustee23//"

echo "=== SSL Certificate Status Check ==="
echo "Date: $(date)"
echo ""

sshpass -p "$PASSWORD" ssh -o StrictHostKeyChecking=no "$SERVER" << 'REMOTE'
echo "=== Certificate Expiry Status ==="
for cert_dir in /etc/letsencrypt/live/*/; do
    domain=$(basename "$cert_dir")
    cert_file="${cert_dir}fullchain.pem"
    
    if [ -f "$cert_file" ]; then
        expiry_date=$(openssl x509 -in "$cert_file" -noout -enddate | cut -d= -f2)
        expiry_epoch=$(date -d "$expiry_date" +%s)
        current_epoch=$(date +%s)
        days_until_expiry=$(( ($expiry_epoch - $current_epoch) / 86400 ))
        
        if [ $days_until_expiry -lt 0 ]; then
            status="❌ EXPIRED"
        elif [ $days_until_expiry -lt 7 ]; then
            status="🚨 CRITICAL"
        elif [ $days_until_expiry -lt 14 ]; then
            status="⚠️  WARNING"
        else
            status="✅ OK"
        fi
        
        printf "%-30s %s (%d days)\n" "$domain" "$status" "$days_until_expiry"
    fi
done

echo ""
echo "=== Certbot Timer Status ==="
systemctl status certbot.timer --no-pager | grep -E "Active|Trigger"

echo ""
echo "=== Recent Certbot Activity ==="
tail -20 /var/log/letsencrypt/letsencrypt.log | grep -E "Renewing|Successfully"
REMOTE

echo ""
echo "=== Online SSL Test ==="
echo "For detailed SSL analysis, visit:"
echo "  - https://www.ssllabs.com/ssltest/analyze.html?d=educationministry.org"
echo "  - https://www.ssllabs.com/ssltest/analyze.html?d=btpma.org"
echo "  - https://www.ssllabs.com/ssltest/analyze.html?d=aemp-dashboard.btpma.org"
echo "  - https://www.ssllabs.com/ssltest/analyze.html?d=platform.btpma.org"
