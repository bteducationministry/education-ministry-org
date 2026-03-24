# Education Ministry WordPress Site

Complete WordPress installation for https://educationministry.org/

## Repository Structure

```
/
├── wp-admin/              # WordPress admin core
├── wp-includes/           # WordPress core includes
├── wp-content/
│   ├── themes/
│   │   └── bt-education-ministry/  # Custom theme
│   ├── plugins/           # Installed plugins
│   │   ├── kadence-blocks/
│   │   ├── paid-memberships-pro/
│   │   ├── wp-mail-smtp/
│   │   ├── wp-super-cache/
│   │   └── wpforms-lite/
├── wp-config.php          # WordPress configuration
└── .htaccess              # Apache configuration
```

## Excluded from Repository

Via `.gitignore`:
- `wp-content/uploads/` - Media uploads (64K on server)
- `wp-content/cache/` - Cache files
- Log files and temporary files

## Server Details

- **VPS**: 72.62.80.207
- **Path**: /var/www/educationministry.org
- **Domain**: https://educationministry.org/
- **Total Size**: 226M

## Branches

- **main** - Production code
- **develop** - Development branch

## Plugins Included

1. **kadence-blocks** - Block editor enhancements
2. **paid-memberships-pro** - Membership management
3. **wp-mail-smtp** - Email delivery
4. **wp-super-cache** - Caching
5. **wpforms-lite** - Form builder

## Last Sync

Date: $(date)
Synced from VPS to GitHub
