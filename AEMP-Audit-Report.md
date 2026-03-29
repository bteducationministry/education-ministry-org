# AEMP Platform Audit Report

## Overview

This report consolidates findings from the server audit of these domains:
- https://aemp-dashboard.btpma.org/
- https://aemp-dashboard.btpma.org/knowledge-vault/
- https://platform.btpma.org/
- https://educationministry.org/
- https://btpma.org/

It includes:
1. Inventory of architecture, services, routing
2. Individual domain status and critical issues
3. Holistic recommendations for cleanup and debt elimination
4. Functional cleanup planning (proceed/alert/approval)
5. Sprint ticket backlog for execution (high to mid to low priority)

---

## 1. Infrastructure Inventory (as discovered)

### Server and access
- VPS host: `srv1203977` (Hostinger)
- Access: Root SSH with key (`copilot_deploy_key`), existing password access available
- Source-of-truth files in `/etc/nginx/sites-available` + `sites-enabled`
- Web roots under `/var/www`: aemp, platform.btpma.org, educationministry.org, btpma and proxies

### Reverse proxy and service topology
- system `nginx` installed and failing due to bind conflicts (because Docker proxies own 80/443)
- Docker port bindings:
  - 80: docker-proxy (PID 849402)
  - 443: docker-proxy (PID 849414)
  - 8080, 8081 also in use by proxies
  - 3000: Node/Next.js server (aemp-dashboard)
- `docker ps` reveals:
  - `prod-nginx-1`, `prod-wordpress-1`, `prod-platform_wp-1`, `prod-db-1`
  - `btpma-test-*`, `btpma-staging-*` (for test/stage)

### Application framework
- AEMP dashboard: Next.js run through PM2 (`aemp-dashboard`) and direct `next-server` process
- Platform likely routing to same service (currently same Next site, but under different host)
- Education Ministry: WordPress PHP site with standalone plan via `/var/www/educationministry.org` and SSL certs in `/etc/letsencrypt`

### DNS routing, proxies and internal URLs
- Host file has domain-specific Nginx coverage:
  - `aemp-dashboard.btpma.org` -> reverse proxy to 127.0.0.1:3000
  - `platform.btpma.org` -> WP under /var/www/platform.btpma.org
  - `educationministry.org` -> WP under /var/www/educationministry.org (HTTPS)
  - `btpma.org` currently likely points into Next app as aemp-dashboard

---

## 2. Consolidated status by domain

### 2.1 AEMP Dashboard
- Path: https://aemp-dashboard.btpma.org/
- Result: 301->https, 200 with Next.js response
- Sub-path: /knowledge-vault/ 301->200 successful
- Backend: Next.js, server on `127.0.0.1:3000`, served by docker-nginx proxy

#### Observations
- app is up and functional for basic route checks
- JavaScript assets and `next-router` hints exist (good)
- No explicit 404/500 behaviour in sampled endpoint

#### Potential issues
- Quick login endpoint and auth sessions should be checked
- API stability for team automation is not assessed yet (needs full functional test plan)

### 2.2 Platform
- Path: https://platform.btpma.org/
- Result: 301->https, 200 (same Next.js response as dashboard)
- Config: /etc/nginx/sites-available/platform.btpma.org with WordPress paths, but runtime goes to Next (possibly due to Docker composite rule)

#### Observations
- domain resolves, but if it should be distinct from AEMP, verify the app code path is mapping correctly

### 2.3 Education Ministry
- Path: https://educationministry.org/
- Result: 301->https, 500 (error)
- Config: strength target with strict headers, static root, php-fpm at /var/run/php/php8.1-fpm.sock

#### Observations
- key issue: currently failing backend with HTTP 500
- Logs in host nginx were empty, because traffic sent through docker proxy, actual WP errors likely in container logs
- 500 indicates bug in WP theme/plugin or DB issue -> immediate fix needed

