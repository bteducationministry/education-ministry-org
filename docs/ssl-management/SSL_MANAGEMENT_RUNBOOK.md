# SSL Certificate Management Runbook
**Education Ministry Organization Infrastructure**

## Quick Reference

| Domain | Status | Expires | Action Needed |
|--------|--------|---------|---------------|
| educationministry.org | ✅ Valid | Jun 20, 2026 | None |
| btpma.org | ❌ Expired | Mar 16, 2026 | **URGENT: Renew now** |
| aemp-dashboard.btpma.org | ✅ Valid | Jun 14, 2026 | None |
| platform.btpma.org | ⚠️ Expiring | Mar 28, 2026 | Monitor (3 days) |

---

## Executive Summary

**Current Setup**: Individual Let's Encrypt SSL certificates per domain
**Auto-Renewal**: Configured via certbot systemd timer (runs twice daily)
**Web Server**: Nginx 1.29.4
**Server**: root@72.62.80.207 (srv1203977)

**Immediate Actions Required**:
1. ❌ Renew expired btpma.org certificate
2. ⚠️ Verify Nginx reload hooks are working
3. 📊 Implement certificate expiry monitoring

---

## Table of Contents

1. [Current SSL Architecture](#current-ssl-architecture)
2. [Immediate Actions Required](#immediate-actions-required)
3. [SSL Management Strategy](#ssl-management-strategy)
4. [Auto-Renewal Configuration](#auto-renewal-configuration)
5. [Monitoring & Alerts](#monitoring--alerts)
6. [Security Best Practices](#security-best-practices)
7. [Operational Procedures](#operational-procedures)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Emergency Procedures](#emergency-procedures)

---

## Current SSL Architecture

### Certificate Inventory

#### 1. educationministry.org
- **Certificate**: Let's Encrypt E7
- **Issued**: March 22, 2026
- **Expires**: June 20, 2026 (87 days remaining)
- **Covers**: educationministry.org, www.educationministry.org
- **Status**: ✅ Healthy
- **Config**: `/etc/letsencrypt/renewal/educationministry.org.conf`

#### 2. btpma.org
- **Certificate**: Let's Encrypt R13
- **Issued**: December 16, 2025
- **Expires**: March 16, 2026 (**EXPIRED 9 days ago**)
- **Covers**: btpma.org, www.btpma.org
- **Status**: ❌ **CRITICAL - Expired**
- **Config**: `/etc/letsencrypt/renewal/btpma.org.conf`
- **Issue**: Certificate expired, causing SSL errors for visitors

#### 3. aemp-dashboard.btpma.org
- **Certificate**: Let's Encrypt E8
- **Issued**: March 16, 2026
- **Expires**: June 14, 2026 (81 days remaining)
- **Covers**: aemp-dashboard.btpma.org
- **Status**: ✅ Healthy
- **Config**: `/etc/letsencrypt/renewal/aemp-dashboard.btpma.org.conf`

#### 4. platform.btpma.org
- **Certificate**: Let's Encrypt R12
- **Issued**: December 28, 2025
- **Expires**: March 28, 2026 (**3 days remaining**)
- **Covers**: btpma.org, platform.btpma.org
- **Status**: ⚠️ **Expiring Soon**
- **Config**: `/etc/letsencrypt/renewal/platform.btpma.org.conf`
- **Note**: Should auto-renew within next 24-48 hours

### Infrastructure Details

**Web Server**: Nginx 1.29.4
- Config Directory: `/etc/nginx/sites-available/`
- Enabled Sites: `/etc/nginx/sites-enabled/`
- Active Sites: 5 (educationministry.org, btpma, aemp-dashboard, platform, aemp)

**Certbot Configuration**:
- Version: 5.4.0
- Method: systemd timer
- Schedule: Twice daily
- Next Run: Automatic
- Logs: `/var/log/letsencrypt/letsencrypt.log`

**DNS Configuration**:
- educationministry.org → 72.62.80.207 ✅
- btpma.org → 72.62.80.207 ✅

---

## Immediate Actions Required

### 🚨 CRITICAL: Renew btpma.org Certificate

```bash
# SSH into server
ssh root@72.62.80.207

# Force renewal of expired certificate
certbot renew --cert-name btpma.org --force-renewal

# Reload Nginx to apply new certificate
systemctl reload nginx

# Verify renewal
certbot certificates | grep -A 10 "btpma.org"

# Test SSL
curl -I https://btpma.org
```

**Expected Output**: Certificate should show new expiry date ~90 days in future

### ⚠️ MONITOR: platform.btpma.org

This certificate expires in 3 days. It should auto-renew, but monitor closely:

```bash
# Check if renewal happens automatically
certbot certificates | grep -A 10 "platform.btpma.org"

# If not renewed within 24 hours, force renewal
certbot renew --cert-name platform.btpma.org --force-renewal
systemctl reload nginx
```

### 🔧 IMPLEMENT: Post-Renewal Hooks

Ensure Nginx reloads automatically after certificate renewal:

```bash
# Create hook directory
mkdir -p /etc/letsencrypt/renewal-hooks/post

# Create reload script
cat > /etc/letsencrypt/renewal-hooks/post/reload-nginx.sh << 'HOOK'
#!/bin/bash
# Reload Nginx after certificate renewal
systemctl reload nginx
echo "$(date): Nginx reloaded after certificate renewal" >> /var/log/certbot-renewal.log
HOOK

# Make executable
chmod +x /etc/letsencrypt/renewal-hooks/post/reload-nginx.sh

# Test
/etc/letsencrypt/renewal-hooks/post/reload-nginx.sh
```

---

## SSL Management Strategy

### ✅ Recommended Approach: Individual Certificates

**Current setup is OPTIMAL**. Continue using individual certificates per domain.

#### Why Individual Certificates?

**Advantages**:
- ✅ Free with Let's Encrypt (no cost difference vs wildcard)
- ✅ Independent management per domain
- ✅ Isolated security (one compromise doesn't affect others)
- ✅ Simpler troubleshooting
- ✅ Works with HTTP-01 validation (no DNS API needed)
- ✅ Flexible renewal schedules

**Alternatives Considered & Rejected**:

❌ **Wildcard Certificates** (`*.btpma.org`, `*.educationministry.org`)
- Requires DNS-01 validation (complex DNS API setup)
- Doesn't cover root domains (need separate certs anyway)
- All subdomains share same certificate (less granular control)
- More complex troubleshooting

❌ **Multi-domain (SAN) Certificate**
- All domains renew together (all-or-nothing)
- One domain issue affects all domains
- Less flexible
- Harder to manage

### Certificate Lifecycle

```
Day 0:    Certificate issued (90-day validity)
Day 60:   Certbot begins attempting renewal
Day 89:   Last day before expiry
Day 90:   Certificate expires (site shows SSL error)
```

**Best Practice**: Certbot attempts renewal at day 60, giving 30 days buffer for troubleshooting.

---

## Auto-Renewal Configuration

### Systemd Timer (Current Setup)

**Status**: ✅ Active and Enabled

```bash
# Check timer status
systemctl status certbot.timer

# View next scheduled run
systemctl list-timers certbot.timer

# View timer configuration
systemctl cat certbot.timer
```

**Schedule**: Runs twice daily at random times to distribute load on Let's Encrypt servers.

### Renewal Process Flow

1. **Timer Triggers** → certbot.service starts
2. **Certbot Checks** → Scans all certificates in `/etc/letsencrypt/renewal/`
3. **Identifies Expiring** → Certificates with <30 days validity
4. **Requests Renewal** → Contacts Let's Encrypt API
5. **Domain Validation** → HTTP-01 challenge via `/.well-known/acme-challenge/`
6. **Downloads Certificate** → Saves to `/etc/letsencrypt/live/DOMAIN/`
7. **Runs Hooks** → Executes scripts in `/etc/letsencrypt/renewal-hooks/post/`
8. **Logs Results** → Writes to `/var/log/letsencrypt/letsencrypt.log`

### Manual Renewal Commands

```bash
# Test renewal (dry run - doesn't actually renew)
certbot renew --dry-run

# Renew all certificates due for renewal
certbot renew

# Force renewal of specific certificate
certbot renew --cert-name DOMAIN.com --force-renewal

# Renew with verbose output (for troubleshooting)
certbot renew --cert-name DOMAIN.com --force-renewal --verbose

# Check certificate status
certbot certificates
```

### Renewal Hooks

**Pre-Renewal Hooks** (`/etc/letsencrypt/renewal-hooks/pre/`):
- Run before renewal attempt
- Use for: Stopping services, backing up configs

**Post-Renewal Hooks** (`/etc/letsencrypt/renewal-hooks/post/`):
- Run after successful renewal
- Use for: Reloading web server, sending notifications

**Deploy Hooks** (`/etc/letsencrypt/renewal-hooks/deploy/`):
- Run after successful renewal (same as post, but with cert info)
- Use for: Certificate deployment to other services

**Example Post-Renewal Hook**:
```bash
#!/bin/bash
# /etc/letsencrypt/renewal-hooks/post/reload-nginx.sh

# Reload Nginx
systemctl reload nginx

# Log the reload
echo "$(date): Nginx reloaded after certificate renewal" >> /var/log/certbot-renewal.log

# Optional: Send notification
# curl -X POST https://your-monitoring-service.com/webhook \
#   -d "message=SSL certificate renewed and Nginx reloaded"
```

---

## Monitoring & Alerts

### Certificate Expiry Monitoring Script

Create `/usr/local/bin/check-ssl-expiry.sh`:

```bash
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
            # Send alert email
            # echo "Certificate for $domain has EXPIRED!" | mail -s "URGENT: SSL Certificate Expired" "$EMAIL"
        elif [ $days_until_expiry -lt $ALERT_DAYS ]; then
            echo "⚠️  WARNING: $domain expires in $days_until_expiry days!" >> "$LOG_FILE"
            # Send warning email
            # echo "Certificate for $domain expires in $days_until_expiry days" | mail -s "WARNING: SSL Certificate Expiring Soon" "$EMAIL"
        else
            echo "✅ OK: $domain expires in $days_until_expiry days" >> "$LOG_FILE"
        fi
    fi
done

echo "" >> "$LOG_FILE"
```

**Installation**:
```bash
# Create script
nano /usr/local/bin/check-ssl-expiry.sh
# (paste content above)

# Make executable
chmod +x /usr/local/bin/check-ssl-expiry.sh

# Test
/usr/local/bin/check-ssl-expiry.sh
cat /var/log/ssl-expiry-check.log

# Add to crontab (runs daily at 9 AM)
(crontab -l 2>/dev/null; echo "0 9 * * * /usr/local/bin/check-ssl-expiry.sh") | crontab -
```

### External Monitoring Services

**Recommended Free Services**:

1. **UptimeRobot** (https://uptimerobot.com)
   - Free tier: 50 monitors
   - SSL certificate expiry monitoring
   - Email/SMS/Slack alerts
   - Setup: Add each domain as HTTPS monitor with SSL check enabled

2. **SSL Labs** (https://www.ssllabs.com/ssltest/)
   - Manual testing tool
   - Comprehensive SSL configuration analysis
   - Security grade (A+ to F)
   - Use monthly for security audits

3. **Healthchecks.io** (https://healthchecks.io)
   - Free tier: 20 checks
   - Monitor certbot cron job execution
   - Alert if renewal job fails to run

4. **Cronitor** (https://cronitor.io)
   - Monitor scheduled tasks
   - Alert on certbot failures

### Monitoring Checklist

**Daily** (Automated):
- ✅ Certbot timer runs twice daily
- ✅ SSL expiry check script runs at 9 AM
- ✅ Review `/var/log/ssl-expiry-check.log`

**Weekly** (Manual):
- ✅ Check `/var/log/letsencrypt/letsencrypt.log` for errors
- ✅ Verify all certificates have >21 days validity: `certbot certificates`

**Monthly** (Manual):
- ✅ Run SSL Labs test on all domains
- ✅ Review Nginx SSL configuration
- ✅ Check for Nginx/certbot updates

**Quarterly** (Manual):
- ✅ Review and update SSL best practices
- ✅ Audit certificate inventory
- ✅ Test emergency renewal procedures

---

## Security Best Practices

### Strong SSL Configuration for Nginx

Add to each site's Nginx configuration (`/etc/nginx/sites-available/DOMAIN.conf`):

```nginx
server {
    listen 443 ssl http2;
    server_name domain.com www.domain.com;
    
    # SSL Certificate
    ssl_certificate /etc/letsencrypt/live/domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domain.com/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    
    # HSTS (HTTP Strict Transport Security)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/letsencrypt/live/domain.com/chain.pem;
    
    # Session Settings
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;
    
    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # ... rest of your configuration
}

# HTTP to HTTPS Redirect
server {
    listen 80;
    server_name domain.com www.domain.com;
    return 301 https://$server_name$request_uri;
}
```

### SSL Configuration Checklist

- ✅ TLS 1.2 and 1.3 only (disable TLS 1.0, 1.1)
- ✅ Strong cipher suites
- ✅ HSTS enabled (forces HTTPS)
- ✅ OCSP stapling (faster certificate validation)
- ✅ HTTP to HTTPS redirect
- ✅ Security headers
- ✅ Session caching for performance

### Testing SSL Configuration

```bash
# Test Nginx configuration syntax
nginx -t

# Reload Nginx after changes
systemctl reload nginx

# Test SSL with OpenSSL
openssl s_client -connect domain.com:443 -servername domain.com < /dev/null

# Check certificate details
echo | openssl s_client -connect domain.com:443 -servername domain.com 2>/dev/null | openssl x509 -noout -dates -subject

# Test with curl
curl -I https://domain.com

# Online testing
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=domain.com
```

---

## Operational Procedures

### Daily Operations

**Automated** (No action required):
- Certbot timer runs twice daily
- SSL expiry check runs at 9 AM
- Certificates auto-renew when <30 days validity

**Manual** (Optional):
- Review `/var/log/ssl-expiry-check.log` for warnings
- Check email for monitoring alerts

### Weekly Maintenance

```bash
# SSH into server
ssh root@72.62.80.207

# Check certificate status
certbot certificates

# Review certbot logs for errors
tail -50 /var/log/letsencrypt/letsencrypt.log

# Check Nginx status
systemctl status nginx

# Review Nginx error logs
tail -50 /var/log/nginx/error.log
```

### Monthly Maintenance

```bash
# Run SSL Labs test on all domains
# https://www.ssllabs.com/ssltest/

# Check for system updates
apt update
apt list --upgradable | grep -E "nginx|certbot"

# Review SSL expiry log
cat /var/log/ssl-expiry-check.log

# Test renewal process
certbot renew --dry-run
```

### Adding a New Domain

**Step-by-step process**:

```bash
# 1. Verify DNS points to server
dig +short NEW-DOMAIN.com
# Should return: 72.62.80.207

# 2. Create Nginx configuration
nano /etc/nginx/sites-available/NEW-DOMAIN.com

# 3. Add basic configuration (HTTP only first)
cat > /etc/nginx/sites-available/NEW-DOMAIN.com << 'NGINX'
server {
    listen 80;
    server_name NEW-DOMAIN.com www.NEW-DOMAIN.com;
    
    root /var/www/NEW-DOMAIN.com;
    index index.html index.php;
    
    location / {
        try_files $uri $uri/ =404;
    }
}
NGINX

# 4. Enable site
ln -s /etc/nginx/sites-available/NEW-DOMAIN.com /etc/nginx/sites-enabled/

# 5. Test Nginx configuration
nginx -t

# 6. Reload Nginx
systemctl reload nginx

# 7. Obtain SSL certificate
certbot --nginx -d NEW-DOMAIN.com -d www.NEW-DOMAIN.com

# 8. Verify SSL
curl -I https://NEW-DOMAIN.com

# 9. Check certificate
certbot certificates | grep -A 10 "NEW-DOMAIN.com"
```

**Certbot will automatically**:
- Obtain certificate from Let's Encrypt
- Update Nginx configuration with SSL settings
- Add HTTP to HTTPS redirect
- Configure auto-renewal

### Removing a Domain

```bash
# 1. Disable Nginx site
rm /etc/nginx/sites-enabled/DOMAIN.com

# 2. Test and reload Nginx
nginx -t && systemctl reload nginx

# 3. Delete certificate
certbot delete --cert-name DOMAIN.com

# 4. Remove Nginx configuration (optional)
rm /etc/nginx/sites-available/DOMAIN.com

# 5. Verify
certbot certificates
```

---

## Troubleshooting Guide

### Certificate Renewal Failures

**Symptom**: Certificate not renewing automatically

**Diagnosis**:
```bash
# Check certbot logs
tail -100 /var/log/letsencrypt/letsencrypt.log

# Test renewal
certbot renew --dry-run

# Check timer status
systemctl status certbot.timer
```

**Common Causes & Solutions**:

1. **HTTP-01 Challenge Fails**
   - **Cause**: Nginx not serving `/.well-known/acme-challenge/`
   - **Solution**: Ensure Nginx config allows access to challenge directory
   ```nginx
   location /.well-known/acme-challenge/ {
       root /var/www/html;
       allow all;
   }
   ```

2. **DNS Issues**
   - **Cause**: Domain not resolving to server
   - **Check**: `dig +short DOMAIN.com` should return `72.62.80.207`
   - **Solution**: Update DNS records

3. **Firewall Blocking**
   - **Cause**: Port 80 or 443 blocked
   - **Check**: `netstat -tlnp | grep -E ':80|:443'`
   - **Solution**: Open ports in firewall

4. **Rate Limiting**
   - **Cause**: Too many renewal attempts
   - **Check**: Look for "rate limit" in certbot logs
   - **Solution**: Wait 1 hour, then retry

5. **Nginx Not Reloading**
   - **Cause**: Post-renewal hook not working
   - **Check**: `/var/log/certbot-renewal.log`
   - **Solution**: Manually reload: `systemctl reload nginx`

### SSL Certificate Errors

**Symptom**: Browser shows "Your connection is not private"

**Diagnosis**:
```bash
# Check certificate details
echo | openssl s_client -connect DOMAIN.com:443 -servername DOMAIN.com 2>/dev/null | openssl x509 -noout -dates -subject

# Check Nginx is serving correct certificate
curl -vI https://DOMAIN.com 2>&1 | grep -E "subject|issuer|expire"
```

**Common Causes**:

1. **Certificate Expired**
   - **Solution**: Force renewal
   ```bash
   certbot renew --cert-name DOMAIN.com --force-renewal
   systemctl reload nginx
   ```

2. **Wrong Certificate Served**
   - **Cause**: Nginx serving default/wrong certificate
   - **Check**: Nginx configuration for correct `ssl_certificate` path
   - **Solution**: Update Nginx config, reload

3. **Certificate Not Trusted**
   - **Cause**: Missing intermediate certificate
   - **Solution**: Use `fullchain.pem` instead of `cert.pem`
   ```nginx
   ssl_certificate /etc/letsencrypt/live/DOMAIN/fullchain.pem;
   ```

### Nginx Issues

**Symptom**: Nginx not starting or reloading

**Diagnosis**:
```bash
# Check Nginx status
systemctl status nginx

# Test configuration
nginx -t

# Check error logs
tail -50 /var/log/nginx/error.log
```

**Common Causes**:

1. **Configuration Syntax Error**
   - **Check**: `nginx -t` shows error location
   - **Solution**: Fix syntax error in config file

2. **Port Already in Use**
   - **Check**: `netstat -tlnp | grep :443`
   - **Solution**: Stop conflicting service

3. **Certificate File Not Found**
   - **Check**: `ls -la /etc/letsencrypt/live/DOMAIN/`
   - **Solution**: Obtain certificate first, then configure Nginx

### Certbot Timer Not Running

**Symptom**: Auto-renewal not happening

**Diagnosis**:
```bash
# Check timer status
systemctl status certbot.timer

# Check timer schedule
systemctl list-timers certbot.timer

# Check service status
systemctl status certbot.service
```

**Solution**:
```bash
# Enable timer
systemctl enable certbot.timer

# Start timer
systemctl start certbot.timer

# Verify
systemctl list-timers certbot.timer
```

---

## Emergency Procedures

### Emergency Certificate Renewal

**When**: Certificate expired or expiring within 24 hours

**Procedure**:
```bash
# 1. SSH into server
ssh root@72.62.80.207

# 2. Check current status
certbot certificates

# 3. Force renewal
certbot renew --cert-name DOMAIN.com --force-renewal

# 4. If renewal fails, try with verbose output
certbot renew --cert-name DOMAIN.com --force-renewal --verbose

# 5. Reload Nginx
systemctl reload nginx

# 6. Verify
curl -I https://DOMAIN.com
echo | openssl s_client -connect DOMAIN.com:443 -servername DOMAIN.com 2>/dev/null | openssl x509 -noout -dates

# 7. Check certificate status
certbot certificates | grep -A 10 "DOMAIN.com"
```

### Emergency Nginx Restart

**When**: Nginx not responding or serving wrong certificates

**Procedure**:
```bash
# 1. Test configuration
nginx -t

# 2. If test passes, reload
systemctl reload nginx

# 3. If reload fails, restart
systemctl restart nginx

# 4. If restart fails, check logs
systemctl status nginx
tail -50 /var/log/nginx/error.log

# 5. Fix issues and retry
nginx -t
systemctl start nginx
```

### Emergency Rollback

**When**: New certificate causing issues

**Procedure**:
```bash
# 1. List available certificates
ls -la /etc/letsencrypt/archive/DOMAIN.com/

# 2. Identify previous certificate
# Files are numbered: cert1.pem, cert2.pem, etc.
# Current is highest number

# 3. Update symlinks to previous version
cd /etc/letsencrypt/live/DOMAIN.com/
ln -sf ../../archive/DOMAIN.com/cert2.pem cert.pem
ln -sf ../../archive/DOMAIN.com/chain2.pem chain.pem
ln -sf ../../archive/DOMAIN.com/fullchain2.pem fullchain.pem
ln -sf ../../archive/DOMAIN.com/privkey2.pem privkey.pem

# 4. Reload Nginx
systemctl reload nginx

# 5. Verify
curl -I https://DOMAIN.com
```

### Emergency Contact Information

**Server Access**:
- Host: 72.62.80.207
- User: root
- Password: @Trustee23//

**Key Personnel**:
- System Administrator: [Add contact]
- Web Developer: [Add contact]
- Emergency Contact: [Add contact]

**External Services**:
- Domain Registrar: [Add details]
- DNS Provider: [Add details]
- Hosting Provider: [Add details]

---

## Appendix

### Key Files & Directories

```
/etc/letsencrypt/
├── live/                          # Active certificates (symlinks)
│   ├── educationministry.org/
│   │   ├── cert.pem              # Certificate only
│   │   ├── chain.pem             # Intermediate certificates
│   │   ├── fullchain.pem         # cert.pem + chain.pem (use this in Nginx)
│   │   └── privkey.pem           # Private key
│   ├── btpma.org/
│   ├── aemp-dashboard.btpma.org/
│   └── platform.btpma.org/
├── renewal/                       # Renewal configuration files
│   ├── educationministry.org.conf
│   ├── btpma.org.conf
│   ├── aemp-dashboard.btpma.org.conf
│   └── platform.btpma.org.conf
├── renewal-hooks/
│   ├── pre/                       # Scripts run before renewal
│   ├── post/                      # Scripts run after renewal
│   └── deploy/                    # Scripts run after successful renewal
├── archive/                       # All certificates (historical)
│   └── DOMAIN.com/
│       ├── cert1.pem, cert2.pem, ...
│       ├── chain1.pem, chain2.pem, ...
│       ├── fullchain1.pem, fullchain2.pem, ...
│       └── privkey1.pem, privkey2.pem, ...
└── keys/                          # Private keys

/var/log/letsencrypt/              # Certbot logs
├── letsencrypt.log                # Main log file

/etc/nginx/
├── sites-available/               # All site configurations
│   ├── educationministry.org
│   ├── btpma
│   ├── aemp-dashboard.btpma.org
│   └── platform.btpma.org
└── sites-enabled/                 # Active sites (symlinks)

/var/log/nginx/                    # Nginx logs
├── access.log
└── error.log

/usr/local/bin/
└── check-ssl-expiry.sh            # Custom monitoring script

/var/log/
├── ssl-expiry-check.log           # SSL monitoring log
└── certbot-renewal.log            # Post-renewal hook log
```

### Useful Commands Reference

```bash
# Certificate Management
certbot certificates                           # List all certificates
certbot renew                                  # Renew expiring certificates
certbot renew --dry-run                        # Test renewal
certbot renew --cert-name DOMAIN --force-renewal  # Force renewal
certbot delete --cert-name DOMAIN              # Delete certificate
certbot --nginx -d DOMAIN.com                  # Obtain new certificate

# Nginx Management
nginx -t                                       # Test configuration
systemctl status nginx                         # Check status
systemctl reload nginx                         # Reload configuration
systemctl restart nginx                        # Restart service
systemctl enable nginx                         # Enable auto-start

# SSL Testing
openssl x509 -in /etc/letsencrypt/live/DOMAIN/fullchain.pem -noout -dates  # Check expiry
echo | openssl s_client -connect DOMAIN:443 -servername DOMAIN 2>/dev/null | openssl x509 -noout -dates  # Test SSL
curl -I https://DOMAIN.com                     # Test HTTPS
dig +short DOMAIN.com                          # Check DNS

# Monitoring
tail -f /var/log/letsencrypt/letsencrypt.log   # Watch certbot logs
tail -f /var/log/nginx/error.log               # Watch Nginx errors
systemctl status certbot.timer                 # Check auto-renewal timer
systemctl list-timers certbot.timer            # View timer schedule

# System
systemctl status                               # System overview
df -h                                          # Disk space
free -h                                        # Memory usage
netstat -tlnp | grep -E ':80|:443'            # Check ports
```

### Let's Encrypt Rate Limits

**Important**: Let's Encrypt has rate limits to prevent abuse.

- **Certificates per Registered Domain**: 50 per week
- **Duplicate Certificate**: 5 per week
- **Failed Validation**: 5 failures per account, per hostname, per hour
- **New Orders**: 300 per account per 3 hours

**Best Practices**:
- Use `--dry-run` for testing
- Don't force-renew unnecessarily
- Wait 1 hour between failed attempts
- Use staging environment for development

**Staging Environment** (for testing):
```bash
certbot --staging --nginx -d test.domain.com
```

### Additional Resources

**Official Documentation**:
- Let's Encrypt: https://letsencrypt.org/docs/
- Certbot: https://certbot.eff.org/docs/
- Nginx SSL: https://nginx.org/en/docs/http/configuring_https_servers.html

**Testing Tools**:
- SSL Labs: https://www.ssllabs.com/ssltest/
- SSL Checker: https://www.sslshopper.com/ssl-checker.html
- Certificate Decoder: https://www.sslshopper.com/certificate-decoder.html

**Monitoring Services**:
- UptimeRobot: https://uptimerobot.com
- Healthchecks.io: https://healthchecks.io
- Cronitor: https://cronitor.io

**Community Support**:
- Let's Encrypt Community: https://community.letsencrypt.org/
- Nginx Forum: https://forum.nginx.org/
- Stack Overflow: https://stackoverflow.com/questions/tagged/letsencrypt

---

**Document Version**: 1.0
**Last Updated**: March 25, 2026
**Next Review**: June 25, 2026
**Maintained By**: Education Ministry IT Team
