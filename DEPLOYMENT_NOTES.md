# Deployment Documentation for CodeSpring

**Deployment Date:** March 25, 2026 02:49 UTC  
**Deployed By:** BT Education Ministry Team  
**Status:** ✅ Successfully Deployed

---

## 🎯 Deployment Summary

WordPress site has been successfully pushed to GitHub staging branch and deployed to Hostinger VPS production environment.

### GitHub Repository
- **Repository:** https://github.com/bteducationministry/education-ministry-org
- **Branch:** `staging`
- **Latest Commit:** `29902ad - Add database backup for deployment (252K)`
- **Visibility:** Private (CodeSpring has access)

### Production Environment
- **Server:** Hostinger VPS
- **IP Address:** 72.62.80.207
- **WordPress Directory:** `/var/www/educationministry.org`
- **Web Server:** Apache/Nginx
- **PHP Version:** 8.x

---

## 📦 What Was Deployed

### 1. WordPress Core Files
- Complete WordPress installation (latest version)
- All core files and directories
- `.htaccess` configuration

### 2. Custom Theme
- **Theme Name:** BT Education Ministry
- **Location:** `wp-content/themes/bt-education-ministry/`
- Fully customized theme for education ministry

### 3. Plugins (6 installed)
- All active plugins deployed
- Plugin configurations preserved

### 4. Database Backup
- **File:** `database-backup.sql.gz` (252KB compressed)
- **Original Database:** `bt_education_local`
- **Location in Repo:** Root directory
- **Note:** Database import to production should be done manually to avoid data loss

### 5. Configuration Files
- `wp-config.php` (production version)
- Environment-specific settings
- Database credentials configured for production

---

## 🔐 Access Information for CodeSpring

### GitHub Access
1. **Repository URL:** https://github.com/bteducationministry/education-ministry-org
2. **Branch to Review:** `staging`
3. **Clone Command:**
   ```bash
   git clone -b staging https://github.com/bteducationministry/education-ministry-org.git
   ```

### VPS SSH Access
- **Host:** 72.62.80.207
- **User:** root
- **Password:** @Trustee23//
- **WordPress Path:** `/var/www/educationministry.org`

**SSH Command:**
```bash
ssh root@72.62.80.207
cd /var/www/educationministry.org
```

---

## 📋 Deployment Process Used

### Phase 1: Local Repository Preparation
1. Initialized git repository in local WordPress directory
2. Configured git identity (BT Education Ministry)
3. Staged all WordPress files (core, theme, plugins, config)

### Phase 2: Push to GitHub Staging
1. Set up GitHub remote with authentication
2. Created `staging` branch
3. Committed all changes with descriptive message
4. Pushed to GitHub successfully

### Phase 3: Database Export
1. Exported local database (`bt_education_local`)
2. Compressed to 252KB (from 1.3MB)
3. Committed to repository for deployment reference

### Phase 4: VPS Deployment
1. Created backup of existing production files: `/root/wp_backup_20260325_024948.tar.gz`
2. Initialized git on VPS
3. Pulled latest code from GitHub `staging` branch
4. Set proper file permissions (www-data:www-data)
5. Secured wp-config.php (600 permissions)

### Phase 5: Verification
✅ All verification tests passed:
- Git status confirmed
- WordPress core files present
- Proper file permissions set
- Database backup available
- Theme and plugins deployed
- Web server responding (HTTP 301)

---

## 🔧 Technical Details

### File Permissions
- **Directories:** 755
- **Files:** 644
- **wp-config.php:** 600 (secure)
- **Owner:** www-data:www-data

### Backup Information
- **Production Backup:** `/root/wp_backup_20260325_024948.tar.gz`
- **Created:** March 25, 2026 02:49 UTC
- **Contains:** Complete WordPress installation before deployment

### Git Configuration
- **Remote:** origin → https://github.com/bteducationministry/education-ministry-org.git
- **Branch Tracking:** staging → origin/staging
- **Fetch Depth:** 50 commits (lightweight)

---

## 🚀 For CodeSpring: Getting Started

### 1. Clone the Repository
```bash
git clone -b staging https://github.com/bteducationministry/education-ministry-org.git
cd education-ministry-org
```

### 2. Review the Code
- Main theme: `wp-content/themes/bt-education-ministry/`
- Custom plugins: `wp-content/plugins/`
- Configuration: `wp-config.php`

### 3. Access Production Environment
```bash
ssh root@72.62.80.207
cd /var/www/educationministry.org
```

### 4. View Deployment Status
```bash
git log -1 --oneline
git status
```

---

## 📝 Important Notes

### Database Import (If Needed)
The database backup is included in the repository but **NOT automatically imported** to production to prevent data loss.

**To import manually:**
```bash
cd /var/www/educationministry.org
gunzip -c database-backup.sql.gz | mysql -u[username] -p[password] [database_name]
```

### Rollback Procedure
If needed, restore from backup:
```bash
cd /var/www/educationministry.org
tar xzf /root/wp_backup_20260325_024948.tar.gz
```

### Future Deployments
To deploy updates:
```bash
cd /var/www/educationministry.org
git pull origin staging
chown -R www-data:www-data .
```

---

## 📞 Support Contacts

- **Repository Owner:** bteducationministry
- **VPS Provider:** Hostinger
- **Deployment Team:** BT Education Ministry

---

## ✅ Deployment Checklist

- [x] Code pushed to GitHub staging branch
- [x] Database exported and backed up
- [x] Production files backed up
- [x] Code deployed to VPS
- [x] File permissions set correctly
- [x] Web server responding
- [x] Theme and plugins deployed
- [x] Documentation created
- [x] CodeSpring access confirmed

---

**Deployment Status:** ✅ COMPLETE AND VERIFIED

*Generated: March 25, 2026*