### 2.4 BTPMA
- Path: https://btpma.org/
- Result: 301->https, 200 same Next.js response as dashboard
- The `btpma` site file is empty, likely legacy or placeholder

#### Observations
- Should either route to IAS application or be removed if unneeded to remove confusion

---

## 3. Holistic architecture recommendations

### 3.1 Consolidate routing
- Pick one proxy layer, not both system nginx+docker-nginx simultaneously
- The live stack is Docker-coupled. Keep Docker proxy and disable system nginx:
  - `systemctl disable --now nginx`
- Ensure `/etc/nginx/sites-available` matches container routes exactly
- Remove empty/unused configs (`btpma`, default if replaced)

### 3.2 Standardize SSL and security
- In all host configs, enforce:
  - `ssl_protocols TLSv1.2 TLSv1.3`
  - `ssl_prefer_server_ciphers on`
  - headers: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`
- Ensure certs are auto-renewing via Certbot and `cron` hook
to reload nginx/docker proxy

### 3.3 Remove hard-coded fallbacks / stale code
- Clean `platform.btpma.org` config to a single resolved behavior (Next vs WP)
- If `platform` is truly WP, ensure Docker placement and DB containers align; otherwise move to Next codebase and remove WP configs
- Standardize environment variables via `.env` in one place and avoid config duplication

### 3.4 Make AEMP platform cloud-scale ready
- Migrate from PM2 local to Docker service or Kubernetes pod (same containerization strategy as other stack services)
- Keep a dedicated `aemp` service with health checks:
  - `/health` returns 200
  - readiness probe for API DB connectivity
- Use a micro-segmentation by functionality:
  - dashboard app
  - user management api
  - knowledge vault routes (if separate backend)

### 3.5 Performance and accessibility entry point
- Build a preflight script for each domain:
  - `curl` checks + header checks + HTTPS redirect + content match
- Run Lighthouse on each domain with automated report output:
  - `lighthouse --output=json --output-path=... <url>`
- For the mentioned Core Web Vitals and SEO metrics, measure and budget improvements.

---

## 4. Functional cleanup characterization (proceed/alert/approval)

### 4.1 Current decision state
- **Proceed**: AEMP dashboard and platform route are stable (200). We can move ahead to functional tests and audits.
- **Alert**: educationministry.org currently fails with 500, blocking full cross-domain readiness.
- **Approve**: clean-up of proxy workloads and route/SSL hardening should go ahead before heavy scaling.

### 4.2 Recommended mechanics
- Step 1: `educationministry.org` should be diagnosed first (WP fatal) to achieve 100% environment stability.
- Step 2: designate `aemp-dashboard` as primary API for AI team automation; confirm `knowledge-vault` as data source.
- Step 3: set ### 4.2 Recommended mechanics
- Step 1: `educationministry.org` should be diagnosed first (WP fatal) to achieve 100% environment stability.
- Step 2: designate `aemp-dashboard` as primary API for AI team automation; confirm `knowledge-vault` as data source.
- Step 3: set a deployment gate: no more than two active proxies for 80/443; promote `docker-nginx` as canonical.

---

## 5. Cleanup plan and tech debt elimination

### 5.1 Host control-plane cleanup
1. Disable system nginx (or move to unused port if needed for non-public internal site).
2. Remove zero-byte `/etc/nginx/sites-available/btpma` and ensure `/etc/nginx/sites-enabled` only has live maps.
3. Consolidate all SSL and headers to a shared include (for consistency):
```nginx
include /etc/nginx/snippets/security-headers.conf;
```

### 5.2 Docker/compose review
- `find / -name docker-compose.yml -o -name docker-compose.yaml` to reconcile multiple stacks.
- Standardize to one compose file per environment:
  - `docker-compose.prod.yml`, `docker-compose.staging.yml`.
- Ensure all containers have explicit restart policy and healthChecks.

### 5.3 App logs & monitoring
- Attach log collector (e.g., `fluentd` -> AWS CloudWatch or `Loki`):
  - `docker logs` should be archived, not overwritten.
- Add standard `healthz` and `readyz` endpoints:
  - `GET /healthz` in Next.js app should check Node process and DB.
  - `GET /ready` should verify all dependencies.

---

## 6. Sprint backlog (recommendation)

### Sprint A (7-10 days) - Stabilize live environment
1. **Issue 1: Emergency fix for educationministry.org 500** (priority: critical)
   - Action:
     - fetch WP error from `prod-wordpress-1` logs.
     - fix theme/plugin conflict or DB credentials.
   - Acceptance:
     - homepage returns 200 with expected template and 0 PHP fatal and 0 DB errors.

2. **Issue 2: Remove host nginx bind conflict** (priority: high)
   - Action:
     - stop host nginx; confirm Docker proxy handles 80/443.
   - Acceptance:
     - `ss -ltnp` shows only docker-proxy on 80/443; host nginx inactive.

3. **Issue 3: Harden AEMP proxy config** (priority: high)
   - Action:
     - ensure `aemp-dashboard` site includes strict headers+HSTS and `proxy_set_header X-Forwarded-For`.
   - Acceptance:
     - page header includes required security headers.

4. **Issue 4: Add health endpoints and smoke tests for all domains** (priority: medium)
   - Action:
     - add Next.js API route `/api/health` and set to route in Nginx.
     - add Postman/Newman collection.
   - Acceptance:
     - CI passes all smoke tests.

### Sprint B (next 7-10 days) - Platform functionality and design
1. **Issue 5: Domain separation and canonical mapping**
   - aemp-dashboard.btpma.org -> AEMP Next app
   - platform.btpma.org -> target app (WP vs Next, clarify)
   - btpma.org -> should be either AEMP or separate site.

2. **Issue 6: Visual design audit + brand token alignment**
   - Action:
     - compare live CSS tokens vs `brand-guidelines`.
     - adjust global style variables in `aemp` theme and WP theme.
   - Acceptance:
     - fonts: Playfair Display headings, Inter body; colors match: `#1A0F2E` and `#C8A951`.

