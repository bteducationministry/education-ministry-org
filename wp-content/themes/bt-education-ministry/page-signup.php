<?php
/**
 * Template Name: Offer 0 - Signup
 * Description: Registration form page
 */

get_header(); ?>

<main id="main-content" class="funnel-page offer-0-signup" role="main">
    <!-- Header Section -->
    <section class="page-header" style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 60px 20px; text-align: center;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <h1 style="font-size: 2.75rem; font-weight: 700; margin-bottom: 16px;">
                Begin Your Stewardship Journey
            </h1>
            <p style="font-size: 1.25rem; opacity: 0.95;">
                Complete the form below to create your Seeker account and access the curriculum
            </p>
        </div>
    </section>

    <!-- Form Section -->
    <section class="form-section" style="padding: 80px 20px;">
        <div class="container" style="max-width: 600px; margin: 0 auto;">
            <div style="background: white; padding: 48px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="font-size: 2rem; color: #1a365d; margin-bottom: 32px; text-align: center;">
                    Create Your Account
                </h2>
                
                <!-- WPForms shortcode will be inserted here -->
                <div class="wpforms-container">
                    <?php echo do_shortcode('[wpforms id="35"]'); ?>
                </div>
                
                <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="color: #718096; font-size: 0.875rem; line-height: 1.6;">
                        By signing up, you agree to our Terms of Service and Privacy Policy. 
                        Your information is secure and will never be shared with third parties.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Trust Indicators -->
    <section class="trust-section" style="padding: 60px 20px; background: #f7fafc;">
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px; text-align: center;">
                <div>
                    <div style="font-size: 2.5rem; color: #f59e0b; margin-bottom: 8px;">🔒</div>
                    <h3 style="font-size: 1.125rem; color: #1a365d; margin-bottom: 8px;">Secure & Private</h3>
                    <p style="color: #718096; font-size: 0.875rem;">Your data is encrypted and protected</p>
                </div>
                <div>
                    <div style="font-size: 2.5rem; color: #f59e0b; margin-bottom: 8px;">⚡</div>
                    <h3 style="font-size: 1.125rem; color: #1a365d; margin-bottom: 8px;">Instant Access</h3>
                    <p style="color: #718096; font-size: 0.875rem;">Start learning immediately after signup</p>
                </div>
                <div>
                    <div style="font-size: 2.5rem; color: #f59e0b; margin-bottom: 8px;">♾️</div>
                    <h3 style="font-size: 1.125rem; color: #1a365d; margin-bottom: 8px;">Lifetime Access</h3>
                    <p style="color: #718096; font-size: 0.875rem;">All materials and future updates included</p>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
