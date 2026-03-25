# WordPress Database Backup

This directory contains database backups for the Education Ministry WordPress site.

## Current Backup

**File:** `backup_20260325.sql`  
**Date:** March 25, 2026  
**Size:** 156 KB  
**Database:** `bt_education_wp_prod`  
**Server:** educationministry.org (72.62.80.207)

## What's Included

This database backup contains:

- **22 WordPress Pages** (all core pages, funnel pages, and BTPMA platform pages)
- All page content, metadata, and settings
- WordPress configuration and options
- User accounts and permissions
- Theme and plugin settings
- Custom post types and taxonomies

See `page_inventory.md` for a complete list of all pages with their IDs and slugs.

## How to Import

### Using WP-CLI (Recommended)

```bash
# SSH into the server
ssh root@72.62.80.207

# Navigate to WordPress directory
cd /var/www/educationministry.org

# Import the database
wp db import /path/to/backup_20260325.sql --allow-root

# Update URLs if needed (for different domain)
wp search-replace 'oldsite.com' 'newsite.com' --allow-root
```

### Using MySQL Command Line

```bash
# Import directly via MySQL
mysql -u username -p bt_education_wp_prod < backup_20260325.sql
```

### Using phpMyAdmin

1. Log into phpMyAdmin
2. Select the `bt_education_wp_prod` database
3. Click "Import" tab
4. Choose the `backup_20260325.sql` file
5. Click "Go" to import

## Important Notes

⚠️ **Before Importing:**
- Always backup your current database first
- Verify the database name matches your configuration
- Check that all required plugins and themes are installed
- Update `wp-config.php` with correct database credentials

⚠️ **After Importing:**
- Clear WordPress cache
- Regenerate permalinks (Settings → Permalinks → Save)
- Verify all pages are accessible
- Check that media files are properly linked

## Page Structure

The database includes three main page categories:

1. **Core Pages (6):** Home, About, Programs, Membership, Civic Library, Donate
2. **Funnel Pages (7):** Start, Learn, Signup, Welcome, Capstone, Apply, Book Call
3. **BTPMA Platform Pages (7):** Dashboard, Trust Services, Active Projects, Document Vault, Governance Center, Head Steward AI, Account

All pages are published and accessible at: `https://educationministry.org/{slug}/`

## Backup Schedule

Database backups should be created:
- Before major updates or changes
- After adding new content or pages
- Weekly for active development
- Monthly for production sites

## Version History

| Date | File | Size | Notes |
|------|------|------|-------|
| 2026-03-25 | backup_20260325.sql | 156 KB | Initial backup with all 20 core pages + 2 default WP pages |

---

**Last Updated:** March 25, 2026  
**Maintained By:** Education Ministry Development Team
