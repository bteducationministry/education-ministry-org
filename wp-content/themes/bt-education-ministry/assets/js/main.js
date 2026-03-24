/**
 * BT Education Ministry — Main JavaScript
 * @package BT_Education_Ministry
 * @version 1.0.0
 */

(function () {
  'use strict';

  /* ============================
     Mobile Menu Toggle
     ============================ */
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('.primary-nav');

  if (menuToggle && primaryNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = primaryNav.classList.toggle('is-open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('is-open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ============================
     Header Scroll Effect
     ============================ */
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        header.style.background = 'rgba(26,15,46,0.98)';
      } else {
        header.style.background = 'rgba(26,15,46,0.95)';
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* ============================
     Smooth Scroll for Anchors
     ============================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    });
  });

  /* ============================
     Filter Pills (Civic Library)
     ============================ */
  document.querySelectorAll('.filter-pill').forEach(function (pill) {
    pill.addEventListener('click', function () {
      const parent = this.closest('.filter-pills');
      if (parent) {
        parent.querySelectorAll('.filter-pill').forEach(function (p) {
          p.classList.remove('active');
        });
      }
      this.classList.add('active');

      const category = this.dataset.category;
      const cards = document.querySelectorAll('.card--resource');
      cards.forEach(function (card) {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ============================
     Donation Tier Selection
     ============================ */
  document.querySelectorAll('.donation-tier').forEach(function (tier) {
    tier.addEventListener('click', function () {
      document.querySelectorAll('.donation-tier').forEach(function (t) {
        t.classList.remove('active');
      });
      this.classList.add('active');
      const amountInput = document.querySelector('#donation-amount');
      if (amountInput) {
        amountInput.value = this.dataset.amount || '';
      }
    });
  });

  /* ============================
     Intersection Observer — Fade In
     ============================ */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.section, .card, .ladder__step').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Fade-in class
  const style = document.createElement('style');
  style.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

})();
