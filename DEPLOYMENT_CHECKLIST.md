# Deployment Checklist — app.educationministry.org

> Use this checklist every time a deployment is made to the production React SPA.

---

## Pre-Deployment Verification

- [ ] All changes committed and pushed to the `main` branch
- [ ] `assets/js/config.js` has correct **production** values:
  - `API_BASE_URL` → `https://api.educationministry.org`
  - `PLATFORM_LOGIN_URL` → `https://platform.btpma.org/login`
  - `CONTACT_EMAIL` → `info@educationministry.org`
  - `STRIPE_PUBLISHABLE_KEY` → valid production key (not test key)
  - `DEBUG` → `false`
- [ ] No `console.log` statements remain in production code
- [ ] `index.html` loads `config.js` **before** `app.js`
- [ ] `CNAME` file contains `app.educationministry.org`
- [ ] Hero image and logo assets are present in `assets/images/`
- [ ] No hardcoded URLs in `app.js` (all via `AppConfig`)

---

## DNS Configuration Checklist

| Record | Type  | Name   | Value                                |
|--------|-------|--------|--------------------------------------|
| App    | CNAME | `app`  | `bteducationministry.github.io`      |
| Main   | A / CNAME | `@` / `www` | WordPress host IP / domain    |
| API    | A / CNAME | `api`  | Backend server IP / domain          |

### Verify DNS Propagation

```bash
dig app.educationministry.org +short
# Should return: bteducationministry.github.io.

nslookup app.educationministry.org
# Should resolve to GitHub Pages IPs
```

---

## GitHub Pages Setup Steps

1. Go to **Repository Settings → Pages**
2. Source: **Deploy from a branch** → `main` / `/ (root)`
3. Custom domain: `app.educationministry.org`
4. Check **Enforce HTTPS** (after SSL certificate provisions — may take up to 24 hours)
5. Verify the `CNAME` file was not overwritten by GitHub

---

## Post-Deployment Verification

- [ ] `https://app.educationministry.org` loads the React SPA
- [ ] HTTPS is enforced (HTTP redirects to HTTPS)
- [ ] Header navigation links work: Home, About, Programs, Civic Library, Membership, Donate
- [ ] Hero section renders with background image
- [ ] Logo displays in header
- [ ] "Begin Free →" button links to signup flow
- [ ] "Login" button opens `platform.btpma.org/login` in new tab
- [ ] Footer shows correct copyright year and org name
- [ ] Signup form submits to `api.educationministry.org/signup`
- [ ] Privacy Policy page accessible via `/#/privacy`
- [ ] Terms of Service page accessible via `/#/terms`
- [ ] Responsive design works on mobile, tablet, and desktop
- [ ] `educationministry.org` (WordPress) is **not** affected

---

## Rollback Procedure

If issues are discovered after deployment:

1. **Quick rollback** — revert to previous commit:
   ```bash
   git log --oneline -5          # find the last good commit
   git revert HEAD --no-edit     # revert the latest commit
   git push origin main          # push the revert
   ```
2. **CNAME rollback** — if subdomain is broken, temporarily revert `CNAME`:
   ```bash
   echo "bteducationministry.github.io" > CNAME
   git add CNAME && git commit -m "Rollback CNAME" && git push
   ```
3. **Full rollback** — reset to a known-good tag:
   ```bash
   git reset --hard <tag-or-sha>
   git push --force origin main   # use with caution
   ```

---

## Monitoring & Maintenance

| Task | Frequency | Notes |
|------|-----------|-------|
| Check site loads | After every push | Verify via browser |
| SSL certificate renewal | Automatic (GitHub Pages) | Monitor for expiry warnings |
| DNS record verification | Monthly | Ensure records haven't changed |
| Update `COPYRIGHT_YEAR` in config.js | Annually (January) | Update production config |
| Review Stripe key validity | Quarterly | Ensure key is active |
| Check API endpoint health | Weekly | Verify `/signup` and `/measure` respond |
| Review error reports | Weekly | Check for user-reported issues |
| Update dependencies (CDN scripts) | Quarterly | React, Babel, Stripe.js versions |

---

*Last updated: April 2026*
