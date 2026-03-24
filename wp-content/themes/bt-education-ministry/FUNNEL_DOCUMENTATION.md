# BT Education Ministry Funnel System Documentation

**Created:** March 24, 2026  
**Theme Location:** `/var/www/educationministry.org/wp-content/themes/bt-education-ministry/`

---

## 📋 Overview

Complete funnel system with two conversion paths:
1. **Offer 0 Funnel** - Free Biblical Trustee Education signup
2. **Capstone Funnel** - Premium estate planning program ($55k value)

---

## 🗂️ File Structure

### Page Templates
All templates located in theme root directory:

| File | Template Name | WordPress Page | URL |
|------|---------------|----------------|-----|
| `page-start.php` | Offer 0 - Start | Start Your Journey | `/start` |
| `page-learn.php` | Offer 0 - Learn | Learn the Curriculum | `/learn` |
| `page-signup.php` | Offer 0 - Signup | Sign Up | `/signup` |
| `page-welcome.php` | Offer 0 - Welcome | Welcome | `/welcome` |
| `page-capstone.php` | Capstone - Overview | Capstone Program | `/capstone` |
| `page-apply.php` | Capstone - Apply | Apply Now | `/apply` |
| `page-book-call.php` | Capstone - Book Call | Book a Call | `/book-call` |

### Analytics System
- **File:** `assets/js/analytics.js`
- **Enqueued in:** `functions.php`
- **Endpoint:** `https://aemp-dashboard.btpma.org/measure`

---

## 📝 WPForms Configuration

### Form 1: Offer 0 Signup Form
- **Form ID:** `35`
- **Shortcode:** `[wpforms id="35"]`
- **Used on:** `/signup` page
- **Fields:**
  - Full Name (required)
  - Email Address (required)
  - Phone Number (required)
  - How did you hear about us? (optional dropdown)
- **Actions:**
  - Email notification to admin
  - Redirect to `/welcome` page
  - Webhook to AEMP Dashboard
- **Purpose:** Create Seeker account and grant access to education platform

### Form 2: Capstone Application Form
- **Form ID:** `36`
- **Shortcode:** `[wpforms id="36"]`
- **Used on:** `/apply` page
- **Fields:**
  - Full Name (required)
  - Email Address (required)
  - Phone Number (required)
  - Spouse Name (optional)
  - Number of Children (required)
  - Number of Grandchildren (optional)
  - Estimated Net Worth (required dropdown)
  - Primary Assets (required checkboxes)
  - Current Estate Plan Status (required radio)
  - Current Trust Status (required radio)
  - Primary Goals (required textarea)
  - Additional Information (optional textarea)
- **Actions:**
  - Email notification to admin
  - Success message display
  - Webhook to AEMP Dashboard
- **Purpose:** Qualify prospects for Capstone program

### Form 3: Consultation Booking Form
- **Form ID:** `37`
- **Shortcode:** `[wpforms id="37"]`
- **Used on:** `/book-call` page
- **Fields:**
  - Full Name (required)
  - Email Address (required)
  - Phone Number (required)
  - Preferred Time of Day (required dropdown)
  - Preferred Days (required checkboxes)
  - Discussion Topics (optional textarea)
- **Actions:**
  - Email notification to admin
  - Success message display
  - Webhook to AEMP Dashboard
- **Purpose:** Schedule consultation calls with prospects

---

## 📊 Analytics Tracking

### Events Tracked

#### 1. Page Views
- **Event Type:** `page_view`
- **Triggered:** Automatically on page load
- **Data Sent:**
  - `page_url`
  - `page_title`
  - `page_name`
  - `timestamp`
  - `user_agent`
  - `referrer`

#### 2. CTA Clicks
- **Event Type:** `cta_click`
- **Triggered:** Click on elements with `data-event="cta_click"`
- **Data Sent:**
  - `cta_text`
  - `cta_destination`
  - `cta_location`
  - All page view data

#### 3. Form Submissions
- **Event Types:**
  - `form_submit_offer_0` (Form ID 35)
  - `form_submit_capstone_application` (Form ID 36)
  - `form_submit_booking` (Form ID 37)
- **Triggered:** WPForms AJAX success event
- **Data Sent:**
  - `form_id`
  - `form_name`
  - `page_name`
  - All page view data
  - Form field data (via webhook)

#### 4. Form Errors
- **Event Type:** `form_error`
- **Triggered:** WPForms AJAX failure event
- **Data Sent:**
  - `form_id`
  - `error_message`
  - `page_name`

