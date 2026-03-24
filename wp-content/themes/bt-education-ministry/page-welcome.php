<?php
/**
 * Template Name: Offer 0 - Welcome
 * Description: Confirmation page with auto-redirect
 */

get_header(); ?>

<main id="main-content" class="funnel-page offer-0-welcome" role="main">
    <section class="welcome-section" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 40px 20px; background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white;">
        <div class="container" style="max-width: 800px; margin: 0 auto; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 24px;">🎉</div>
            <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 24px;">
                Welcome to Biblical Trustee Education!
            </h1>
            <p style="font-size: 1.5rem; margin-bottom: 32px; opacity: 0.95;">
                Your account has been created successfully.
            </p>
            
            <div style="background: rgba(255,255,255,0.1); padding: 32px; border-radius: 12px; margin-bottom: 32px; backdrop-filter: blur(10px);">
                <p style="font-size: 1.125rem; margin-bottom: 16px;">
                    You will be automatically redirected to your learning platform in <span id="countdown" style="font-weight: 700; color: #f59e0b;">5</span> seconds...
                </p>
                <p style="font-size: 0.875rem; opacity: 0.8;">
                    Or click below to access your dashboard now
                </p>
            </div>
            
            <a href="https://platform.btpma.org/educate/" class="cta-button" style="display: inline-block; background: #f59e0b; color: #1a365d; padding: 18px 48px; font-size: 1.25rem; font-weight: 600; border-radius: 8px; text-decoration: none; transition: transform 0.2s;">
                Access Your Dashboard →
            </a>
            
            <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.2);">
                <h3 style="font-size: 1.5rem; margin-bottom: 16px;">What's Next?</h3>
                <ul style="list-style: none; padding: 0; margin: 0; text-align: left; max-width: 500px; margin: 0 auto;">
                    <li style="padding: 12px 0; font-size: 1.125rem;">✓ Check your email for login credentials</li>
                    <li style="padding: 12px 0; font-size: 1.125rem;">✓ Complete your profile setup</li>
                    <li style="padding: 12px 0; font-size: 1.125rem;">✓ Start with Module 1: Biblical Foundations</li>
                    <li style="padding: 12px 0; font-size: 1.125rem;">✓ Join the community forum</li>
                </ul>
            </div>
        </div>
    </section>
</main>

<script>
// Auto-redirect countdown
let seconds = 5;
const countdownEl = document.getElementById('countdown');
const redirectUrl = 'https://platform.btpma.org/educate/';

const countdown = setInterval(() => {
    seconds--;
    if (countdownEl) {
        countdownEl.textContent = seconds;
    }
    
    if (seconds <= 0) {
        clearInterval(countdown);
        window.location.href = redirectUrl;
    }
}, 1000);

// Track page view
if (window.btAnalytics) {
    window.btAnalytics.track('page_view', {
        page_name: 'offer_0_welcome',
        redirect_url: redirectUrl
    });
}
</script>

<?php get_footer(); ?>
