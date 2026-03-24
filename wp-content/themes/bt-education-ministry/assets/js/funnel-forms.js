/**
 * BT Education Ministry — Funnel Form Handlers
 *
 * Handles AJAX submission for native fallback forms
 * (Offer 0 signup, Capstone application, Book Call).
 *
 * @package BT_Education_Ministry
 * @version 1.0.0
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------------ */
  /*  Helpers                                                            */
  /* ------------------------------------------------------------------ */

  function showMessage(el, type, text) {
    if (!el) return;
    el.className = 'funnel-form-message is-' + type;
    el.innerHTML = text;
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideMessage(el) {
    if (!el) return;
    el.style.display = 'none';
    el.className = 'funnel-form-message';
  }

  function setLoading(btn, loading) {
    if (!btn) return;
    if (loading) {
      btn.dataset.originalText = btn.textContent;
      btn.textContent = 'Submitting…';
      btn.disabled = true;
      btn.style.opacity = '0.7';
    } else {
      btn.textContent = btn.dataset.originalText || 'Submit';
      btn.disabled = false;
      btn.style.opacity = '';
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Generic AJAX form handler                                          */
  /* ------------------------------------------------------------------ */

  function handleFormSubmit(formId, messageId, successCallback) {
    var form = document.getElementById(formId);
    if (!form) return;

    var msgEl = document.getElementById(messageId);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hideMessage(msgEl);

      // Client-side HTML5 validation
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      setLoading(btn, true);

      var formData = new FormData(form);

      fetch(form.getAttribute('action'), {
        method: 'POST',
        body: formData,
        credentials: 'same-origin'
      })
        .then(function (resp) { return resp.json(); })
        .then(function (json) {
          setLoading(btn, false);

          if (json.success) {
            showMessage(msgEl, 'success', json.data.message || 'Success!');
            if (typeof successCallback === 'function') {
              successCallback(json.data);
            }
          } else {
            var errMsg = (json.data && json.data.message) ? json.data.message : 'Something went wrong. Please try again.';
            showMessage(msgEl, 'error', errMsg);
          }
        })
        .catch(function () {
          setLoading(btn, false);
          showMessage(msgEl, 'error', 'A network error occurred. Please check your connection and try again.');
        });
    });
  }

  /* ------------------------------------------------------------------ */
  /*  1.  Offer 0 Signup Form                                            */
  /* ------------------------------------------------------------------ */

  handleFormSubmit('btem-offer0-signup', 'btem-signup-message', function (data) {
    // Redirect to welcome page after short delay
    if (data.redirect) {
      setTimeout(function () {
        window.location.href = data.redirect;
      }, 1500);
    }
  });

  /* ------------------------------------------------------------------ */
  /*  2.  Capstone Application Form                                      */
  /* ------------------------------------------------------------------ */

  handleFormSubmit('btem-capstone-apply', 'btem-capstone-message', function (data) {
    var msgEl = document.getElementById('btem-capstone-message');

    if (data.qualification === 'qualified') {
      // Show qualified message with link to book call
      showMessage(
        msgEl,
        'success',
        data.message +
          '<br><br><a href="' + (data.redirect || (typeof btemFunnel !== 'undefined' ? btemFunnel.bookCallUrl : '/book-call/')) +
          '" class="btn btn--primary" style="margin-top:var(--space-md);display:inline-flex;">Book Your Consultation →</a>'
      );
    } else {
      showMessage(msgEl, 'info', data.message);
    }

    // Disable form after successful submission
    var form = document.getElementById('btem-capstone-apply');
    if (form) {
      Array.from(form.elements).forEach(function (el) {
        el.disabled = true;
      });
    }
  });

  /* ------------------------------------------------------------------ */
  /*  3.  Book Call Form                                                  */
  /* ------------------------------------------------------------------ */

  handleFormSubmit('btem-book-call', 'btem-booking-message', function (data) {
    // Disable form after successful submission
    var form = document.getElementById('btem-book-call');
    if (form) {
      Array.from(form.elements).forEach(function (el) {
        el.disabled = true;
      });
    }
  });

})();