### Analytics Implementation

```javascript
// Manual tracking example
window.btAnalytics.track('custom_event', {
    custom_field: 'value'
});

// Automatic tracking
// - Page views: Auto-tracked on load
// - CTA clicks: Add data-event="cta_click" to links
// - Forms: Auto-tracked via WPForms integration
```

---

## 🎨 Design System

### Colors
- **Primary Blue:** `#1a365d` (headings, primary elements)
- **Secondary Blue:** `#2c5282` (backgrounds, accents)
- **Accent Gold:** `#f59e0b` (CTAs, highlights)
- **Success Green:** `#22c55e` (confirmations)
- **Text Gray:** `#4a5568` (body text)
- **Light Gray:** `#f7fafc` (backgrounds)

### Typography
- **Headings:** Bold, large sizes (2rem - 3rem)
- **Body:** 1rem - 1.125rem, line-height 1.6
- **CTAs:** 1.25rem, font-weight 600

### Spacing
- **Section Padding:** 80px vertical, 20px horizontal
- **Card Padding:** 32px - 48px
- **Grid Gap:** 24px - 32px

### Components
- **Buttons:** Rounded (8px), padding 18px 48px, hover effects
- **Cards:** White background, box-shadow, border-radius 12px
- **Forms:** Clean inputs, clear labels, validation states

---

## 🔄 Funnel Flows

### Offer 0 Flow
```
/start → /learn → /signup → /welcome → platform.btpma.org/educate/
```

1. **Start Page:** Hero, value prop, benefits, CTA
2. **Learn Page:** Curriculum modules, timeline, CTA
3. **Signup Page:** Registration form (Form ID 35)
4. **Welcome Page:** Confirmation, 5-second auto-redirect

### Capstone Flow
```
/capstone → /apply → [Review] → /book-call
```

1. **Capstone Page:** Trust diagram, $55k value, qualification criteria
2. **Apply Page:** Application form (Form ID 36)
3. **Admin Review:** Team reviews application
4. **Book Call Page:** Consultation booking (Form ID 37)

---

## 🔧 Technical Details

### WordPress Integration
- All pages use custom page templates
- Templates assigned via `_wp_page_template` post meta
- Forms embedded via `do_shortcode('[wpforms id="X"]')`

### Analytics Integration
- JavaScript file enqueued in `functions.php`
- Uses `navigator.sendBeacon()` for reliability
- Fallback to `fetch()` API
- Events sent as JSON to AEMP endpoint

### Form Webhooks
- Configured in WPForms settings
- POST requests to `https://aemp-dashboard.btpma.org/measure`
- JSON format with all form field data
- Triggered on successful submission

### Mobile Responsiveness
- CSS Grid with `auto-fit` and `minmax()`
- Flexible padding and font sizes
- Touch-friendly button sizes (48px+ height)

### Accessibility (WCAG)
- Semantic HTML5 elements
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels and required indicators
- Color contrast ratios meet AA standards
- Keyboard navigation support

---

## 🚀 Deployment Checklist

- [x] Page templates created
- [x] Analytics system implemented
- [x] WPForms installed and activated
- [x] Forms created with proper fields
- [x] Form webhooks configured
- [x] WordPress pages created
- [x] Page templates assigned
- [x] Analytics script enqueued
- [x] Mobile responsive design
- [x] WCAG accessibility compliance

---

## 📞 Support & Maintenance

### Testing URLs
- Offer 0 Start: `https://educationministry.org/start`
- Capstone: `https://educationministry.org/capstone`

### Form Management
- Access WPForms: WordPress Admin → WPForms
- View submissions: WPForms → Entries
- Edit forms: WPForms → All Forms

### Analytics Dashboard
- View events: `https://aemp-dashboard.btpma.org/`
- Filter by event type, page, date range

### Troubleshooting
1. **Forms not submitting:** Check WPForms plugin is active
2. **Analytics not tracking:** Verify analytics.js is enqueued
3. **Pages not displaying:** Check template assignment in page settings
4. **Webhooks failing:** Verify AEMP endpoint is accessible

---

## 📝 Notes

- All form data is confidential and encrypted
- GDPR/privacy compliance required for production
- Regular backups recommended before updates
- Test all forms before launching campaigns
- Monitor analytics for conversion optimization

---

**Last Updated:** March 24, 2026  
**Version:** 1.0  
**Maintained by:** BT Education Ministry Development Team
