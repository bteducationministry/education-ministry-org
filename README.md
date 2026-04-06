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
├── assets/
│   ├── images/                 # Hero images, logo, mockups
│   ├── css/                    # Stylesheets (future extraction)
│   └── js/                     # Scripts (future extraction)
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
- No build step required — opens directly in any modern browser

## License

© 2026 Bodhi Tree Education Ministry. All rights reserved.

---

*"The civic education that builds and preserves families across generations — grounded in scripture, hidden in plain view."*
