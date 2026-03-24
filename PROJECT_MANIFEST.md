# BT Education Ministry — Project Manifest
## educationministry.org | Standalone WordPress Deployment

---

## Platform Architecture — Separated Tranches

This project is **one of three independent deployable platforms** that comprise the BT Education Ministry ecosystem. Each is maintained, versioned, and deployed independently for maximum control and ease of access to each codebase.

### Tranche 1: educationministry.org ← THIS REPOSITORY
| Field | Value |
|---|---|
| **Purpose** | Public marketing website, membership signups, donation processing, content pages |
| **Stack** | WordPress + Gutenberg + Custom Theme |
| **Domain** | `educationministry.org` |
| **Hosting** | Hostinger VPS |
| **Repository** | `/home/ubuntu/bt_education_ministry_wordpress/` |

### Tranche 2: platform.btpma.org (SEPARATE DEPLOYMENT)
| Field | Value |
|---|---|
| **Purpose** | LMS, Member Portal, Head Steward AI |
| **Endpoints** | `/educate/`, `/member-portal/`, `/head-steward-ai/` |
| **Domain** | `platform.btpma.org` |
| **Status** | Separate codebase — deploy independently |

### Tranche 3: aemp-dashboard.btpma.org (SEPARATE DEPLOYMENT)
| Field | Value |
|---|---|
| **Purpose** | Analytics dashboard, Knowledge Vault, AEMP Measure API |
| **Endpoints** | `/measure` (event ingestion), `/knowledge-vault` |
| **Domain** | `aemp-dashboard.btpma.org` |
| **Status** | Separate codebase — deploy independently |

### Integration Points Between Tranches
```
educationministry.org  ──────────────────────────────────────►  platform.btpma.org
  (CTA buttons/links)    "Access LMS"                             /educate/
                          "Member Dashboard"                       /member-portal/
                          "Access Head Steward"                    /head-steward-ai/

educationministry.org  ──────────────────────────────────────►  aemp-dashboard.btpma.org
  (JS analytics script)   POST events to /measure                  /measure
  (CTA button)            "Access Full Library"                    /knowledge-vault

educationministry.org  ──────────────────────────────────────►  Stripe
  (PMPro plugin)          Checkout/subscription management         stripe.com
```

---

## This Repository Structure

```
bt_education_ministry_wordpress/
├── wp-admin/                          # WordPress core (standard)
├── wp-includes/                       # WordPress core (standard)
├── wp-content/
│   ├── themes/
│   │   └── bt-education-ministry/     # ★ CUSTOM THEME (all design system)
│   │       ├── style.css              # Theme metadata
│   │       ├── theme.json             # Block theme config (colors, fonts, spacing)
│   │       ├── functions.php          # Theme setup, enqueues, PMPro config
│   │       ├── screenshot.png         # Theme thumbnail
│   │       ├── templates/             # Block templates (index, page, front-page, funnel)
│   │       ├── parts/                 # Template parts (header, footer)
│   │       ├── patterns/              # Gutenberg block patterns
│   │       ├── inc/                   # PHP includes (template-functions, customizer)
│   │       └── assets/
│   │           ├── css/
│   │           │   ├── main.css       # ★ Complete design system CSS
│   │           │   └── editor-style.css
│   │           ├── js/
│   │           │   ├── aemp-analytics.js  # ★ AEMP event tracking (40+ events)
│   │           │   └── main.js            # Mobile menu, filters, interactions
│   │           └── images/
│   ├── plugins/
│   │   ├── kadence-blocks/            # Block editor enhancements
│   │   ├── paid-memberships-pro/      # Membership management + Stripe
│   │   └── wpforms-lite/              # Form builder
│   └── uploads/                       # Media library
├── wp-config.php                      # Database + site configuration
├── deployment/                        # ★ DEPLOYMENT PACKAGE
│   ├── DEPLOYMENT_GUIDE.md            # Step-by-step Hostinger VPS deployment
│   ├── bt-education-ministry-export.xml  # WordPress XML content export
│   └── bt_education_wp.sql            # Full database dump
├── PROJECT_MANIFEST.md                # ★ THIS FILE
└── .gitignore                         # Git ignore rules
```

---

## Pages (16 total)

### Core Pages (6)
| Page | Slug | Purpose |
|---|---|---|
| Home | `/` | Hero, trust bar, Offer 0, programs, membership preview, LMS/AI preview, testimonials, CTA |
| About | `/about/` | Mission, who we serve, how it works, authority |
| Programs | `/programs/` | YCEC, AEMP, competency ladder, capstone |
| Membership | `/membership/` | 4 pricing tiers, competency shift, capstone |
| Civic Library | `/civic-library/` | Resource grid, search/filter, locked content |
| Donate | `/donate/` | Impact, donation tiers, contact |

### Offer 0 Funnel (4)
| Page | Slug | Purpose |
|---|---|---|
| Start | `/start/` | Landing with benefits, trust strip |
| Learn | `/learn/` | Education overview cards |
| Signup | `/access/` | Account creation form |
| Welcome | `/welcome/` | Confirmation + redirect to LMS |

### Capstone Funnel (3)
| Page | Slug | Purpose |
|---|---|---|
| Capstone | `/capstone/` | ETD positioning |
| Apply | `/apply/` | Qualification form |
| Book Call | `/book-call/` | Calendly embed |

### System Pages (3)
| Page | Slug | Purpose |
|---|---|---|
| Checkout | `/checkout/` | PMPro Stripe checkout |
| Confirmation | `/confirmation/` | Post-purchase confirmation |
| Account | `/account/` | Member account management |

---

## Design System

| Token | Value |
|---|---|
| Primary Color | `#1A0F2E` (Deep Dark Purple) |
| Accent Color | `#C8A951` (Gold) |
| Background | `#F7F7F7` / `#FFFFFF` |
| Text Primary | `#111111` |
| Text Secondary | `#666666` |
| Heading Font | Playfair Display (serif) |
| Body Font | Inter (sans-serif) |
| Spacing System | 8pt: 4, 8, 16, 24, 32, 48, 64, 80, 96 |
| Grid | 12-column, 1200px content, 24px gutter |
| Button Radius | 12px |
| Card Radius | 16px |

---

## Membership Tiers

| Tier | Price | PMPro Level ID |
|---|---|---|
| Seeker | Free | 1 |
| Operator | $111/month | 2 |
| Architect | $222/month | 3 |
| Steward | $1,111/month | 4 |

---

## AEMP Analytics Events (40+ tracked)

All events sent via `aemp-analytics.js` to `https://aemp-dashboard.btpma.org/measure`

Categories: `page`, `cta`, `form`, `commerce`, `engagement`, `booking`

See full event catalog in the build specification document.

---

## Deployment Notes

- **Stripe keys** are set to test mode placeholders — replace with live keys before go-live
- **Admin credentials** must be changed on first production login
- **AEMP endpoint** assumes `aemp-dashboard.btpma.org` is live and accepting events
- **External platform links** assume `platform.btpma.org` is deployed and operational
- **Calendly** embed on `/book-call/` needs actual Calendly URL configured

---

*Last updated: March 2026*
