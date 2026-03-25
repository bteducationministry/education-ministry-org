#!/bin/bash
# Setup SSL Certificate Monitoring
# Run this script on the VPS: root@72.62.80.207

set -e

echo "=== Setting up SSL Certificate Monitoring ==="

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root"
    exit 1
fi

# Create monitoring script
cat > /usr/local/bin/check-ssl-expiry.sh << 'MONITOR'
#!/bin/bash
# SSL Certificate Expiry Monitor

ALERT_DAYS=14
LOG_FILE="/var/log/ssl-expiry-check.log"
EMAIL="admin@educationministry.org"  # Update with your email

echo "=== SSL Certificate Expiry Check - $(date) ===" >> "$LOG_FILE"

for cert_dir in /etc/letsencrypt/live/*/; do
    domain=$(basename "$cert_dir")
    cert_file="${cert_dir}fullchain.pem"
    
    if [ -f "$cert_file" ]; then
        expiry_date=$(openssl x509 -in "$cert_file" -noout -enddate | cut -d= -f2)
        expiry_epoch=$(date -d "$expiry_date" +%s)
        current_epoch=$(date +%s)
        days_until_expiry=$(( ($expiry_epoch - $current_epoch) / 86400 ))
        
        echo "$domain: $days_until_expiry days until expiry" >> "$LOG_FILE"
        
        if [ $days_until_expiry -lt 0 ]; then
            echo "🚨 CRITICAL: $domain EXPIRED $((days_until_expiry * -1)) days ago!" >> "$LOG_FILE"
            # Uncomment to send email alerts:
            # echo "Certificate for $domain has EXPIRED!" | mail -s "URGENT: SSL Certificate Expired" "$EMAIL"
        elif [ $days_until_expiry -lt $ALERT_DAYS ]; then
            echo "⚠️  WARNING: $domain expires in $days_until_expiry days!" >> "$LOG_FILE"
            # Uncomment to send email alerts:
            # echo "Certificate for $domain expires in $days_until_expiry days" | mail -s "WARNING: SSL Certificate Expiring Soon" "$EMAIL"
        else
            echo "✅ OK: $domain expires in $days_until_expiry days" >> "$LOG_FILE"
        fi
    fi
done

echo "" >> "$LOG_FILE"
MONITOR

chmod +x /usr/local/bin/check-ssl-expiry.sh

echo "✅ Monitoring script created: /usr/local/bin/check-ssl-expiry.sh"

# Add to crontab
(crontab -l 2>/dev/null | grep -v check-ssl-expiry; echo "0 9 * * * /usr/local/bin/check-ssl-expiry.sh") | crontab -

echo "✅ Cron job added (runs daily at 9 AM)"

# Test the script
echo "Testing monitoring script..."
/usr/local/bin/check-ssl-expiry.sh

echo ""
echo "✅ Monitoring setup complete!"
echo ""
echo "Log file: /var/log/ssl-expiry-check.log"
echo "View log: cat /var/log/ssl-expiry-check.log"
echo ""
echo "To receive email alerts:"
echo "1. Install mail utility: apt install mailutils"
echo "2. Configure SMTP settings"
echo "3. Uncomment email lines in /usr/local/bin/check-ssl-expiry.sh"