3. **Issue 7: Lighthouse automation**
   - Action:
     - add script in repo for `lighthouse-ci`: `npx lhci autorun --urls ...`.
   - Acceptance:
     - performance score >= 90, accessibility >= 90, best practices >= 90, SEO >= 95.

4. **Issue 8: Merge tech debt and deprecate stale routes**
   - remove old/unused site file for `btpma`, remove old differences.

---

## 7. AI-team functional target & automation enablement

### AEMP KPIs
- feature toggles for:
  - `analytics` (event capturing from dashboard usage)
  - `knowledge-vault` ingestion (PDF/MD content + search indexing)
  - `task automation` (flow steps to produce functions)

### Minimal functional requirement for AI workflows
1. `GET /api/user` auth token (OAUTH cookie) 200
2. `GET /api/workspaces` returns present filter data
3. `POST /api/task` for workflow item creation
4. `GET /knowledge-vault` active resources + content matrix

---

## 8. Go/no-go checklist

- [ ] educationministry.org repaired (200)
- [ ] port conflict resolved in proxy architecture
- [ ] AEMP base route stable with smoke tests
- [ ] security headers present for all domains
- [ ] CI has Lighthouse and accessibility baseline
- [ ] Dev-task board created with issues from above

---

## 9. Suggested next actions

1. Confirm this report as baseline.
2. Approve immediate triage items 1-3.
3. Generate ticketing in issue tracker (sample block below).

### 9.1 Generate issue list
```bash
cat <<'EOF' > /tmp/aemp_audit_issues.md
- [ ] Emergency: Fix WP 500 on educationministry.org
- [ ] Disable host nginx/reconcile docker proxy on 80/443
- [ ] Harden headers for aemp-dashboard and platform
- [ ] Add /health and /ready endpoints for AEMP and platform
- [ ] Lighthouse CI for all domains
