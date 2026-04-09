/**
 * ═══════════════════════════════════════════════════════════
 * Education Ministry — Monitoring & Analytics Module
 * ═══════════════════════════════════════════════════════════
 *
 * Integrates:
 *   1. Google Analytics 4 (GA4) — pageviews, events, performance
 *   2. Sentry — error tracking & reporting
 *   3. Performance monitoring — Web Vitals via browser APIs
 *
 * All configuration is read from window.AppConfig (config.js).
 * This script must load AFTER config.js and BEFORE app.js.
 * ═══════════════════════════════════════════════════════════
 */

(function (root) {
  "use strict";

  var config = root.AppConfig;
  if (!config) {
    console.warn("[Monitoring] AppConfig not found — skipping initialization.");
    return;
  }

  /* ════════════════════════════════════════════════════════
   * 1. GOOGLE ANALYTICS 4
   * ════════════════════════════════════════════════════════ */

  var GA_ID = config.GA4_MEASUREMENT_ID;

  function initGA4() {
    if (!GA_ID) {
      if (config.DEBUG) console.info("[Monitoring] GA4 disabled — no measurement ID configured.");
      return;
    }

    // Load gtag.js script
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(script);

    // Initialize dataLayer
    root.dataLayer = root.dataLayer || [];
    function gtag() { root.dataLayer.push(arguments); }
    root.gtag = gtag;

    gtag("js", new Date());
    gtag("config", GA_ID, {
      send_page_view: false,  // We'll send manual pageviews for hash routing
      cookie_flags: "SameSite=None;Secure",
      custom_map: {
        dimension1: "environment",
        dimension2: "app_version"
      }
    });

    // Set default parameters
    gtag("set", {
      environment: config.ENV,
      app_version: "1.0.0"
    });

    if (config.DEBUG) console.info("[Monitoring] GA4 initialized with ID:", GA_ID);
  }

  /**
   * Track a pageview — call this on hash route changes.
   * @param {string} pagePath - e.g. "/about", "/programs"
   * @param {string} [pageTitle] - optional page title
   */
  function trackPageview(pagePath, pageTitle) {
    if (!GA_ID || !root.gtag) return;
    root.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      page_location: root.location.href
    });
    if (config.DEBUG) console.info("[Monitoring] Pageview:", pagePath);
  }

  /**
   * Track a custom event.
   * @param {string} eventName - e.g. "signup_start", "form_submit"
   * @param {Object} [params] - additional event parameters
   */
  function trackEvent(eventName, params) {
    if (!GA_ID || !root.gtag) return;
    root.gtag("event", eventName, params || {});
    if (config.DEBUG) console.info("[Monitoring] Event:", eventName, params);
  }


  /* ════════════════════════════════════════════════════════
   * 2. SENTRY ERROR TRACKING
   * ════════════════════════════════════════════════════════ */

  var SENTRY_DSN = config.SENTRY_DSN;

  function initSentry() {
    if (!SENTRY_DSN) {
      if (config.DEBUG) console.info("[Monitoring] Sentry disabled — no DSN configured.");
      return;
    }

    // Load Sentry SDK from CDN (lazy bundle, ~30KB gzipped)
    var script = document.createElement("script");
    script.crossOrigin = "anonymous";
    script.src = "https://browser.sentry-cdn.com/7.119.0/bundle.min.js";
    script.onload = function () {
      if (!root.Sentry) {
        console.warn("[Monitoring] Sentry SDK failed to load.");
        return;
      }

      root.Sentry.init({
        dsn: SENTRY_DSN,
        environment: config.SENTRY_ENVIRONMENT || config.ENV,
        release: "education-ministry-spa@1.0.0",
        sampleRate: config.SENTRY_SAMPLE_RATE || 1.0,

        // Don't send in development unless DSN is explicitly set
        enabled: !!SENTRY_DSN,

        // Filter out noise
        ignoreErrors: [
          "ResizeObserver loop limit exceeded",
          "ResizeObserver loop completed with undelivered notifications",
          "Non-Error exception captured",
          "Non-Error promise rejection captured",
          /Loading chunk \d+ failed/,
          /Network request failed/
        ],

        // Add breadcrumbs for debugging
        beforeBreadcrumb: function (breadcrumb) {
          // Filter out noisy console breadcrumbs in production
          if (breadcrumb.category === "console" && !config.DEBUG) {
            return null;
          }
          return breadcrumb;
        },

        // Enrich error context
        beforeSend: function (event) {
          // Add app config context (non-sensitive values only)
          event.tags = event.tags || {};
          event.tags.app_domain = config.APP_DOMAIN;
          event.tags.app_env = config.ENV;

          // Redact sensitive info from URL if present
          if (event.request && event.request.url) {
            event.request.url = event.request.url.replace(/token=[^&]+/, "token=REDACTED");
          }

          return event;
        }
      });

      // Set user scope (anonymous — no PII)
      root.Sentry.setTag("app.domain", config.APP_DOMAIN);

      if (config.DEBUG) console.info("[Monitoring] Sentry initialized, env:", config.SENTRY_ENVIRONMENT);
    };

    script.onerror = function () {
      console.warn("[Monitoring] Failed to load Sentry SDK from CDN.");
    };

    document.head.appendChild(script);
  }

  /**
   * Capture an error manually.
   * @param {Error} error
   * @param {Object} [context] - additional context
   */
  function captureError(error, context) {
    if (root.Sentry) {
      if (context) {
        root.Sentry.withScope(function (scope) {
          Object.keys(context).forEach(function (key) {
            scope.setExtra(key, context[key]);
          });
          root.Sentry.captureException(error);
        });
      } else {
        root.Sentry.captureException(error);
      }
    }
    // Always log to console in debug mode
    if (config.DEBUG) console.error("[Monitoring] Captured error:", error, context);
  }

  /**
   * Capture a message (non-error) for Sentry.
   * @param {string} message
   * @param {string} [level] - "info", "warning", "error"
   */
  function captureMessage(message, level) {
    if (root.Sentry) {
      root.Sentry.captureMessage(message, level || "info");
    }
    if (config.DEBUG) console.info("[Monitoring] Captured message:", message);
  }


  /* ════════════════════════════════════════════════════════
   * 3. PERFORMANCE MONITORING
   * ════════════════════════════════════════════════════════ */

  function initPerformanceMonitoring() {
    if (!config.ENABLE_PERF_MONITORING) {
      if (config.DEBUG) console.info("[Monitoring] Performance monitoring disabled.");
      return;
    }

    // Wait for page to fully load before collecting metrics
    root.addEventListener("load", function () {
      // Small delay to ensure all metrics are available
      setTimeout(collectPerformanceMetrics, 1000);
    });

    // Observe Largest Contentful Paint (LCP)
    if (root.PerformanceObserver) {
      try {
        var lcpObserver = new PerformanceObserver(function (entryList) {
          var entries = entryList.getEntries();
          var lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            sendPerfMetric("lcp", Math.round(lastEntry.startTime));
          }
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      } catch (e) {
        // LCP observer not supported
      }

      // Observe First Input Delay (FID)
      try {
        var fidObserver = new PerformanceObserver(function (entryList) {
          var entries = entryList.getEntries();
          entries.forEach(function (entry) {
            sendPerfMetric("fid", Math.round(entry.processingStart - entry.startTime));
          });
        });
        fidObserver.observe({ type: "first-input", buffered: true });
      } catch (e) {
        // FID observer not supported
      }

      // Observe Cumulative Layout Shift (CLS)
      try {
        var clsValue = 0;
        var clsObserver = new PerformanceObserver(function (entryList) {
          var entries = entryList.getEntries();
          entries.forEach(function (entry) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });

        // Report CLS when page is hidden (user navigates away)
        document.addEventListener("visibilitychange", function () {
          if (document.visibilityState === "hidden") {
            sendPerfMetric("cls", Math.round(clsValue * 1000)); // Send as integer (x1000)
          }
        });
      } catch (e) {
        // CLS observer not supported
      }
    }

    if (config.DEBUG) console.info("[Monitoring] Performance monitoring initialized.");
  }

  function collectPerformanceMetrics() {
    var perf = root.performance;
    if (!perf || !perf.timing) return;

    var timing = perf.timing;

    var metrics = {
      // Navigation timing
      dns_lookup:       timing.domainLookupEnd - timing.domainLookupStart,
      tcp_connect:      timing.connectEnd - timing.connectStart,
      server_response:  timing.responseStart - timing.requestStart,
      page_download:    timing.responseEnd - timing.responseStart,
      dom_interactive:  timing.domInteractive - timing.navigationStart,
      dom_complete:     timing.domComplete - timing.navigationStart,
      page_load:        timing.loadEventEnd - timing.navigationStart,
      // Time to first byte
      ttfb:             timing.responseStart - timing.navigationStart
    };

    // Send each metric to GA4 as custom event
    Object.keys(metrics).forEach(function (key) {
      var value = metrics[key];
      if (value > 0 && value < 60000) { // Sanity check: ignore negative or >60s
        sendPerfMetric(key, value);
      }
    });

    if (config.DEBUG) console.info("[Monitoring] Performance metrics:", metrics);
  }

  /**
   * Send a performance metric to GA4.
   * @param {string} metricName
   * @param {number} value - in milliseconds
   */
  function sendPerfMetric(metricName, value) {
    trackEvent("web_vital", {
      metric_name: metricName,
      metric_value: value,
      event_category: "Web Vitals",
      non_interaction: true
    });
  }


  /* ════════════════════════════════════════════════════════
   * 4. HASH ROUTE CHANGE TRACKING
   * ════════════════════════════════════════════════════════ */

  function initRouteTracking() {
    // Track initial pageview
    var initialPath = root.location.hash ? root.location.hash.replace("#", "") : "/";
    trackPageview(initialPath);

    // Track hash changes
    root.addEventListener("hashchange", function () {
      var path = root.location.hash ? root.location.hash.replace("#", "") : "/";
      trackPageview(path);
    });

    if (config.DEBUG) console.info("[Monitoring] Route tracking initialized.");
  }


  /* ════════════════════════════════════════════════════════
   * 5. GLOBAL ERROR HANDLER
   * ════════════════════════════════════════════════════════ */

  function initGlobalErrorHandler() {
    root.addEventListener("error", function (event) {
      captureError(event.error || new Error(event.message), {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
      });
      trackEvent("js_error", {
        error_message: event.message,
        error_source: event.filename,
        event_category: "Error"
      });
    });

    root.addEventListener("unhandledrejection", function (event) {
      var error = event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));
      captureError(error, { type: "unhandled_promise_rejection" });
      trackEvent("js_error", {
        error_message: error.message,
        error_type: "unhandled_promise",
        event_category: "Error"
      });
    });

    if (config.DEBUG) console.info("[Monitoring] Global error handler initialized.");
  }


  /* ════════════════════════════════════════════════════════
   * INITIALIZATION
   * ════════════════════════════════════════════════════════ */

  initGA4();
  initSentry();
  initPerformanceMonitoring();
  initRouteTracking();
  initGlobalErrorHandler();

  /* ── Expose Monitoring API globally for use in app.js ── */
  root.EMMonitoring = Object.freeze({
    trackPageview:  trackPageview,
    trackEvent:     trackEvent,
    captureError:   captureError,
    captureMessage: captureMessage
  });

  if (config.DEBUG) {
    console.info("[Monitoring] ✅ Monitoring module fully initialized.");
    console.info("[Monitoring] GA4:", GA_ID ? "enabled" : "disabled");
    console.info("[Monitoring] Sentry:", SENTRY_DSN ? "enabled" : "disabled");
    console.info("[Monitoring] Perf:", config.ENABLE_PERF_MONITORING ? "enabled" : "disabled");
  }

})(window);
