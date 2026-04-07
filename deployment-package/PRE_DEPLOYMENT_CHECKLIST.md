# Pre-Deployment Checklist

> Complete ALL items before running deployment scripts.

---

## 🔑 Access Verification

- [ ] SSH access to VPS works: `ssh root@72.62.80.207`
- [ ] VPS IP is `72.62.80.207` (verify: `curl ifconfig.me` on VPS)
- [ ] GitHub repo accessible: `git clone https://github.com/bteducationministry/education-ministry-org.git`
- [ ] VPS has Ubuntu 20.04+ or Debian 11+

## 🌐 DNS Configuration

- [ ] DNS provider login available (Hostinger or domain registrar)
- [ ] Plan for DNS records:
  - `A` record: `app.educationministry.org` → `72.62.80.207`
  - OR `CNAME` record: `app` → VPS hostname
- [ ] Current DNS propagation check: `dig app.educationministry.org`
- [ ] TTL set to low value (300s) during migration

## 📦 Code Readiness

- [ ] All changes committed to `main` branch
- [ ] `config.js` has correct production values:
  - [ ] `API_BASE_URL` = `https://api.educationministry.org`
  - [ ] `APP_DOMAIN` = `app.educationministry.org`
  - [ ] `DEBUG` = `false` for production
  - [ ] `STRIPE_PUBLISHABLE_KEY` set (or empty if not ready)
- [ ] No `console.log` debug statements in `app.js`
- [ ] `CNAME` file contains `app.educationministry.org`
- [ ] Hero image present: `assets/images/vFinal Heritage Bodhi Tree Hero Image Only.png`
- [ ] Logo present: `assets/images/bodhi-tree-logo-header.png`

## 🛡️ Backup Plan

- [ ] Current GitHub Pages version documented/bookmarked
- [ ] Rollback procedure reviewed (`rollback.sh`)
- [ ] If migrating from GitHub Pages:
  - [ ] Current CNAME DNS record documented
  - [ ] GitHub Pages can be re-enabled if needed

## 🖥️ VPS Readiness

- [ ] VPS is running and reachable
- [ ] At least 1GB free disk space: `df -h /`
- [ ] No conflicting web servers on ports 80/443
- [ ] Firewall allows ports 80, 443, 22

## 📋 Deployment Order

1. ☐ Run `initial-server-setup.sh` (first time only)
2. ☐ Configure DNS A record
3. ☐ Wait for DNS propagation (verify with `dig`)
4. ☐ Run `deploy.sh` to deploy code
5. ☐ Verify HTTP site works
6. ☐ Run `setup-ssl.sh` to obtain SSL certificate
7. ☐ Run `health-check.sh` to verify everything
8. ☐ Set up monitoring (UptimeRobot)
9. ☐ Set up CI/CD (GitHub Actions)

## ⚠️ Rollback Triggers

If ANY of these occur, execute rollback:
- Site returns 5xx errors after deployment
- SSL certificate fails to install
- index.html not found errors
- JavaScript errors preventing page render

---

**Sign-off:** ____________________  Date: ___________
