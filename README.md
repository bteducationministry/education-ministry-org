# Education Ministry Public Website (educationministry.org)

This repository contains the public-facing WordPress website for BT Education Ministry.

## Repository Structure

```
/
├── wp-content/          # WordPress content (themes, plugins, uploads)
│   ├── themes/          # Custom themes
│   ├── plugins/         # Custom plugins
│   └── uploads/         # Media uploads
├── .github/
│   └── workflows/       # GitHub Actions for CI/CD
├── docs/                # Documentation
└── README.md
```

## Branch Strategy

- `main` - Production branch (deployed to educationministry.org)
- `develop` - Development branch
- `feature/*` - Feature branches for new development

## Environments

- **preview** - Preview deployments for PR reviews
- **staging** - Staging environment for testing
- **production** - Live production site (educationministry.org)

## CodeSpring Integration

This repository is configured for CodeSpring integration with:
- Automated deployments via GitHub Actions
- Branch protection on main and develop
- Required PR reviews before merging
- Environment-specific deployment workflows

## Development

### Prerequisites
- PHP 8.0+
- MySQL 8.0+
- WordPress 6.0+

### Local Setup
```bash
# Clone repository
git clone https://github.com/bteducationministry/education-ministry-org.git

# Set up WordPress
# (Instructions for local WordPress setup)
```

## Deployment

Deployments are automated through GitHub Actions:
- Push to `develop` → deploys to staging
- Push to `main` → deploys to production (requires approval)

## Support

For issues or questions, contact the BT Education Ministry development team.
