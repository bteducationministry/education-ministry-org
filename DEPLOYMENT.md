# Deployment Guide — educationministry.org

This guide covers configuring the custom domain **educationministry.org** for the Education Ministry website hosted on GitHub Pages.

## Current Setup

- **Repository:** `bteducationministry/education-ministry-org`
- **GitHub Pages URL:** `bteducationministry.github.io/education-ministry-org`
- **Target Custom Domain:** `educationministry.org`

---

## Step 1: DNS Configuration

At your domain registrar (e.g., GoDaddy, Namecheap, Cloudflare, Google Domains), configure the following DNS records for `educationministry.org`:

### A Records (Apex Domain)

Add **four** A records pointing the root domain to GitHub Pages servers:

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

> **Note:** The `@` symbol represents the root/apex domain (`educationministry.org`). Some registrars may require you to leave the "Name" field blank instead.

### CNAME Record (www Subdomain)

Add a CNAME record so `www.educationministry.org` resolves correctly:

| Type | Name | Value |
|------|------|-------|
| CNAME | `www` | `bteducationministry.github.io` |

> This ensures visitors who type `www.educationministry.org` are redirected properly.

### Optional: AAAA Records (IPv6)

For IPv6 support, you may also add these AAAA records:

| Type | Name | Value |
|------|------|-------|
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

---

## Step 2: Verify DNS Propagation

After updating DNS records, propagation may take **24–48 hours** (though it often completes within a few hours).

You can verify propagation using:

```bash
# Check A records
dig educationministry.org +short
# Expected: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153

# Check CNAME record
dig www.educationministry.org +short
# Expected: bteducationministry.github.io

# Alternative: use nslookup
nslookup educationministry.org
```

Or use an online tool like [dnschecker.org](https://dnschecker.org) to check global propagation.

---

## Step 3: Enable HTTPS in GitHub Pages Settings

1. Go to the repository settings:
   **https://github.com/bteducationministry/education-ministry-org/settings/pages**

2. Under **"Custom domain"**, verify that `educationministry.org` is shown.

3. Check the **"Enforce HTTPS"** checkbox.
   - If the checkbox is grayed out, wait for DNS propagation to complete and GitHub to provision the SSL certificate (this can take up to 24 hours after DNS is configured).
   - GitHub uses Let's Encrypt to automatically provision and renew SSL certificates.

4. Verify the site loads at:
   - `https://educationministry.org` ✓
   - `https://www.educationministry.org` ✓
   - `http://educationministry.org` → should redirect to HTTPS ✓

---

## Step 4: Verify the CNAME File

The repository root contains a `CNAME` file with the content:

```
educationministry.org
```

> **Important:** Do not delete this file. GitHub Pages uses it to associate the custom domain with the repository. If it's removed, the custom domain setting will be cleared.

---

## Troubleshooting

### Site not loading after DNS changes
- DNS propagation can take 24–48 hours. Be patient.
- Verify your DNS records are correct using `dig` or [dnschecker.org](https://dnschecker.org).

### "Enforce HTTPS" is grayed out
- GitHub needs to provision an SSL certificate. This requires DNS to be fully propagated first.
- Wait a few hours after DNS propagation and try again.
- If it's still grayed out after 24 hours, try removing and re-adding the custom domain in the repository settings.

### 404 error on custom domain
- Ensure the `CNAME` file exists in the repository root.
- Ensure GitHub Pages is enabled in repository settings and set to deploy from the correct branch.

### Mixed content warnings
- Ensure all resources (images, scripts, stylesheets) use HTTPS or protocol-relative URLs.
- The site uses CDN-hosted React, Babel, Google Fonts, and Stripe.js — all served over HTTPS.

---

## DNS Configuration Summary

```
# A Records (required)
educationministry.org.    A    185.199.108.153
educationministry.org.    A    185.199.109.153
educationministry.org.    A    185.199.110.153
educationministry.org.    A    185.199.111.153

# CNAME Record (required)
www.educationministry.org.    CNAME    bteducationministry.github.io.

# AAAA Records (optional, for IPv6)
educationministry.org.    AAAA    2606:50c0:8000::153
educationministry.org.    AAAA    2606:50c0:8001::153
educationministry.org.    AAAA    2606:50c0:8002::153
educationministry.org.    AAAA    2606:50c0:8003::153
```

---

## API Subdomain (Future)

The application references `https://api.educationministry.org/` for backend endpoints (`/signup`, `/measure`). When the API backend is deployed, you'll need an additional DNS record:

| Type | Name | Value |
|------|------|-------|
| A or CNAME | `api` | *(Your API server IP or hostname)* |

---

© 2026 Bodhi Tree Education Ministry. All rights reserved.
