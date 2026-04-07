# Education Ministry — React SPA (app.educationministry.org)

> **Faith-Grounded Civic Virtue** — The civic education that builds and preserves families across generations, grounded in scripture, hidden in plain view.

## Architecture

This project uses a **dual-platform architecture**:

| Platform | Domain | Purpose |
|----------|--------|---------|
| **WordPress** | `educationministry.org` | Main site — content management, blog, SEO pages |
| **React SPA** | `app.educationministry.org` | Member portal — applications, interactive features, membership |

This repository contains the **React SPA** deployed to the `app` subdomain via GitHub Pages.

## About

Education Ministry is a **508(c)(1)(a) nonprofit** faith-based civic education platform operated by Bodhi Tree Education Ministry. The platform delivers a structured progression system designed to cultivate civic virtue through scriptural foundations:

| Level | Title | Focus |
|-------|-------|-------|
| 1 | **Seeker** | Foundational civic & scriptural literacy |
| 2 | **Operator** | Applied civic engagement skills |
| 3 | **Architect** | Systems-level civic design |
| 4 | **Steward** | Leadership & mentorship |
| 5 | **Capstone** | Legacy & institutional stewardship |

### Key Programs

- **Young Civic Engagement Challenge** — Entry-level program for youth civic participation
- **Applied Education Ministry Project (AEMP)** — Hands-on community application of civic principles
- **Civil Library** — Curated resources on civic virtue, constitutional foundations, and faith-based governance

## Design System

- **Color Palette:** Deep Dark Purple (`#2d1b4e`), Gold (`#c9a84c`), White/Light Gray (`#faf9f6`)
- **Typography:** Playfair Display (serif headlines), Inter (sans-serif body)
- **Approach:** Clean, minimal, high-trust, mobile-first

## Project Structure

```
education-ministry-org/
├── index.html                  # SPA entry point
├── CNAME                       # GitHub Pages subdomain (app.educationministry.org)
├── DEPLOYMENT.md               # DNS & deployment guide
├── README.md                   # This file
├── assets/
│   ├── css/
│   │   └── main.css            # Global styles
│   ├── js/
│   │   ├── config.js           # Environment-aware configuration
│   │   └── app.js              # React application
│   └── images/
│       ├── bodhi-tree-logo-header.png
│       └── vFinal Heritage Bodhi Tree Hero Image Only.png
└── docs/                       # Design specs & reference materials
    ├── Education Ministry .org - Website Design - Master Skill AI Prompt*.pdf
    ├── Header Navigation and Hero.pdf
    ├── Hero Content Mockup and Header Menu Navigation.png
    └── Declining Civic Engagement*.pdf
```

## Getting Started

This is a static single-page application built with React (via CDN). No build step required.

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .
```

Open `http://localhost:8000` in your browser. The configuration system will auto-detect the `development` environment.

## Configuration

All configurable values are centralized in `assets/js/config.js`. The system auto-detects the environment based on hostname:

| Environment | Hostname Pattern | API Base URL |
|-------------|-----------------|--------------|
| **production** | `app.educationministry.org` | `https://api.educationministry.org` |
| **staging** | `staging-app.*` | `https://staging-api.educationministry.org` |
| **development** | `localhost` / `127.0.0.1` | `http://localhost:3001` |

### Configurable Values

- `API_BASE_URL` — Backend API base URL
- `APP_DOMAIN` — Current app domain
- `MAIN_SITE_URL` — WordPress main site URL
- `PLATFORM_LOGIN_URL` — External login platform URL
- `CONTACT_EMAIL` — Support contact email
- `STRIPE_PUBLISHABLE_KEY` — Stripe key (empty until integration)
- `COPYRIGHT_YEAR` — Footer copyright year
- `ORG_NAME` / `ORG_LEGAL` / `ORG_DOMAIN` — Organization identifiers
- `DEBUG` — Enables verbose logging (auto-on in dev/staging)

### Manual Environment Override

Set `window.__ENV__` before config.js loads to force an environment:

```html
<script>window.__ENV__ = "staging";</script>
<script src="assets/js/config.js"></script>
```

## Technology

- **React 17** (CDN, production build)
- **Babel Standalone** (JSX transformation)
- **Google Fonts** (Playfair Display, Inter)
- **Stripe.js v3** (loaded async, for future payment integration)
- No build step — opens directly in any modern browser

## Deployment

### Live Setup

- **GitHub Pages:** `bteducationministry.github.io/education-ministry-org`
- **Subdomain:** `app.educationministry.org` (configured via `CNAME` file)
- **Main site:** WordPress at `educationministry.org`

For complete DNS and deployment instructions, see **[DEPLOYMENT.md](DEPLOYMENT.md)**.

### Environment Checklist

- [x] Static files deployed (GitHub Pages)
- [x] CNAME configured for `app.educationministry.org`
- [x] Environment-aware configuration system
- [ ] DNS CNAME record: `app` → `bteducationministry.github.io`
- [ ] HTTPS enforced in GitHub Pages settings
- [ ] API endpoints live (`/signup`, `/measure`)
- [ ] Stripe publishable key set in `config.js`

## Stripe Integration

Stripe.js is loaded in `index.html`. To activate payments:

1. Set `STRIPE_PUBLISHABLE_KEY` in `assets/js/config.js` (production config)
2. Create backend endpoints for Checkout Sessions
3. Create Stripe Products & Prices (Operator $97/mo, Architect $298/mo, Steward $599/mo)
4. Set up webhooks for subscription lifecycle events

See the Stripe integration comments in `app.js` for detailed implementation notes.

## Maintenance

### Updating Configuration

Edit `assets/js/config.js` — all environment-specific values are in one place. No need to search through `app.js`.

### Adding New Pages

1. Add route handling in the hash router section of `app.js`
2. Create the page component
3. Add navigation entry to `navItems` array

### Updating Content

Content is defined as data structures at the top of `app.js` (personas, pillars, membership tiers, etc.). Update the data objects to change content without touching component logic.

## License

© 2026 Bodhi Tree Education Ministry. All rights reserved.
