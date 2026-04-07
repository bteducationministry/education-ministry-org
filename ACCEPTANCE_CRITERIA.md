# Acceptance Criteria — Education Ministry React SPA

> **Target:** `app.educationministry.org` on Hostinger VPS (`72.62.80.207`)  
> **Stack:** Static React SPA (Babel-in-browser) + Nginx  
> **Cost Target:** $0/month additional (VPS already provisioned)

---

## 1. Site Accessibility

| # | Gate | Pass Criteria | How to Verify |
|---|------|---------------|---------------|
| 1.1 | Domain resolves | `app.educationministry.org` returns HTTP 200 | `curl -sI https://app.educationministry.org` |
| 1.2 | HTTPS/SSL valid | Valid Let's Encrypt cert, no browser warnings | `echo | openssl s_client -connect app.educationministry.org:443 2>/dev/null | openssl x509 -noout -dates` |
| 1.3 | HTTP→HTTPS redirect | Port 80 redirects 301 to HTTPS | `curl -sI http://app.educationministry.org` shows 301 |
| 1.4 | Page load time | First Contentful Paint < 3 s on 3G | Lighthouse or `curl -w '%{time_total}' -so /dev/null https://app.educationministry.org` |
| 1.5 | No mixed content | All assets load over HTTPS | Browser DevTools → Console (no mixed-content warnings) |

## 2. Page Rendering

| # | Page | Route | Pass Criteria |
|---|------|-------|---------------|
| 2.1 | Home | `/#/` | Hero image loads, headline visible, CTA buttons work |
| 2.2 | About | `/#/about` | Content renders, no blank sections |
| 2.3 | Programs | `/#/programs` | All program cards display |
| 2.4 | Civic Library | `/#/civic-library` | Library content renders |
| 2.5 | Membership | `/#/membership` | Membership tiers display |
| 2.6 | Donate | `/#/donate` | Donation form/info renders |
| 2.7 | Legal pages | `/#/privacy`, `/#/terms` | Content loads, no errors |

## 3. Navigation & Links

| # | Gate | Pass Criteria |
|---|------|---------------|
| 3.1 | Header nav links | All header links navigate to correct pages |
| 3.2 | Footer links | All footer links functional |
| 3.3 | CTA buttons | "Start The Challenge" and "View The Path" navigate correctly |
| 3.4 | Login link | Points to `platform.btpma.org/login` |
| 3.5 | "Begin Free" button | Opens signup modal or navigates correctly |
| 3.6 | Hash routing | Direct URL access to any `/#/page` works (no 404) |
| 3.7 | Browser back/forward | History navigation works correctly |

## 4. Forms & Interactivity

| # | Gate | Pass Criteria |
|---|------|---------------|
| 4.1 | Signup modal | Modal opens, form fields render, validation works |
| 4.2 | Form submission | Signup form POSTs to configured API endpoint |
| 4.3 | Error handling | Network errors show user-friendly message |
| 4.4 | Contact email | Displayed email matches `AppConfig.CONTACT_EMAIL` |

## 5. Technical Quality

| # | Gate | Pass Criteria | How to Verify |
|---|------|---------------|---------------|
| 5.1 | Zero console errors | No JS errors in production | Browser DevTools → Console |
| 5.2 | No debug output | `AppConfig.DEBUG === false` in production | Check console for `[AppConfig]` messages |
| 5.3 | Config system | All values from `config.js`, zero hardcoded URLs in `app.js` | `grep -n 'educationministry' assets/js/app.js` returns nothing |
| 5.4 | Gzip enabled | Nginx serves compressed responses | `curl -sH 'Accept-Encoding: gzip' -I https://app.educationministry.org | grep -i content-encoding` |
| 5.5 | Security headers | X-Frame-Options, X-Content-Type-Options, CSP present | `curl -sI https://app.educationministry.org` |
| 5.6 | Cache headers | Static assets have Cache-Control set | Check response headers for CSS/JS/images |

## 6. Mobile Responsiveness

| # | Gate | Pass Criteria |
|---|------|---------------|
| 6.1 | Mobile layout | Content readable on 375px width (iPhone SE) |
| 6.2 | Tablet layout | Content renders correctly on 768px width (iPad) |
| 6.3 | Desktop layout | Full layout on 1440px+ width |
| 6.4 | Touch targets | Buttons/links have adequate tap area (≥44px) |
| 6.5 | No horizontal scroll | No overflow on any breakpoint |

## 7. Performance Benchmarks

| # | Metric | Target | Tool |
|---|--------|--------|------|
| 7.1 | Time to First Byte (TTFB) | < 500ms | Lighthouse |
| 7.2 | First Contentful Paint (FCP) | < 2s | Lighthouse |
| 7.3 | Largest Contentful Paint (LCP) | < 3s | Lighthouse |
| 7.4 | Total page weight | < 10MB (hero image is large) | DevTools → Network |
| 7.5 | Lighthouse Performance score | ≥ 70 | Lighthouse |
| 7.6 | Lighthouse Accessibility score | ≥ 80 | Lighthouse |

## 8. Infrastructure & DevOps

| # | Gate | Pass Criteria |
|---|------|---------------|
| 8.1 | CI/CD pipeline | GitHub Actions deploys on push to `main` |
| 8.2 | Rollback works | `rollback.sh` reverts to previous release |
| 8.3 | Health check | `health-check.sh` returns pass/fail status |
| 8.4 | SSL auto-renewal | Certbot cron/timer configured for Let's Encrypt |
| 8.5 | Nginx starts on boot | `systemctl is-enabled nginx` returns `enabled` |

## 9. Monitoring (Free Tools)

| # | Gate | Pass Criteria |
|---|------|---------------|
| 9.1 | Uptime monitoring | UptimeRobot or similar free service configured |
| 9.2 | SSL expiry monitoring | Alert before cert expires |
| 9.3 | Error logging | Nginx error log accessible at `/var/log/nginx/` |

## 10. Cost Verification

| # | Gate | Pass Criteria |
|---|------|---------------|
| 10.1 | Zero additional monthly costs | No paid services beyond existing VPS |
| 10.2 | Free SSL | Let's Encrypt (free) |
| 10.3 | Free monitoring | UptimeRobot free tier or equivalent |
| 10.4 | Free CI/CD | GitHub Actions free tier |
| 10.5 | Free DNS | Hostinger DNS or Cloudflare free tier |

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Developer | | | ☐ Approved |
| Project Lead | | | ☐ Approved |

> **All 10 sections must pass before the site is considered production-ready.**
