# Free Monitoring Setup Guide

## 1. UptimeRobot (Free — Uptime Monitoring)

**URL:** https://uptimerobot.com

### Setup Steps:
1. Create free account at uptimerobot.com
2. Add new monitor:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** Education Ministry App
   - **URL:** `https://app.educationministry.org`
   - **Monitoring Interval:** 5 minutes (free tier)
3. Configure alert contacts (email notification)
4. Optionally add keyword monitor:
   - **Keyword:** `id="root"`
   - **Type:** Keyword exists

### What You Get (Free):
- 50 monitors
- 5-minute check intervals
- Email alerts on downtime
- Uptime percentage reports

---

## 2. SSL Certificate Monitoring

### Option A: UptimeRobot
UptimeRobot automatically checks SSL validity for HTTPS monitors.

### Option B: Server-side cron
Add to root's crontab (`crontab -e`):

```bash
# Check SSL expiry every Monday at 9am
0 9 * * 1 /home/ubuntu/deployment-package/scripts/health-check.sh >> /var/log/health-check.log 2>&1
```

---

## 3. Nginx Log Monitoring

Logs are at:
- Access: `/var/log/nginx/app.educationministry.org.access.log`
- Error: `/var/log/nginx/app.educationministry.org.error.log`

### Quick error check (manual):
```bash
# Last 50 errors
tail -50 /var/log/nginx/app.educationministry.org.error.log

# Count errors today
grep "$(date +%Y/%m/%d)" /var/log/nginx/app.educationministry.org.error.log | wc -l

# Top 404s
awk '$9 == 404 {print $7}' /var/log/nginx/app.educationministry.org.access.log | sort | uniq -c | sort -rn | head -20
```

### Log rotation (already handled by logrotate in Ubuntu):
Verify: `cat /etc/logrotate.d/nginx`

---

## 4. Disk Space Monitoring

Add to crontab:
```bash
# Alert if disk > 80% full
0 8 * * * [ $(df / --output=pcent | tail -1 | tr -d ' %') -gt 80 ] && echo "Disk space warning on VPS" | mail -s "Disk Alert" info@educationministry.org
```

---

## Cost Summary

| Service | Plan | Monthly Cost |
|---------|------|-------------|
| UptimeRobot | Free | $0 |
| Let's Encrypt SSL | Free | $0 |
| GitHub Actions CI/CD | Free tier | $0 |
| Nginx logs | Built-in | $0 |
| **Total** | | **$0** |
