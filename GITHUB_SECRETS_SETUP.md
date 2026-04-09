# GitHub Secrets & Workflow Setup Guide

## Education Ministry — CI/CD Pipeline Activation

> **Status:** Workflow file created, GitHub Secrets need manual configuration.
> **Time Required:** ~5 minutes
> **Prerequisites:** GitHub repo admin access

---

### Step 1: Configure GitHub Secrets

Go to: **[Repository Secrets Settings](https://github.com/bteducationministry/education-ministry-org/settings/secrets/actions)**

Or navigate manually: **Repository → Settings → Secrets and variables → Actions → New repository secret**

Add these three secrets:

#### Secret 1: `VPS_HOST`
- **Name:** `VPS_HOST`
- **Value:** `72.62.80.207`

#### Secret 2: `VPS_USER`
- **Name:** `VPS_USER`
- **Value:** `root`

#### Secret 3: `VPS_SSH_KEY`
- **Name:** `VPS_SSH_KEY`
- **Value:** The **entire** contents of the deploy private key file (`id_ed25519_bt_deploy`)

To get the key value, run on your local machine:
```bash
cat ~/.ssh/id_ed25519_bt_deploy
```

⚠️ **Important:** Copy the FULL key including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----` lines. No extra whitespace or newlines at the end.

---

### Step 2: Push the Workflow File

The workflow file is already created at `.github/workflows/deploy.yml` in the repo but couldn't be pushed automatically because GitHub requires special `workflows` permission.

**Option A — Push from your local machine (recommended):**
```bash
# Clone or pull the repo locally
cd education-ministry-org
git pull origin main

# The file should already be at .github/workflows/deploy.yml
# If not, copy it from deployment-package/github-actions/deploy.yml:
mkdir -p .github/workflows
cp deployment-package/github-actions/deploy.yml .github/workflows/deploy.yml

# Commit and push
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions CI/CD deployment workflow"
git push origin main
```

**Option B — Create via GitHub Web UI:**
1. Go to the repository on GitHub
2. Click **Add file → Create new file**
3. In the filename field, type: `.github/workflows/deploy.yml`
4. Paste the workflow content below
5. Commit directly to `main`

<details>
<summary>📋 Click to expand: Full workflow file content to paste</summary>

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]
    paths-ignore:
      - '**.md'
      - 'docs/**'
      - '.gitignore'
      - 'CNAME'
  workflow_dispatch:
    inputs:
      rollback:
        description: 'Rollback to previous deployment? (yes/no)'
        required: false
        default: 'no'
      deploy_ref:
        description: 'Git ref to deploy (branch/tag/SHA). Leave empty for latest main.'
        required: false
        default: ''

concurrency:
  group: production-deploy
  cancel-in-progress: false

env:
  DEPLOY_DIR: /var/www/education-ministry-org
  BACKUP_DIR: /var/www/backups/education-ministry-org

jobs:
  rollback:
    name: Rollback Deployment
    if: github.event_name == 'workflow_dispatch' && github.event.inputs.rollback == 'yes'
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - name: Rollback to latest backup
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            BACKUP_DIR="/var/www/backups/education-ministry-org"
            DEPLOY_DIR="/var/www/education-ministry-org"
            LATEST_BACKUP=$(ls -dt "$BACKUP_DIR"/*/ 2>/dev/null | head -1)
            if [ -z "$LATEST_BACKUP" ]; then echo "No backups found"; exit 1; fi
            echo "Rolling back to: $LATEST_BACKUP"
            rsync -a --delete "$LATEST_BACKUP/" "$DEPLOY_DIR/"
            chown -R www-data:www-data "$DEPLOY_DIR"
            nginx -t && systemctl reload nginx
            echo "Rollback complete"

  deploy:
    name: Deploy to Production
    if: (github.event_name == 'push') || (github.event_name == 'workflow_dispatch' && github.event.inputs.rollback != 'yes')
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.inputs.deploy_ref || github.ref }}

      - name: Verify critical files exist
        run: |
          MISSING=0
          for f in index.html assets/js/app.js assets/js/config.js assets/css/main.css; do
            if [ ! -f "$f" ]; then echo "Missing: $f"; MISSING=1; else echo "Found: $f"; fi
          done
          if [ "$MISSING" -eq 1 ]; then echo "::error::Critical files missing."; exit 1; fi

      - name: Verify production config safety
        run: |
          if grep -qE 'production.*DEBUG.*true' assets/js/config.js 2>/dev/null; then
            echo "::error::DEBUG is true in production config!"; exit 1
          fi
          echo "Config safety check passed"

      - name: Create backup on VPS
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            DEPLOY_DIR="/var/www/education-ministry-org"
            BACKUP_DIR="/var/www/backups/education-ministry-org"
            TIMESTAMP=$(date +%Y%m%d_%H%M%S)
            if [ -d "$DEPLOY_DIR" ] && [ -f "$DEPLOY_DIR/index.html" ]; then
              mkdir -p "$BACKUP_DIR"
              cp -a "$DEPLOY_DIR" "$BACKUP_DIR/$TIMESTAMP"
              ls -dt "$BACKUP_DIR"/*/ 2>/dev/null | tail -n +6 | xargs -r rm -rf
              echo "Backup created"
            fi

      - name: Deploy to VPS via rsync
        uses: easingthemes/ssh-deploy@v5.1.0
        with:
          SSH_PRIVATE_KEY: ${{ secrets.VPS_SSH_KEY }}
          REMOTE_HOST: ${{ secrets.VPS_HOST }}
          REMOTE_USER: ${{ secrets.VPS_USER }}
          SOURCE: ./
          TARGET: /var/www/education-ministry-org/
          EXCLUDE: |
            .git/
            .github/
            .gitignore
            docs/
            deployment-package/
            *.md
            *.pdf
            CNAME

      - name: Set permissions and reload Nginx
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            chown -R www-data:www-data /var/www/education-ministry-org
            find /var/www/education-ministry-org -type d -exec chmod 755 {} \;
            find /var/www/education-ministry-org -type f -exec chmod 644 {} \;
            nginx -t && systemctl reload nginx
            echo "Nginx reloaded"

      - name: Health check
        id: health_check
        run: |
          sleep 10
          HTTP_CODE=$(curl -so /dev/null -w '%{http_code}' --max-time 15 https://app.educationministry.org 2>/dev/null || echo "000")
          if [ "$HTTP_CODE" = "000" ]; then
            HTTP_CODE=$(curl -so /dev/null -w '%{http_code}' --max-time 15 -H "Host: app.educationministry.org" http://${{ secrets.VPS_HOST }}/ 2>/dev/null || echo "000")
          fi
          echo "http_code=$HTTP_CODE" >> "$GITHUB_OUTPUT"
          if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
            echo "Health check passed (HTTP $HTTP_CODE)"
          else
            echo "::warning::Health check returned HTTP $HTTP_CODE"
            echo "health_failed=true" >> "$GITHUB_OUTPUT"
          fi

      - name: Auto-rollback on health failure
        if: steps.health_check.outputs.health_failed == 'true'
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            BACKUP_DIR="/var/www/backups/education-ministry-org"
            DEPLOY_DIR="/var/www/education-ministry-org"
            LATEST_BACKUP=$(ls -dt "$BACKUP_DIR"/*/ 2>/dev/null | head -1)
            if [ -n "$LATEST_BACKUP" ]; then
              rsync -a --delete "$LATEST_BACKUP/" "$DEPLOY_DIR/"
              chown -R www-data:www-data "$DEPLOY_DIR"
              nginx -t && systemctl reload nginx
              echo "Auto-rollback complete"
            fi

      - name: Deployment summary
        if: always()
        run: |
          echo "## Deployment Summary" >> $GITHUB_STEP_SUMMARY
          echo "| Detail | Value |" >> $GITHUB_STEP_SUMMARY
          echo "|--------|-------|" >> $GITHUB_STEP_SUMMARY
          echo "| Commit | ${{ github.sha }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Branch | ${{ github.ref_name }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Health | HTTP ${{ steps.health_check.outputs.http_code }} |" >> $GITHUB_STEP_SUMMARY
          echo "| Status | ${{ job.status }} |" >> $GITHUB_STEP_SUMMARY
```

</details>

---

### Step 3: Verify the Pipeline

After completing Steps 1 and 2:

1. **Check Actions tab:** Go to [Actions](https://github.com/bteducationministry/education-ministry-org/actions)
2. The workflow should have triggered automatically from the commit
3. Click on the running workflow to watch progress
4. Verify all steps pass (green checkmarks)

#### Manual Test Run
1. Go to **Actions → Deploy to VPS**
2. Click **Run workflow**
3. Leave defaults, click **Run workflow**
4. Monitor the run

---

### Step 4: Verify Deployment on VPS

```bash
# SSH into VPS and check
ssh root@72.62.80.207 "ls -la /var/www/education-ministry-org/ && cat /var/www/education-ministry-org/index.html | head -5"

# Health check from your machine
curl -so /dev/null -w '%{http_code}' -H "Host: app.educationministry.org" http://72.62.80.207/
```

---

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Workflow doesn't trigger | Ensure file is at exactly `.github/workflows/deploy.yml` |
| SSH connection fails | Verify `VPS_SSH_KEY` has the full private key including header/footer lines |
| Permission denied | Ensure the deploy key's public key is in `/root/.ssh/authorized_keys` on VPS |
| Health check warns | Expected until DNS is configured for `app.educationministry.org` |

---

*Created: April 8, 2026*
