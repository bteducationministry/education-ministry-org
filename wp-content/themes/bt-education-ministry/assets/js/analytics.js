/**
 * BT Education Ministry Analytics Tracker
 * Sends events to AEMP Dashboard for funnel tracking
 */

(function() {
    'use strict';
    
    const ANALYTICS_ENDPOINT = 'https://aemp-dashboard.btpma.org/measure';
    
    // Analytics object
    window.btAnalytics = {
        /**
         * Track an event
         * @param {string} eventType - Type of event (page_view, cta_click, form_submit)
         * @param {object} metadata - Additional event data
         */
        track: function(eventType, metadata = {}) {
            const eventData = {
                event_type: eventType,
                page_url: window.location.href,
                page_title: document.title,
                timestamp: new Date().toISOString(),
                user_agent: navigator.userAgent,
                referrer: document.referrer,
                ...metadata
            };
            
            // Send to AEMP Dashboard
            this.sendEvent(eventData);
            
            // Log in development
            if (window.location.hostname === 'localhost' || window.location.hostname.includes('dev')) {
                console.log('[BT Analytics]', eventType, eventData);
            }
        },
        
        /**
         * Send event to analytics endpoint
         * @param {object} eventData - Event data to send
         */
        sendEvent: function(eventData) {
            // Use sendBeacon for reliability (works even when page is unloading)
            if (navigator.sendBeacon) {
                const blob = new Blob([JSON.stringify(eventData)], { type: 'application/json' });
                navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
            } else {
                // Fallback to fetch
                fetch(ANALYTICS_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(eventData),
                    keepalive: true
                }).catch(err => {
                    console.error('[BT Analytics] Error sending event:', err);
                });
            }
        },
        
        /**
         * Track page view
         */
        trackPageView: function() {
            this.track('page_view', {
                page_name: this.getPageName()
            });
        },
        
        /**
         * Get page name from body class or URL
         */
        getPageName: function() {
            const bodyClasses = document.body.className;
            
            // Extract page name from WordPress body classes
            const pageMatch = bodyClasses.match(/page-template-page-(\S+)/);
            if (pageMatch) {
                return pageMatch[1].replace(/-/g, '_');
            }
            
            // Fallback to URL path
            return window.location.pathname.replace(/\//g, '_').replace(/^_/, '') || 'home';
        }
    };
    
    // Auto-track page views on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.btAnalytics.trackPageView();
        });
    } else {
        window.btAnalytics.trackPageView();
    }
    
    // Track CTA clicks
    document.addEventListener('click', function(e) {
        const target = e.target.closest('[data-event="cta_click"]');
        if (target) {
            const destination = target.getAttribute('data-destination') || target.href;
            window.btAnalytics.track('cta_click', {
                cta_text: target.textContent.trim(),
                cta_destination: destination,
                cta_location: window.btAnalytics.getPageName()
            });
        }
    });
    
    // Track form submissions (WPForms integration)
    document.addEventListener('wpformsAjaxSubmitSuccess', function(e) {
        const formId = e.detail.formId;
        const formName = e.detail.currentForm ? e.detail.currentForm.querySelector('.wpforms-title').textContent : 'Unknown Form';
        
        let eventType = 'form_submit';
        
        // Determine specific event type based on form
        if (formName.includes('Offer 0') || formName.includes('Signup')) {
            eventType = 'form_submit_offer_0';
        } else if (formName.includes('Capstone') || formName.includes('Application')) {
            eventType = 'form_submit_capstone_application';
        } else if (formName.includes('Booking') || formName.includes('Consultation')) {
            eventType = 'form_submit_booking';
        }
        
        window.btAnalytics.track(eventType, {
            form_id: formId,
            form_name: formName,
            page_name: window.btAnalytics.getPageName()
        });
    });
    
    // Track form errors
    document.addEventListener('wpformsAjaxSubmitFailed', function(e) {
        const formId = e.detail.formId;
        const error = e.detail.error || 'Unknown error';
        
        window.btAnalytics.track('form_error', {
            form_id: formId,
            error_message: error,
            page_name: window.btAnalytics.getPageName()
        });
    });
    
})();
