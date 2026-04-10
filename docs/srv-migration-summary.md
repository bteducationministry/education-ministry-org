# /srv Migration Summary — April 9, 2026

## Migration Status: ✅ COMPLETE

### Security Cleanup
- **clasa99.php & 123.php**: Already removed (not found during scan)
- **Web shell scan**: No malicious files detected in `/var/www/education-ministry-org/`
- **Status**: Clean

### Backups Created
All backups stored at `/root/backups/pre-srv-migration-20260409/`:
| Backup | Size |
|--------|------|
| education-ministry-org.tar.gz | 7.4M |
| educationministry-org-wp.tar.gz | (WordPress installation) |
| platform-btpma-org.tar.gz | 26M |
| mariadb-all-databases.sql.gz | 630K |
| postgresql-all-databases.sql.gz | 57K |
| nginx-configs.tar.gz | 9.5K |

### /srv Structure
Bootstrap script was already executed. Structure at `/srv/`:
```
/srv/
├── btpma/
├── clients/
├── firm/
├── functions/
├── interfaces/
├── knowledge-vault/
├── ops/
├── platform/
│   ├── app.educationministry.org/    ← React SPA (LIVE)
│   ├── platform.btpma.org/           ← WordPress (LIVE)
│   ├── backups/
│   ├── aemp-dashboard/
│   ├── api/
│   ├── auth/
│   ├── billing/
│   ├── client-portals/
│   └── membership/
└── practices/
```

### Nginx Configuration
Both sites already configured to serve from `/srv/platform/`:
- **educationministry.org** → `root /srv/platform/app.educationministry.org` (SSL active, HTTP/2)
- **app.educationministry.org** → `root /srv/platform/app.educationministry.org` (HTTP, pending SSL)
- **platform.btpma.org** → `root /srv/platform/platform.btpma.org` (HTTP)

### CI/CD Pipeline Updated
- `deploy.yml` updated: `DEPLOY_DIR` changed from `/var/www/education-ministry-org` → `/srv/platform/app.educationministry.org`
- `BACKUP_DIR` changed to `/srv/platform/backups/app.educationministry.org`
- Deployment-package template also updated

### Site Verification
| Site | Status | Protocol |
|------|--------|----------|
| https://educationministry.org | ✅ HTTP 200 | HTTPS (SSL valid) |
| app.educationministry.org (via IP) | ✅ HTTP 200 | HTTP |
| platform.btpma.org | ✅ HTTP 200 (after redirect) | HTTP |
| Nginx config test | ✅ Syntax OK | — |
| PM2 services | ✅ ai-gateway online | — |

### Other Services (Unchanged)
- **AI Gateway**: Running via PM2 on port 8010 (online, 9 days uptime)
- **Docker containers**: 9 active (WordPress staging/test/prod)
- **Databases**: MariaDB and PostgreSQL running

### Rollback Plan
Old files remain at `/var/www/` — if any issues arise:
1. Update Nginx `root` directives back to `/var/www/` paths
2. `nginx -t && systemctl reload nginx`
3. Verify site restoration

### Remaining Items
- [ ] Set up SSL for `app.educationministry.org` subdomain via Let's Encrypt
- [ ] Push CI/CD changes to GitHub remote
- [ ] Clean up old `/var/www/education-ministry-org` after verification period
- [ ] Set up UFW firewall and Fail2Ban (security hardening)
