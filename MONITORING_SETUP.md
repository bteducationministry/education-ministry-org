# Monitoring & Analytics Setup — Education Ministry SPA

> **Version:** 1.0 · **Last Updated:** April 2026  
> **Stack:** Google Analytics 4 (free) · Sentry (free tier) · UptimeRobot (free tier) · Browser Performance APIs

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Google Analytics 4 (GA4)](#2-google-analytics-4-ga4)
3. [Sentry Error Tracking](#3-sentry-error-tracking)
4. [UptimeRobot Uptime Monitoring](#4-uptimerobot-uptime-monitoring)
5. [Performance Monitoring](#5-performance-monitoring)
6. [Health Check Endpoint](#6-health-check-endpoint)
7. [Event Tracking Reference](#7-event-tracking-reference)
8. [Monitoring Dashboard Access](#8-monitoring-dashboard-access)
9. [Alert Configuration](#9-alert-configuration)
10. [Incident Response Procedures](#10-incident-response-procedures)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    MONITORING STACK                              │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   GA4         │  │   Sentry     │  │   UptimeRobot        │  │
│  │   (Analytics) │  │   (Errors)   │  │   (Uptime)           │  │
│  │   Free        │  │   Free Tier  │  │   Free Tier          │  │
│  │   Unlimited   │  │   5k evt/mo  │  │   50 monitors        │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
│         │                  │                      │              │
│         └──────────┬───────┘                      │              │
│                    ▼                              │              │
│         ┌──────────────────┐                      │              │
│         │  monitoring.js   │                      │              │
│         │  (Browser SDK)   │                      │              │
│         └────────┬─────────┘                      │              │
│                  │                                │              │
│                  ▼                                ▼              │
│         ┌──────────────────────────────────────────┐            │
│         │      app.educationministry.org           │            │
│         │      React SPA (index.html)              │            │
│         │      health.json ← UptimeRobot pings     │            │
│         └──────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

### File Structure
```
education-ministry-org/
├── assets/js/
│   ├── config.js       ← GA4_MEASUREMENT_ID, SENTRY_DSN, perf flags
│   ├── monitoring.js   ← GA4, Sentry, performance, route tracking
│   └── app.js          ← Event tracking calls (signup, capstone, etc.)
├── health.json         ← Static health check for UptimeRobot
├── index.html          ← Script loading order: config → monitoring → app
└── MONITORING_SETUP.md ← This file
```

### Loading Order
```
index.html
  └─ config.js          ← Sets window.AppConfig (incl. monitoring keys)
  └─ monitoring.js      ← Reads AppConfig, inits GA4/Sentry/Perf, sets window.EMMonitoring
  └─ app.js             ← Calls window.EMMonitoring.trackEvent() etc.
```

---

## 2. Google Analytics 4 (GA4)

### 2.1 Create GA4 Property

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **Admin** (gear icon) → **Create Property**
3. Property name: `Education Ministry SPA`
4. Reporting time zone: `Eastern Time`
5. Currency: `USD`
6. Click **Next** → Business info → **Create**
7. Choose **Web** platform
8. Website URL: `https://app.educationministry.org`
9. Stream name: `Education Ministry React SPA`
10. Click **Create stream**
11. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 2.2 Configure in Project

Open `assets/js/config.js` and set your Measurement ID:

```javascript
// Production environment
GA4_MEASUREMENT_ID: "G-XXXXXXXXXX",  // Replace with your actual ID
```

### 2.3 What GA4 Tracks Automatically

| Metric | Description |
|--------|-------------|
| **Pageviews** | Every hash-route change (`/#/about`, `/#/programs`, etc.) |
| **Sessions** | User sessions, duration, bounce rate |
| **User demographics** | Country, language, device type |
| **Traffic sources** | Referral, direct, organic, social |
| **Web Vitals** | LCP, FID, CLS (sent as custom events) |

### 2.4 Custom Events Tracked

| Event Name | Trigger | Parameters |
|------------|---------|------------|
| `signup_modal_open` | User clicks "Begin Free" or "Start The Challenge" | `signup_source` |
| `signup_success` | Successful form submission | `signup_source` |
| `signup_error` | Failed form submission | `error_message` |
| `capstone_application_success` | Capstone form submitted | — |
| `web_vital` | Page load metrics | `metric_name`, `metric_value` |
| `js_error` | JavaScript error caught | `error_message`, `error_source` |

### 2.5 Verify GA4 is Working

1. Open [GA4 Realtime Report](https://analytics.google.com) → Reports → Realtime
2. Visit your site in another tab
3. You should see active users appear within 30 seconds
4. Check Events section for `page_view` events

### 2.6 GA4 Free Tier Limits

- **Events:** Unlimited pageviews and events
- **Data retention:** 14 months (configurable to 2 or 14 months)
- **Properties:** Up to 2,000 per account
- **Custom dimensions:** 50 event-scoped, 25 user-scoped

---

## 3. Sentry Error Tracking

### 3.1 Create Sentry Project

1. Go to [sentry.io/signup](https://sentry.io/signup/) — sign up with GitHub or email
2. Create organization: `BT Education Ministry`
3. Create project:
   - Platform: **Browser JavaScript**
   - Project name: `education-ministry-spa`
   - Team: Default
4. Copy the **DSN** from the project settings (format: `https://xxx@xxx.ingest.sentry.io/xxx`)

### 3.2 Configure in Project

Open `assets/js/config.js` and set your DSN:

```javascript
// Production environment
SENTRY_DSN: "https://your-key@your-org.ingest.sentry.io/your-project-id",
```

### 3.3 What Sentry Tracks

| Category | Details |
|----------|---------|
| **Unhandled errors** | `window.onerror` — all uncaught exceptions |
| **Promise rejections** | `unhandledrejection` — async errors |
| **API failures** | Signup/Capstone form submission errors |
| **Manual captures** | `EMMonitoring.captureError()` calls |
| **Breadcrumbs** | User actions leading up to an error |
| **Environment tags** | `production`, `staging`, `development` |

### 3.4 Sentry Error Filtering

The integration automatically ignores these common noise events:
- `ResizeObserver loop limit exceeded`
- `Non-Error exception captured`
- `Loading chunk failed` (network issues)
- `Network request failed`

### 3.5 Set Up Sentry Alerts

1. In Sentry → **Alerts** → **Create Alert**
2. Recommended alerts:

| Alert | Condition | Action |
|-------|-----------|--------|
| **New Issue** | First occurrence of any new error | Email notification |
| **Spike** | >10 events in 1 hour | Email notification |
| **High Frequency** | >50 events in 24 hours | Email + Slack (optional) |

3. Configure email recipients:
   - Go to **Settings** → **Notifications** → **Alert Rules**
   - Add team email: `info@educationministry.org`

### 3.6 Verify Sentry is Working

Open browser console on your site and run:
```javascript
// This should appear in Sentry within seconds
window.Sentry.captureMessage("Test: Monitoring verification");
```

Or trigger a test error:
```javascript
window.EMMonitoring.captureError(new Error("Test error from console"));
```

### 3.7 Sentry Free Tier Limits

- **Events:** 5,000 errors per month
- **Data retention:** 30 days
- **Members:** Unlimited
- **Integrations:** GitHub, Slack, email
- **Rate limiting:** Automatic when quota exceeded

---

## 4. UptimeRobot Uptime Monitoring

### 4.1 Create Account

1. Go to [uptimerobot.com](https://uptimerobot.com) and sign up (free)
2. Verify email

### 4.2 Configure Monitors

Create the following monitors:

#### Monitor 1: Main SPA (Health Check)

| Setting | Value |
|---------|-------|
| **Monitor Type** | HTTP(S) |
| **Friendly Name** | Education Ministry SPA |
| **URL** | `https://app.educationministry.org/health.json` |
| **Monitoring Interval** | 5 minutes |
| **Monitor Timeout** | 30 seconds |
| **HTTP Method** | GET |
| **Expected Status Code** | 200 |
| **Alert Contact** | Your email |

> **Note:** Until DNS is configured, use `http://72.62.80.207/health.json` as the URL.

#### Monitor 2: Main Page Load

| Setting | Value |
|---------|-------|
| **Monitor Type** | HTTP(S) |
| **Friendly Name** | Education Ministry Index |
| **URL** | `https://app.educationministry.org/` |
| **Monitoring Interval** | 5 minutes |
| **Keyword Type** | Keyword Exists |
| **Keyword Value** | `Faith-Grounded` |
| **Alert Contact** | Your email |

#### Monitor 3: VPS Direct IP (Backup)

| Setting | Value |
|---------|-------|
| **Monitor Type** | HTTP(S) |
| **Friendly Name** | VPS Direct |
| **URL** | `http://72.62.80.207/` |
| **Monitoring Interval** | 5 minutes |
| **Alert Contact** | Your email |

### 4.3 Configure Alert Contacts

1. Go to **My Settings** → **Alert Contacts**
2. Add contacts:
   - **Email:** `info@educationministry.org` (primary)
   - **Email:** Personal admin email (backup)
3. For each contact, set:
   - Alert on **Down**
   - Alert on **Up** (recovery notification)

### 4.4 UptimeRobot Free Tier Limits

- **Monitors:** 50 monitors
- **Check interval:** 5 minutes (minimum)
- **Alert contacts:** Unlimited email contacts
- **SMS:** Not included (paid only)
- **Status pages:** 1 public status page
- **Log retention:** 2 months

### 4.5 Optional: Public Status Page

1. In UptimeRobot → **Status Pages** → **Add Status Page**
2. Name: `Education Ministry Status`
3. Add all monitors
4. Share URL with stakeholders: `https://stats.uptimerobot.com/your-page`

---

## 5. Performance Monitoring

### 5.1 What's Monitored

The `monitoring.js` module automatically collects Web Vitals and navigation timing:

| Metric | Description | Good Target |
|--------|-------------|-------------|
| **LCP** | Largest Contentful Paint | < 2.5s |
| **FID** | First Input Delay | < 100ms |
| **CLS** | Cumulative Layout Shift | < 0.1 |
| **TTFB** | Time to First Byte | < 800ms |
| **Page Load** | Full page load time | < 3s |
| **DOM Interactive** | DOM ready time | < 2s |

### 5.2 Viewing Performance Data in GA4

1. GA4 → **Reports** → **Engagement** → **Events**
2. Filter by event name: `web_vital`
3. View `metric_name` and `metric_value` dimensions
4. Create a custom exploration:
   - Rows: `metric_name`
   - Values: Average of `metric_value`

### 5.3 Performance Budgets

Recommended thresholds for alerts:

| Metric | Warning | Critical |
|--------|---------|----------|
| LCP | > 2.5s | > 4.0s |
| FID | > 100ms | > 300ms |
| CLS | > 0.1 | > 0.25 |
| Page Load | > 3s | > 5s |

---

## 6. Health Check Endpoint

### 6.1 Location

```
https://app.educationministry.org/health.json
```

### 6.2 Response Format

```json
{
  "status": "ok",
  "service": "education-ministry-spa",
  "version": "1.0.0",
  "timestamp_note": "This is a static health check file. For dynamic checks, use the API health endpoint."
}
```

### 6.3 Usage

- **UptimeRobot** pings this file every 5 minutes
- HTTP 200 = healthy
- HTTP 404/5xx = down → triggers alert
- The file is deployed alongside the SPA via the CI/CD pipeline

---

## 7. Event Tracking Reference

### Custom Events (GA4)

| Event | Source File | When Fired |
|-------|------------|------------|
| `page_view` | `monitoring.js` | Every hash route change |
| `signup_modal_open` | `app.js` | User opens signup modal |
| `signup_success` | `app.js` | Signup form submitted successfully |
| `signup_error` | `app.js` | Signup form submission failed |
| `capstone_application_success` | `app.js` | Capstone application submitted |
| `web_vital` | `monitoring.js` | Performance metric collected |
| `js_error` | `monitoring.js` | Unhandled JS error or promise rejection |

### Adding New Events

To add tracking for new user actions in `app.js`:

```javascript
// Track a new event
if (window.EMMonitoring) {
  window.EMMonitoring.trackEvent("event_name", {
    event_category: "Category",
    custom_param: "value"
  });
}

// Capture an error
if (window.EMMonitoring) {
  window.EMMonitoring.captureError(new Error("Something failed"), {
    context: "additional info"
  });
}
```

---

## 8. Monitoring Dashboard Access

| Tool | URL | Login |
|------|-----|-------|
| **GA4** | [analytics.google.com](https://analytics.google.com) | Google account |
| **Sentry** | [sentry.io](https://sentry.io) | GitHub or email |
| **UptimeRobot** | [uptimerobot.com/dashboard](https://uptimerobot.com/dashboard) | Email/password |

### Daily Monitoring Checklist

- [ ] Check UptimeRobot dashboard — any downtime in last 24h?
- [ ] Check Sentry — any new unresolved issues?
- [ ] Check GA4 Realtime — is traffic flowing normally?

### Weekly Review

- [ ] Review Sentry error trends (new vs recurring)
- [ ] Check GA4 engagement metrics (pageviews, bounce rate)
- [ ] Review Web Vitals performance data
- [ ] Verify UptimeRobot uptime percentage (target: 99.9%)

---

## 9. Alert Configuration

### Email Alerts Summary

| Source | Alert Type | Recipient |
|--------|-----------|-----------|
| UptimeRobot | Site down/up | `info@educationministry.org` |
| Sentry | New error issue | Team email |
| Sentry | Error spike (>10/hr) | Team email |
| GA4 | Custom alerts (optional) | Google account email |

### Setting Up GA4 Custom Alerts (Optional)

1. GA4 → **Admin** → **Custom Definitions** → **Custom Alerts**
2. Create alert:
   - Name: `Traffic Drop`
   - Metric: Sessions
   - Condition: Decreases by more than 50% compared to same day previous week
   - Notification: Email

### Escalation Procedure

| Level | Timeframe | Action |
|-------|-----------|--------|
| **L1** | Alert received | Check UptimeRobot, verify site loads |
| **L2** | Down > 5 min | SSH into VPS, check Nginx logs |
| **L3** | Down > 15 min | Check server resources, restart services |
| **L4** | Down > 30 min | Trigger CI/CD rollback, contact hosting |

---

## 10. Incident Response Procedures

### Site Down

```bash
# 1. Verify from VPS
ssh root@72.62.80.207
curl -I http://localhost

# 2. Check Nginx
systemctl status nginx
nginx -t
journalctl -u nginx --since "10 minutes ago"

# 3. Restart if needed
systemctl restart nginx

# 4. Check disk space
df -h

# 5. Check if files exist
ls -la /var/www/education-ministry-org/
```

### High Error Rate (Sentry)

1. Open Sentry → Issues → Sort by frequency
2. Click the top issue to view stack trace
3. Check breadcrumbs for user actions leading to error
4. Identify affected browsers/devices
5. Fix and deploy via CI/CD

### Performance Degradation

1. Check GA4 → Web Vitals events
2. Compare LCP/FID/CLS against baselines
3. Common causes:
   - Large hero image not cached → Check Nginx caching headers
   - Slow CDN response → Check React/Babel CDN status
   - Layout shifts → Check CSS for missing width/height on images

---

## 11. Troubleshooting

### GA4 Not Receiving Data

1. Check browser console for `[Monitoring] GA4 initialized` message
2. Verify `GA4_MEASUREMENT_ID` is set in `config.js`
3. Check for ad blockers (GA4 blocked by uBlock Origin, etc.)
4. Use GA4 DebugView: **Admin** → **DebugView** → enable debug mode:
   ```javascript
   // Temporarily add to config.js for debugging
   gtag('config', 'G-XXXXXXXXXX', { debug_mode: true });
   ```

### Sentry Not Receiving Errors

1. Check browser console for `[Monitoring] Sentry initialized` message
2. Verify `SENTRY_DSN` is set in `config.js`
3. Check Sentry project settings → **Client Keys** → verify DSN is active
4. Test manually: `window.Sentry.captureMessage("Test")`
5. Check if Content-Security-Policy headers are blocking Sentry SDK

### UptimeRobot Not Alerting

1. Verify monitor is active (not paused)
2. Check alert contacts are verified (email confirmation)
3. Test by temporarily changing monitored URL to invalid one
4. Check spam folder for alert emails

### Performance Metrics Missing

1. Verify `ENABLE_PERF_MONITORING: true` in config.js
2. Check browser supports PerformanceObserver API (Chrome 77+, Firefox 78+)
3. Metrics only send after full page load — wait for `load` event
4. CLS is reported when page becomes hidden (tab switch/close)

---

## Quick Reference: Configuration Keys

```javascript
// assets/js/config.js — production block
GA4_MEASUREMENT_ID: "G-XXXXXXXXXX",     // From GA4 property
SENTRY_DSN: "https://key@org.ingest.sentry.io/id",  // From Sentry project
SENTRY_ENVIRONMENT: "production",
SENTRY_SAMPLE_RATE: 1.0,                // 1.0 = 100% of errors
ENABLE_PERF_MONITORING: true             // Web Vitals tracking
```

---

*Created: April 2026 · BT Education Ministry · app.educationministry.org*
