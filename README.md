# Education Ministry — educationministry.org

> **Faith-Grounded Civic Virtue** — The civic education that builds and preserves families across generations, grounded in scripture, hidden in plain view.

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

- **Color Palette:** Deep Dark Purple (`#1a1a2e`), Gold (`#c9a84c`), White/Light Gray (`#faf9f6`)
- **Typography:** Playfair Display (serif headlines), Inter (sans-serif body)
- **Approach:** Clean, minimal, high-trust, mobile-first

## Project Structure

```
education-ministry-org/
├── index.html                  # Main website (React SPA)
├── CNAME                       # Custom domain config (educationministry.org)
├── DEPLOYMENT.md               # DNS & deployment guide
├── assets/
│   ├── images/                 # Hero images, logo, mockups
│   ├── css/                    # Stylesheets
│   └── js/                     # Scripts
├── docs/                       # Design specs & research papers
│   ├── Education Ministry .org - Website Design - Master Skill AI Prompt*.pdf
│   ├── Header Navigation and Hero.pdf
│   └── Declining Civic Engagement*.pdf
└── README.md
```

## Getting Started

This is a static single-page application built with React (via CDN). Simply open `index.html` in a browser or serve it with any static file server:

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx serve .
```

## Technology

- **React 17** (CDN, production build)
- **Babel Standalone** (JSX transformation)
- **Google Fonts** (Playfair Display, Inter)
- **Stripe.js v3** (loaded async, for future payment integration)
- No build step required — opens directly in any modern browser

## Deployment

The site is hosted on **GitHub Pages** with a custom domain.

- **Live URL:** [https://educationministry.org](https://educationministry.org)
- **GitHub Pages:** `bteducationministry.github.io/education-ministry-org`
- **Custom Domain:** Configured via `CNAME` file in the repository root

### Custom Domain Setup

The repository includes a `CNAME` file pointing to `educationministry.org`. For full DNS configuration instructions, see **[DEPLOYMENT.md](DEPLOYMENT.md)**.

#### Required DNS Records

| Type | Name | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `bteducationministry.github.io` |

> DNS propagation may take 24–48 hours. See [DEPLOYMENT.md](DEPLOYMENT.md) for troubleshooting and HTTPS setup.

### Environment Checklist
- [x] Static files deployed (GitHub Pages)
- [x] CNAME file configured for custom domain
- [ ] DNS records configured at domain registrar
- [ ] HTTPS enforced in GitHub Pages settings
- [ ] Custom domain verified and live
- [ ] API endpoints live (`/signup`, `/measure`)
- [ ] Stripe integration completed (see below)

## Stripe Integration (Setup Guide)

Stripe.js is already loaded in `index.html`. To complete the payment integration:

### 1. Get Stripe Keys
- Create a Stripe account at [stripe.com](https://stripe.com)
- Get your **Publishable Key** from the Stripe Dashboard → Developers → API Keys

### 2. Set the Publishable Key
In `assets/js/app.js`, find and update:
```javascript
var STRIPE_PUBLISHABLE_KEY = ""; // ← Add your pk_live_... or pk_test_... key
```

### 3. Create Backend Endpoints
You'll need a server-side endpoint to create Checkout Sessions:

```
POST /api/create-checkout-session
Body: { tier: "operator" | "architect" | "steward" }
Returns: { id: "cs_..." }  // Stripe Checkout Session ID
```

### 4. Create Stripe Products & Prices
In Stripe Dashboard, create:

| Product | Price ID | Amount |
|---------|----------|--------|
| Operator Membership | `price_operator_monthly` | $97/mo |
| Architect Membership | `price_architect_monthly` | $298/mo |
| Steward Membership | `price_steward_monthly` | $599/mo |

### 5. Donations
For the Donate page, options include:
- **Stripe Payment Links** — Quickest setup, no backend needed
- **Stripe Checkout Sessions** — More control, requires backend
- **Stripe Elements** — Embedded form, best UX but most work

### 6. Webhooks
Set up a webhook endpoint to handle:
- `checkout.session.completed` — Activate membership
- `customer.subscription.updated` — Handle tier changes
- `customer.subscription.deleted` — Handle cancellations
- `invoice.payment_failed` — Notify user of failed payment

## Capstone Application

The Capstone Application Form is a multi-step form (3 steps: Personal Info → Estate Details → Goals) for the Estate Trust Directive service. On submission it:

1. **POSTs to `/signup`** — Sends full application data for email notification
2. **POSTs to `/measure`** — Sends event payload to AEMP tracking API

Both endpoints are at `https://api.educationministry.org/`. The form handles errors gracefully and shows success confirmation with next steps.

## License

© 2026 Bodhi Tree Education Ministry. All rights reserved.

---

*"The civic education that builds and preserves families across generations — grounded in scripture, hidden in plain view."*
