# Deployment Package — Education Ministry React SPA

> **Target:** `app.educationministry.org` on Hostinger VPS (`72.62.80.207`)  
> **Stack:** Static files + Nginx + Let's Encrypt  
> **Monthly Cost:** $0 (beyond existing VPS)

---

## 📁 Package Contents

```
deployment-package/
├── README.md                          ← This file
├── ACCEPTANCE_CRITERIA.md             ← Quality gates (all must pass)
├── PRE_DEPLOYMENT_CHECKLIST.md        ← Pre-flight checks
├── .env.production.template           ← Environment variable reference
├── scripts/
│   ├── initial-server-setup.sh        ← First-time VPS setup (run once)
│   ├── deploy.sh                      ← Pull & deploy latest code
│   ├── rollback.sh                    ← Revert to previous version
│   ├── health-check.sh                ← Verify site health
│   └── setup-ssl.sh                   ← Obtain Let's Encrypt SSL
├── nginx/
│   ├── app.educationministry.org.conf ← Full HTTPS Nginx config
│   └── nginx-initial-http-only.conf   ← Temporary HTTP config (for certbot)
├── monitoring/
│   └── setup-monitoring.md            ← Free monitoring setup guide
└── github-actions/
    └── deploy.yml                     ← CI/CD workflow for GitHub Actions
```

## 🚀 Quick Start (First-Time Deployment)

### Step 1: Copy package to VPS
```bash
scp -r deployment-package/ root@72.62.80.207:/home/ubuntu/
```

### Step 2: Run initial setup (one time)
```bash
ssh root@72.62.80.207
cd /home/ubuntu/deployment-package
chmod +x scripts/*.sh
sudo ./scripts/initial-server-setup.sh
```

### Step 3: Configure DNS
Add an A record in your DNS provider:
```
Type: A
Name: app
Value: 72.62.80.207
TTL: 300
```

Wait for propagation:
```bash
dig app.educationministry.org
```

### Step 4: Deploy code
```bash
sudo ./scripts/deploy.sh
```

### Step 5: Setup SSL
```bash
sudo ./scripts/setup-ssl.sh
```

### Step 6: Verify
```bash
./scripts/health-check.sh
```

---

## 🔄 Subsequent Deployments

```bash
# Deploy latest from main branch
sudo ./scripts/deploy.sh

# Deploy specific branch
sudo ./scripts/deploy.sh feature-branch

# Rollback to previous version
sudo ./scripts/rollback.sh

# Rollback to specific backup
sudo ./scripts/rollback.sh 20260407_153000
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│  User Browser                                   │
│  https://app.educationministry.org              │
└────────────────────┬────────────────────────────┘
                     │
          ┌──────────▼──────────┐
          │  Hostinger VPS      │
          │  72.62.80.207       │
          │                     │
          │  ┌───────────────┐  │
          │  │    Nginx      │  │
          │  │  (port 80/443)│  │
          │  └───────┬───────┘  │
          │          │          │
          │  ┌───────▼───────┐  │
          │  │ Static Files  │  │
          │  │ /var/www/     │  │
          │  │ education-    │  │
          │  │ ministry-org/ │  │
          │  │  index.html   │  │
          │  │  assets/      │  │
          │  └───────────────┘  │
          └─────────────────────┘
```

The React SPA is a **static site** — no Node.js, no build step, no server-side rendering. Nginx serves the files directly with:
- HTTPS via Let's Encrypt
- Gzip compression
- Security headers
- Asset caching
- SPA routing support (`try_files`)

---

## 📊 Cost Breakdown

| Service | Provider | Cost |
|---------|----------|------|
| VPS Hosting | Hostinger (existing) | $0/mo additional |
| SSL Certificate | Let's Encrypt | Free |
| DNS | Hostinger (included) | Free |
| CI/CD | GitHub Actions free tier | Free |
| Uptime Monitoring | UptimeRobot free tier | Free |
| **Total Additional** | | **$0/month** |

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Site shows Nginx default page | Check symlink: `ls -la /etc/nginx/sites-enabled/` |
| 502 Bad Gateway | N/A — static site, check Nginx config |
| SSL errors | Re-run `setup-ssl.sh` or check cert: `certbot certificates` |
| Blank page | Check browser console; verify `config.js` loads before `app.js` |
| 404 on assets | Check file permissions: `ls -la /var/www/education-ministry-org/` |
| Old content showing | Clear Nginx cache, check browser cache |
