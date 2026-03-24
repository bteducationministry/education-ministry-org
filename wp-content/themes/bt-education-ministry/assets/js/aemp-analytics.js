/**
 * AEMP Analytics & Event Tracking
 * BT Education Ministry
 * 
 * Sends events to: aemp-dashboard.btpma.org/measure
 * WordPress is the event SOURCE. AEMP Dashboard is the DESTINATION.
 */

(function() {
  'use strict';

  // Configuration
  const AEMP_ENDPOINT = (typeof btemData !== 'undefined' && btemData.aempEndpoint)
    ? btemData.aempEndpoint
    : 'https://aemp-dashboard.btpma.org/measure';
  
  const PLATFORM = 'wordpress';

  // Session management
  function getSessionId() {
    let sid = sessionStorage.getItem('aemp_session_id');
    if (!sid) {
      sid = 'anon_' + Math.random().toString(36).substr(2, 12) + '_' + Date.now();
      sessionStorage.setItem('aemp_session_id', sid);
    }
    return sid;
  }

  // Device detection
  function getDeviceType() {
    const w = window.innerWidth;
    if (w <= 768) return 'mobile';
    if (w <= 1024) return 'tablet';
    return 'desktop';
  }

  // UTM parameters
  function getUtmParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      utm_source: params.get('utm_source') || null,
      utm_medium: params.get('utm_medium') || null,
      utm_campaign: params.get('utm_campaign') || null,
    };
  }

  // Hash email for privacy
  async function hashEmail(email) {
    if (!email) return null;
    const encoder = new TextEncoder();
    const data = encoder.encode(email.toLowerCase().trim());
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Core event sender
  function sendEvent(eventName, eventCategory, metadata) {
    const utm = getUtmParams();
    const pageName = (typeof btemData !== 'undefined') ? btemData.pageName : 'unknown';
    const userId = (typeof btemData !== 'undefined') ? btemData.userId : null;
    const memberTier = (typeof btemData !== 'undefined') ? btemData.memberTier : null;

    const payload = {
      event_name: eventName,
      event_category: eventCategory,
      event_timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_name: pageName,
      session_id: getSessionId(),
      user_id: userId,
      email_hash: null,
      membership_tier: memberTier,
      program_interest: metadata && metadata.program_interest ? metadata.program_interest : null,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
      referrer: document.referrer || null,
      device_type: getDeviceType(),
      platform: PLATFORM,
      value: metadata && metadata.value ? metadata.value : null,
      currency: 'USD',
      metadata: metadata || {},
    };

    // Send via Beacon API (non-blocking)
    if (navigator.sendBeacon) {
      navigator.sendBeacon(AEMP_ENDPOINT, JSON.stringify(payload));
    } else {
      // Fallback to fetch
      fetch(AEMP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(function() {
        // Silent fail - analytics should never break the site
      });
    }

    // Console log in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('[AEMP]', eventName, payload);
    }
  }

  // --- A. Page View Events ---
  const pageViewMap = {
    'home': 'page_view_home',
    'about': 'page_view_about',
    'programs': 'page_view_programs',
    'membership': 'page_view_membership',
    'civic_library': 'page_view_civic_library',
    'donate': 'page_view_donate',
    'offer0_start': 'page_view_offer0_start',
    'offer0_learn': 'page_view_offer0_learn',
    'offer0_signup': 'page_view_offer0_signup',
    'offer0_welcome': 'page_view_offer0_welcome',
    'capstone': 'page_view_capstone',
    'capstone_apply': 'page_view_capstone_apply',
    'capstone_book_call': 'page_view_capstone_book_call',
  };

  function trackPageView() {
    const pageName = (typeof btemData !== 'undefined') ? btemData.pageName : null;
    if (pageName && pageViewMap[pageName]) {
      sendEvent(pageViewMap[pageName], 'page', {});
    }
  }

  // --- B. CTA Click Events ---
  function trackCTAClicks() {
    document.addEventListener('click', function(e) {
      const el = e.target.closest('[data-aemp-event]');
      if (!el) return;

      const eventName = el.getAttribute('data-aemp-event');
      const location = el.getAttribute('data-aemp-location') || 'unknown';
      const meta = { cta_location: location };

      // Add specific metadata based on event
      if (el.getAttribute('data-aemp-tier')) {
        meta.tier_shown = el.getAttribute('data-aemp-tier');
      }
      if (el.getAttribute('data-aemp-destination')) {
        meta.destination_url = el.getAttribute('data-aemp-destination');
      }
      if (el.getAttribute('data-aemp-resource-id')) {
        meta.resource_id = el.getAttribute('data-aemp-resource-id');
        meta.resource_category = el.getAttribute('data-aemp-resource-category') || '';
      }
      if (el.getAttribute('data-aemp-value')) {
        meta.value = parseFloat(el.getAttribute('data-aemp-value'));
      }

      sendEvent(eventName, 'cta', meta);
    });
  }

  // --- C. Form Events ---
  function trackFormEvents() {
    // Track first interaction with forms
    const trackedForms = new Set();
    document.addEventListener('focusin', function(e) {
      const form = e.target.closest('form');
      if (!form || trackedForms.has(form)) return;
      trackedForms.add(form);

      const formId = form.getAttribute('data-aemp-form-id') || form.id || 'unknown';
      
      if (form.classList.contains('btem-offer0-form') || formId.includes('offer0')) {
        sendEvent('form_start_offer0_signup', 'form', { form_id: formId });
      } else if (form.classList.contains('btem-capstone-form') || formId.includes('capstone')) {
        sendEvent('form_start_capstone_application', 'form', { form_id: formId });
      } else if (form.classList.contains('btem-donation-form') || formId.includes('donat')) {
        sendEvent('form_start_donation', 'form', { donation_type: 'unknown' });
      }
    });

    // Track form submissions (WPForms hooks)
    if (typeof jQuery !== 'undefined') {
      jQuery(document).on('wpformsAjaxSubmitSuccess', function(e, response) {
        var formId = response && response.data ? response.data.form_id : 'unknown';
        var formEl = document.querySelector('#wpforms-form-' + formId);
        
        if (formEl && (formEl.classList.contains('btem-offer0-form') || String(formId).includes('offer0'))) {
          sendEvent('form_submit_offer0_signup', 'form', { form_id: formId });
        } else if (formEl && (formEl.classList.contains('btem-capstone-form') || String(formId).includes('capstone'))) {
          sendEvent('form_submit_capstone_application', 'form', { form_id: formId });
        } else {
          sendEvent('form_submit_contact', 'form', { form_id: formId });
        }
      });
    }
  }

  // --- D. Commerce Events (triggered via inline data attributes or PMPro hooks) ---
  function trackCommerceEvents() {
    // Listen for custom events from PMPro/Stripe
    document.addEventListener('btem:checkout_start', function(e) {
      sendEvent('checkout_start_membership', 'commerce', {
        tier: e.detail.tier,
        price: e.detail.price,
      });
    });

    document.addEventListener('btem:purchase_complete', function(e) {
      const tier = e.detail.tier;
      const eventMap = {
        'seeker': 'purchase_membership_seeker',
        'operator': 'purchase_membership_operator',
        'architect': 'purchase_membership_architect',
        'steward': 'purchase_membership_steward',
      };
      if (eventMap[tier]) {
        sendEvent(eventMap[tier], 'commerce', { value: e.detail.value });
      }
    });

    document.addEventListener('btem:donation_complete', function(e) {
      sendEvent('donation_complete', 'commerce', {
        donation_type: e.detail.type,
        value: e.detail.value,
      });
    });
  }

  // --- F. Engagement Events (Scroll Depth) ---
  function trackScrollDepth() {
    const thresholds = [25, 50, 75, 100];
    const tracked = new Set();

    function checkScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const percent = Math.round((scrollTop / docHeight) * 100);

      thresholds.forEach(function(threshold) {
        if (percent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold);
          sendEvent('scroll_depth_' + threshold, 'engagement', { percent: threshold });
        }
      });
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // --- Initialize ---
  function init() {
    trackPageView();
    trackCTAClicks();
    trackFormEvents();
    trackCommerceEvents();
    trackScrollDepth();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual event triggering
  window.AEMP = {
    sendEvent: sendEvent,
    hashEmail: hashEmail,
  };

})();
