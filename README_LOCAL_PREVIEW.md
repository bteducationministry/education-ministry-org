# BT Education Ministry - Local Preview Server

## 🎉 Setup Complete!

Your local WordPress preview server is now running and accessible.

---

## 📍 Access Information

### Preview URLs

**Primary Preview URL (for your browser):**
- 🌐 **https://15b2fd835a-3000.preview.abacusai.app**

**Local URLs (within DeepAgent VM browser):**
- 🏠 **http://localhost:3000** - Homepage
- 🔐 **http://localhost:3000/wp-admin** - WordPress Admin Dashboard

### Login Credentials

**WordPress Admin:**
- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@local.test`

**Database:**
- **Database Name:** `bt_education_local`
- **Database User:** `wp_local_user`
- **Database Password:** `wp_local_pass_2026`
- **Database Host:** `localhost`

---

## 📁 File Locations

- **WordPress Root:** `/var/www/html/education-ministry-preview/`
- **Custom Theme:** `/var/www/html/education-ministry-preview/wp-content/themes/bt-education-ministry/`
- **Plugins:** `/var/www/html/education-ministry-preview/wp-content/plugins/`
- **Apache Config:** `/etc/apache2/sites-available/education-preview.conf`
- **Apache Logs:** `/var/log/apache2/education-preview-*.log`

---

## 🎨 Custom Page Templates

The BT Education Ministry theme includes the following custom page templates:

1. **page-account.php** - User account management
2. **page-active-projects.php** - Active projects display
3. **page-apply.php** - Application form
4. **page-book-call.php** - Call booking interface
5. **page-capstone.php** - Capstone project page
6. **page-dashboard.php** - User dashboard
7. **page-document-vault.php** - Document management
8. **page-governance-center.php** - Governance center
9. **page-head-steward-ai.php** - AI steward interface
10. **page-learn.php** - Learning resources
11. **page-signup.php** - User registration
12. **page-start.php** - Getting started page
13. **page-trust-services.php** - Trust services
14. **page-welcome.php** - Welcome page

---

## 🔌 Installed Plugins

### Active Plugins
- **bt-aemp-webhooks** (Must-Use) - Custom webhook functionality
- **bt-membership-restrictions** (Must-Use) - Membership access control

### Available Plugins (Inactive)
- **Kadence Blocks** (v3.6.6) - Advanced Gutenberg blocks
- **Paid Memberships Pro** (v3.6.6) - Membership management
- **WPForms Lite** (v1.10.0.1) - Form builder
- **WP Mail SMTP** (v4.7.1) - Email delivery
- **WP Super Cache** (v3.0.3) - Caching plugin

---

## ✅ Testing Checklist

### Basic Functionality
- [ ] Homepage loads correctly at https://15b2fd835a-3000.preview.abacusai.app
- [ ] WordPress admin accessible at /wp-admin
- [ ] Can log in with admin credentials
- [ ] Theme is active (BT Education Ministry)
- [ ] Database connection working

### Theme Testing
- [ ] Create test pages using custom templates
- [ ] Test page-dashboard.php template
- [ ] Test page-account.php template
- [ ] Test page-learn.php template
- [ ] Test page-apply.php template
- [ ] Verify theme styling loads correctly
- [ ] Check responsive design

### Plugin Testing
- [ ] Activate Kadence Blocks
- [ ] Activate Paid Memberships Pro
- [ ] Test membership restrictions
- [ ] Test webhook functionality
- [ ] Activate WPForms and create test form

### Content Testing
- [ ] Create sample pages
- [ ] Create sample posts
- [ ] Upload media files
- [ ] Test navigation menus
- [ ] Test widgets/sidebars

### Pull Request Testing
- [ ] Test changes from PR #1 (if applicable)
- [ ] Test changes from PR #2 (if applicable)
- [ ] Verify no conflicts with existing functionality
- [ ] Check for PHP errors in debug log

---

## 🛠️ Useful Commands

### WP-CLI Commands (run from WordPress root)

\`\`\`bash
# Navigate to WordPress directory
cd /var/www/html/education-ministry-preview

# List all pages
sudo -u www-data wp post list --post_type=page

# Create a new page
sudo -u www-data wp post create --post_type=page --post_title='Test Page' --post_status=publish

# List all plugins
sudo -u www-data wp plugin list

# Activate a plugin
sudo -u www-data wp plugin activate kadence-blocks

# Deactivate a plugin
sudo -u www-data wp plugin deactivate kadence-blocks

# List all themes
sudo -u www-data wp theme list

# Check database
sudo -u www-data wp db check

# Export database
sudo -u www-data wp db export /tmp/backup.sql

# Search and replace URLs (if needed)
sudo -u www-data wp search-replace 'old-url.com' 'localhost:3000'

# Clear cache
sudo -u www-data wp cache flush

# Get WordPress version
sudo -u www-data wp core version

# List all users
sudo -u www-data wp user list
\`\`\`

### Apache Commands

\`\`\`bash
# Restart Apache
sudo service apache2 restart

# Check Apache status
sudo service apache2 status

# Test Apache configuration
sudo apache2ctl configtest

# View error logs
sudo tail -f /var/log/apache2/education-preview-error.log

# View access logs
sudo tail -f /var/log/apache2/education-preview-access.log
\`\`\`

### Database Commands

\`\`\`bash
# Access MySQL
sudo mysql

# Access specific database
sudo mysql bt_education_local

# Export database
sudo mysqldump bt_education_local > /tmp/backup.sql

# Import database
sudo mysql bt_education_local < /tmp/backup.sql
\`\`\`

---

## 🔧 Troubleshooting

### Site Not Loading

1. Check if Apache is running:
   \`\`\`bash
   sudo service apache2 status
   \`\`\`

2. Check if Apache is listening on port 3000:
   \`\`\`bash
   sudo netstat -tlnp | grep :3000
   \`\`\`

3. Check Apache error logs:
   \`\`\`bash
   sudo tail -50 /var/log/apache2/education-preview-error.log
   \`\`\`

### Database Connection Errors

1. Check if MariaDB is running:
   \`\`\`bash
   sudo service mariadb status
   \`\`\`

2. Test database connection:
   \`\`\`bash
   sudo mysql -u wp_local_user -p'wp_local_pass_2026' bt_education_local -e "SHOW TABLES;"
   \`\`\`

3. Verify wp-config.php credentials:
   \`\`\`bash
   grep "DB_" /var/www/html/education-ministry-preview/wp-config.php
   \`\`\`

### Permission Issues

1. Fix file ownership:
   \`\`\`bash
   sudo chown -R www-data:www-data /var/www/html/education-ministry-preview
   \`\`\`

2. Fix file permissions:
   \`\`\`bash
   sudo find /var/www/html/education-ministry-preview -type d -exec chmod 755 {} \;
   sudo find /var/www/html/education-ministry-preview -type f -exec chmod 644 {} \;
   \`\`\`

### White Screen / PHP Errors

1. Enable WordPress debugging (already enabled in wp-config.php)

2. Check debug log:
   \`\`\`bash
   sudo tail -f /var/www/html/education-ministry-preview/wp-content/debug.log
   \`\`\`

3. Check PHP error log:
   \`\`\`bash
   sudo tail -f /var/log/apache2/education-preview-error.log
   \`\`\`

---

## 🔄 Updating from GitHub

To pull latest changes from the repository:

\`\`\`bash
# Navigate to the cloned repo
cd /home/ubuntu/github_repos/education-ministry-org

# Pull latest changes
git pull origin main

# Copy updated files to web directory
sudo rsync -av --exclude='.git' --exclude='wp-config.php' /home/ubuntu/github_repos/education-ministry-org/ /var/www/html/education-ministry-preview/

# Fix permissions
sudo chown -R www-data:www-data /var/www/html/education-ministry-preview
\`\`\`

---

## 🛑 Stopping Services

To stop the preview server:

\`\`\`bash
# Stop Apache
sudo service apache2 stop

# Stop MariaDB
sudo service mariadb stop
\`\`\`

To start services again:

\`\`\`bash
# Start MariaDB
sudo service mariadb start

# Start Apache
sudo service apache2 start
\`\`\`

---

## 📝 Notes

- **Fresh Installation:** This is a fresh WordPress installation with the theme and plugins from the repository. No production data has been imported.
- **Production Config Backup:** The original production wp-config.php has been backed up as \`wp-config.php.production.bak\`
- **Debug Mode:** WordPress debug mode is enabled. Check \`/var/www/html/education-ministry-preview/wp-content/debug.log\` for errors.
- **VM Lifecycle:** This server runs on the DeepAgent VM and will stop when the VM becomes inactive.
- **Preview URL:** The preview URL (https://15b2fd835a-3000.preview.abacusai.app) is tied to the VM lifecycle.

---

## 🎯 Next Steps

1. **Access the site** at https://15b2fd835a-3000.preview.abacusai.app
2. **Log in to admin** at https://15b2fd835a-3000.preview.abacusai.app/wp-admin
3. **Create test pages** using the custom page templates
4. **Test pull request changes** by checking out the PR branch and updating files
5. **Review and verify** all functionality before merging PRs

---

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review Apache error logs
- Review WordPress debug log
- Check database connectivity

---

**Setup Date:** March 25, 2026  
**WordPress Version:** 6.9.4  
**PHP Version:** 8.2.30  
**Database:** MariaDB 10.11.14  
**Web Server:** Apache 2.4.66
