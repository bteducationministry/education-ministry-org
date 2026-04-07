/**
 * ═══════════════════════════════════════════════════════════
 * Education Ministry — Application Configuration
 * ═══════════════════════════════════════════════════════════
 *
 * Environment-aware configuration for the React SPA.
 * All configurable values are centralized here — no hardcoded
 * URLs or keys should exist in app.js.
 *
 * ENVIRONMENTS:
 *   production  — app.educationministry.org  (default)
 *   staging     — staging-app.educationministry.org
 *   development — localhost / local dev server
 *
 * To override the environment, set window.__ENV__ before this
 * script loads, or it will auto-detect from the hostname.
 * ═══════════════════════════════════════════════════════════
 */

(function (root) {
  "use strict";

  /* ── Environment Detection ── */
  var hostname = root.location ? root.location.hostname : "";

  var detectedEnv;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    detectedEnv = "development";
  } else if (hostname.indexOf("staging") !== -1) {
    detectedEnv = "staging";
  } else {
    detectedEnv = "production";
  }

  var ENV = root.__ENV__ || detectedEnv;

  /* ── Per-Environment Settings ── */
  var envConfigs = {
    production: {
      API_BASE_URL:       "https://api.educationministry.org",
      APP_DOMAIN:         "app.educationministry.org",
      MAIN_SITE_URL:      "https://educationministry.org",
      PLATFORM_LOGIN_URL: "https://platform.btpma.org/login",
      CONTACT_EMAIL:      "info@educationministry.org",
      STRIPE_PUBLISHABLE_KEY: "",  // Set to pk_live_... when ready
      COPYRIGHT_YEAR:     "2026",
      ORG_NAME:           "BT Education Ministry",
      ORG_LEGAL:          "Bodhi Tree Education Ministry",
      ORG_DOMAIN:         "educationministry.org",
      DEBUG:              false
    },
    staging: {
      API_BASE_URL:       "https://staging-api.educationministry.org",
      APP_DOMAIN:         "staging-app.educationministry.org",
      MAIN_SITE_URL:      "https://staging.educationministry.org",
      PLATFORM_LOGIN_URL: "https://staging-platform.btpma.org/login",
      CONTACT_EMAIL:      "info@educationministry.org",
      STRIPE_PUBLISHABLE_KEY: "",  // Set to pk_test_... for staging
      COPYRIGHT_YEAR:     "2026",
      ORG_NAME:           "BT Education Ministry",
      ORG_LEGAL:          "Bodhi Tree Education Ministry",
      ORG_DOMAIN:         "educationministry.org",
      DEBUG:              true
    },
    development: {
      API_BASE_URL:       "http://localhost:3001",
      APP_DOMAIN:         "localhost",
      MAIN_SITE_URL:      "http://localhost:8000",
      PLATFORM_LOGIN_URL: "http://localhost:3002/login",
      CONTACT_EMAIL:      "dev@educationministry.org",
      STRIPE_PUBLISHABLE_KEY: "",  // Set to pk_test_... for dev
      COPYRIGHT_YEAR:     "2026",
      ORG_NAME:           "BT Education Ministry",
      ORG_LEGAL:          "Bodhi Tree Education Ministry",
      ORG_DOMAIN:         "educationministry.org",
      DEBUG:              true
    }
  };

  var activeConfig = envConfigs[ENV] || envConfigs.production;

  /* ── Derived Endpoints ── */
  activeConfig.SIGNUP_ENDPOINT = activeConfig.API_BASE_URL + "/signup";
  activeConfig.MEASURE_ENDPOINT = activeConfig.API_BASE_URL + "/measure";

  /* ── Frozen Config Object ── */
  var AppConfig = Object.freeze(
    Object.assign({ ENV: ENV }, activeConfig)
  );

  /* ── Expose Globally ── */
  root.AppConfig = AppConfig;

  /* ── Debug Logging ── */
  if (AppConfig.DEBUG) {
    console.info("[AppConfig] Environment:", AppConfig.ENV);
    console.info("[AppConfig] API:", AppConfig.API_BASE_URL);
  }

})(window);
