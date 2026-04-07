# Architecture — Education Ministry Platform

This document describes the overall architecture of the Education Ministry digital platform, how its components interact, and guidelines for future development.

---

## Platform Overview

The platform consists of three main components:

```
┌─────────────────────────────────────────────────────────────┐
│                    educationministry.org                     │
│                                                             │
│  ┌─────────────────┐  ┌──────────────────┐  ┌───────────┐  │
│  │   WordPress     │  │   React SPA      │  │  Backend  │  │
│  │   Main Site     │  │   Member Portal  │  │    API    │  │
│  │                 │  │                  │  │           │  │
│  │  @ / www        │  │  app.*           │  │  api.*    │  │
│  └─────────────────┘  └──────────────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────────┘
```

| Component | Domain | Technology | Purpose |
|-----------|--------|------------|---------|
| **Main Site** | `educationministry.org` | WordPress | Public content, SEO, blog, landing pages |
| **Member Portal** | `app.educationministry.org` | React SPA (GitHub Pages) | Interactive programs, signup, capstone application, membership, donations |
| **Backend API** | `api.educationministry.org` | Node.js / Express | Signup processing, measurements, payments (Stripe) |
| **Login Platform** | `platform.btpma.org` | External | User authentication and session management |

---

## How They Work Together

### User Journey

1. **Discovery** — User visits `educationministry.org` (WordPress) for general information, blog posts, and SEO-driven content.
2. **Engagement** — WordPress CTAs link to `app.educationministry.org` for interactive features.
3. **Application** — React SPA handles signup, program exploration, capstone applications, and membership flows.
4. **Authentication** — Login button redirects to `platform.btpma.org/login` for secure authentication.
5. **Backend** — SPA communicates with `api.educationministry.org` for data operations (signup, measurements, payments).

### Data Flow

```
[User Browser]
     │
     ├── GET educationministry.org ──────► [WordPress Server]
     │                                      (content, blog, SEO)
     │
     ├── GET app.educationministry.org ──► [GitHub Pages]
     │                                      (React SPA static files)
     │
     ├── POST api.educationministry.org ─► [Backend API Server]
     │        /signup                       (process signup)
     │        /measure                      (track engagement)
     │        /payments                     (Stripe integration)
     │
     └── GET platform.btpma.org/login ───► [Auth Platform]
                                            (user authentication)
```

---

## React SPA Architecture

### File Structure

```
education-ministry-org/
├── index.html                 # Entry point — loads all scripts
├── CNAME                      # GitHub Pages custom domain
├── assets/
│   ├── css/main.css           # Styles (modals, forms, layout)
│   ├── js/
│   │   ├── config.js          # Environment-aware configuration
│   │   └── app.js             # React application (components, routing)
│   └── images/                # Production images (hero, logo, etc.)
├── docs/                      # Design mockups and references
├── DEPLOYMENT.md              # Deployment guide
├── DEPLOYMENT_CHECKLIST.md    # Step-by-step deployment checklist
├── ARCHITECTURE.md            # This file
└── README.md                  # Project overview and setup
```

### Configuration System

`config.js` provides an environment-aware configuration loaded before `app.js`:

- **Production** (`app.educationministry.org`) — real API, real Stripe key, debug off
- **Staging** (`staging-app.*`) — staging API, test Stripe key, debug on
- **Development** (`localhost`) — local API, test Stripe key, debug on

All configurable values are accessed via the global `window.AppConfig` object. See `config.js` for the full list.

### Routing

The SPA uses **hash-based routing** (`/#/page`) for GitHub Pages compatibility:

| Route | Page |
|-------|------|
| `/#/` | Home (hero, programs overview) |
| `/#/about` | About the ministry |
| `/#/programs` | Programs listing |
| `/#/civic-library` | Civic Library resources |
| `/#/membership` | Membership tiers and signup |
| `/#/donate` | Donation page (Stripe) |
| `/#/privacy` | Privacy Policy |
| `/#/terms` | Terms of Service |

---

## API Integration Points

| Endpoint | Method | Purpose | Used By |
|----------|--------|---------|---------|
| `/signup` | POST | New user registration | Signup modal in `app.js` |
| `/measure` | POST | Track engagement events | Capstone submission in `app.js` |
| `/payments` | POST | Process Stripe payments | Donate page in `app.js` |

All endpoints are prefixed with `AppConfig.API_BASE_URL`.

---

## Future Enhancement Guidelines

### Adding a New Page

1. Create the component function in `app.js`
2. Add the route to the hash router in `app.js`
3. Add the navigation link to the header component
4. Update this document's routing table

### Adding a New API Endpoint

1. Add the endpoint constant to `config.js` (derived from `API_BASE_URL`)
2. Reference it in `app.js` via `AppConfig.NEW_ENDPOINT`
3. Document it in the API Integration Points table above

### Adding a New Environment

1. Add a new hostname detection condition in `config.js`
2. Create the environment config block with all required values
3. Update the README and this document

### Moving to a Build System (Future)

The current setup uses CDN-loaded React with Babel in-browser transpilation. To modernize:

1. Initialize with `create-react-app` or Vite
2. Move `app.js` components into individual `.jsx` files
3. Replace `config.js` with `.env` files
4. Set up CI/CD pipeline for build and deploy
5. Update GitHub Pages to serve from `build/` or `dist/` directory

---

## Maintenance Procedures

| Task | How To |
|------|--------|
| Update content text | Edit data arrays in `app.js` (e.g., `programsData`, `civicLibraryData`) |
| Change config values | Edit `config.js` environment blocks |
| Update styles | Edit `assets/css/main.css` |
| Replace images | Drop new files in `assets/images/`, update references |
| Update copyright year | Change `COPYRIGHT_YEAR` in `config.js` production block |
| Add new CDN dependency | Add `<script>` tag in `index.html` before `app.js` |

---

*Last updated: April 2026*
