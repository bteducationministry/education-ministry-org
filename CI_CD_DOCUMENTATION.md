# CI/CD Pipeline Documentation

## Education Ministry React SPA — Automated Deployment

> **Target:** `app.educationministry.org` on Hostinger VPS (`72.62.80.207`)
> **Pipeline:** GitHub Actions → SSH/rsync → Nginx reload
> **Cost:** $0/month (GitHub Actions free tier: 2,000 min/month)

---

### Overview

```
┌──────────────┐     ┌─────────────────┐     ┌──────────────────┐
│  Developer    │     │  GitHub Actions  │     │  Hostinger VPS   │
│  pushes to   │────▶│  Workflow runs   │────▶│  Files deployed  │
│  main branch │     │  (ubuntu-latest) │     │  Nginx reloaded  │
└──────────────┘     └─────────────────┘     └──────────────────┘
                            │                         │
                            ▼                         ▼
                     ✅ Health Check          🌐 Site Live at
                     ⚠️ Auto-rollback         app.educationministry.org
                        if failure
```

---

### How It Works

#### Trigger Events
| Event | Condition | Action |
|-------|-----------|--------|
| `push` | To `main` branch | Auto-deploy (skips docs-only changes) |
| `workflow_dispatch` | Manual trigger | Deploy or rollback |

#### Deployment Steps (in order)
1. **Checkout** — pulls the latest code from the triggering commit
2. **Verify critical files** — ensures `index.html`, `app.js`, `config.js`, `main.css` exist
3. **Config safety check** — verifies `DEBUG: false` in production config
4. **Backup** — creates a timestamped copy of the current deployment (keeps last 5)
5. **rsync deploy** — syncs only web-servable files to `/var/www/education-ministry-org/`
6. **Permissions** — sets `www-data` ownership, `755` dirs, `644` files
7. **Nginx reload** — tests config then reloads
8. **Health check** — verifies site returns HTTP 200/301/302
9. **Auto-rollback** — if health check fails, restores from latest backup

#### Files Excluded from Deployment
- `.git/`, `.github/`, `.gitignore`
- `docs/`, `deployment-package/`
- `*.md`, `*.pdf`
- `CNAME`, `.abacus.donotdelete`

---

### GitHub Secrets

These are configured in **Settings → Secrets and variables → Actions**:

| Secret | Description | Current Value |
|--------|-------------|---------------|
| `VPS_HOST` | VPS IP address | `72.62.80.207` |
| `VPS_USER` | SSH user | `root` |
| `VPS_SSH_KEY` | Passphrase-free Ed25519 private key | `id_ed25519_bt_deploy` |

#### Updating Secrets
1. Go to [Repository Secrets](https://github.com/bteducationministry/education-ministry-org/settings/secrets/actions)
2. Click the ✏️ edit icon next to the secret
3. Paste the new value and save

---

### Manual Deployment (workflow_dispatch)

#### Deploy Latest Main
1. Go to **Actions** tab → **Deploy to VPS** workflow
2. Click **Run workflow**
3. Leave defaults → Click **Run workflow**

#### Deploy a Specific Branch/Tag/SHA
1. Go to **Actions** tab → **Deploy to VPS** workflow
2. Click **Run workflow**
3. Enter the git ref in `deploy_ref` (e.g., `v1.2.0`, `feature-branch`, `abc123`)
4. Click **Run workflow**

#### Rollback to Previous Deployment
1. Go to **Actions** tab → **Deploy to VPS** workflow
2. Click **Run workflow**
3. Set `rollback` to `yes`
4. Click **Run workflow**

The rollback restores from the most recent backup in `/var/www/backups/education-ministry-org/`.

---

### Concurrency Protection

The workflow uses `concurrency: production-deploy` to prevent parallel deployments. If a deployment is running and another push happens:
- The **first deployment completes** (cancel-in-progress: false)
- The **second deployment waits** in queue

---

### Monitoring Deployments

#### GitHub Actions Dashboard
- View all runs: [Actions Tab](https://github.com/bteducationministry/education-ministry-org/actions)
- Each run shows a **Deployment Summary** with commit, branch, health check status

#### Deployment Notifications
GitHub Actions automatically provides:
- ✅ Green check on commit if deployment succeeds
- ❌ Red X on commit if deployment fails
- Email notifications (configure in GitHub → Settings → Notifications)

#### Manual Health Check
```bash
# From any machine
curl -so /dev/null -w '%{http_code}' https://app.educationministry.org

# Direct IP check (if DNS not configured)
curl -so /dev/null -w '%{http_code}' -H "Host: app.educationministry.org" http://72.62.80.207/
```

---

### Emergency Procedures

#### Quick Rollback via GitHub
1. Actions → Deploy to VPS → Run workflow → `rollback: yes`

#### Quick Rollback via SSH
```bash
ssh root@72.62.80.207
cd /var/www/backups/education-ministry-org
ls -lt  # List backups by date
# Pick the desired backup, e.g. 20260408_203000
rsync -a --delete 20260408_203000/ /var/www/education-ministry-org/
chown -R www-data:www-data /var/www/education-ministry-org
nginx -t && systemctl reload nginx
```

#### Rollback via Git Revert
```bash
git revert HEAD          # Reverts last commit
git push origin main     # Triggers automatic re-deployment
```

---

### SSH Deploy Key Management

The CI/CD pipeline uses a **passphrase-free Ed25519 key** (`id_ed25519_bt_deploy`).

#### Key Rotation (recommended every 90 days)
1. Generate a new key:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions-deploy@education-ministry" \
     -f ~/.ssh/id_ed25519_bt_deploy_new -N ""
   ```
2. Install public key on VPS:
   ```bash
   ssh root@72.62.80.207 "echo '$(cat ~/.ssh/id_ed25519_bt_deploy_new.pub)' >> /root/.ssh/authorized_keys"
   ```
3. Update `VPS_SSH_KEY` secret in GitHub with the new private key
4. Test a deployment
5. Remove the old key from VPS `/root/.ssh/authorized_keys`

---

### Workflow File Location

```
.github/workflows/deploy.yml
```

A reference copy is also stored at:
```
deployment-package/github-actions/deploy.yml
```

---

### Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Workflow not triggering | Push was docs-only (`*.md`, `docs/`) | Paths-ignore filter — by design |
| `SSH connection refused` | VPS firewall or SSH daemon | Check `ufw status` and `systemctl status sshd` on VPS |
| `Permission denied (publickey)` | Wrong or expired SSH key | Rotate key, update `VPS_SSH_KEY` secret |
| `Nginx config test failed` | Bad Nginx config on VPS | SSH in and fix `/etc/nginx/sites-available/` |
| Health check warns but no rollback | HTTP 000 (DNS not configured) | Expected until DNS A record is set |
| `Resource not accessible` | GitHub token permissions | Check Actions permissions in Settings → Actions → General |

---

### Cost Summary

| Component | Cost |
|-----------|------|
| GitHub Actions (2,000 min/month free) | **$0** |
| SSH deploy key | **$0** |
| Hostinger VPS (already provisioned) | Included |
| **Total additional cost** | **$0/month** |

---

*Document created: April 8, 2026 | Last updated: April 8, 2026*
