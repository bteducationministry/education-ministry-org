# Deployment Guide — app.educationministry.org

## Architecture Overview

```
educationministry.org          → WordPress (main site, content management)
app.educationministry.org      → GitHub Pages (React SPA, this repository)
api.educationministry.org      → Backend API (signup, measure, payments)
platform.btpma.org             → External login platform
```

## DNS Configuration

### Required DNS Records

At your domain registrar (for `educationministry.org`), configure:

| Type | Name | Value | Purpose |
|------|------|-------|---------|
| CNAME | `app` | `bteducationministry.github.io` | React SPA subdomain |
| A | `@` | *(WordPress host IP)* | Main WordPress site |
| CNAME | `www` | *(WordPress host)* | www redirect |
| CNAME | `api` | *(API server host)* | Backend API |

> **Note:** The A records for `@` should point to your WordPress hosting provider, not GitHub Pages. Only the `app` subdomain uses GitHub Pages.

### DNS Propagation

After adding/changing DNS records:

```bash
# Check CNAME resolution
dig app.educationministry.org CNAME

# Check if it resolves to GitHub Pages
nslookup app.educationministry.org

# Expected: bteducationministry.github.io
```

Propagation typically takes 15 minutes to 48 hours depending on TTL settings.

## GitHub Pages Setup

### Step 1: Repository Settings

1. Go to **Settings → Pages** in the GitHub repository
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)`
4. Custom domain: `app.educationministry.org`

### Step 2: CNAME File

The repository includes a `CNAME` file containing:

```
app.educationministry.org
```

> **Important:** Do not delete this file. GitHub Pages uses it to route the custom domain. If the file is removed, the custom domain setting will be cleared.

### Step 3: HTTPS

1. After DNS propagates, go to **Settings → Pages**
2. Check **Enforce HTTPS**
3. GitHub will automatically provision an SSL certificate via Let's Encrypt
4. Certificate provisioning may take up to 24 hours after DNS verification

## Configuration

The React SPA uses `assets/js/config.js` for environment-aware configuration. In production, all values are pre-configured for `app.educationministry.org`. No environment variables or build steps are needed.

To update production configuration (e.g., adding a Stripe key):

1. Edit `assets/js/config.js`
2. Update the `production` config object
3. Commit and push to `main`
4. GitHub Pages will automatically deploy

## Troubleshooting

### Site shows 404

- Verify `CNAME` file exists in the repository root and contains `app.educationministry.org`
- Check GitHub Pages settings show the correct custom domain
- Ensure DNS CNAME record points to `bteducationministry.github.io`

### SSL Certificate not provisioning

- DNS must fully propagate before GitHub can issue a certificate
- Remove and re-add the custom domain in GitHub Pages settings
- Wait up to 24 hours for Let's Encrypt to issue the certificate

### Site loads but shows wrong content

- Clear browser cache (GitHub Pages uses aggressive caching)
- Check that the `main` branch has the latest changes
- Verify the GitHub Pages deployment completed (check Actions tab)

### Hash routing not working

The SPA uses hash-based routing (`#/about`, `#/programs`, etc.). This works with GitHub Pages without any server configuration. If routes break:

- Ensure `index.html` is the only HTML file at the root
- Verify the hash router in `app.js` is processing `window.location.hash`

## Deployment Checklist

- [ ] DNS CNAME record: `app` → `bteducationministry.github.io`
- [ ] GitHub Pages enabled on `main` branch
- [ ] Custom domain set to `app.educationministry.org`
- [ ] HTTPS enforced
- [ ] SSL certificate provisioned
- [ ] Site loads correctly at `https://app.educationministry.org`
- [ ] All routes work (`#/about`, `#/programs`, etc.)
- [ ] Signup form submits to API
- [ ] Login link points to correct platform URL
- [ ] Images load correctly
