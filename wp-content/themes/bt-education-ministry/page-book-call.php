<?php
/**
 * Template Name: Capstone - Book Call
 * Description: Consultation booking form page
 */

get_header(); ?>

<main id="main-content" class="funnel-page capstone-book-call" role="main">
    <!-- Header Section -->
    <section class="page-header" style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 60px 20px; text-align: center;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <h1 style="font-size: 2.75rem; font-weight: 700; margin-bottom: 16px;">
                Schedule Your Consultation
            </h1>
            <p style="font-size: 1.25rem; opacity: 0.95;">
                Book a complimentary 45-minute strategy session with our estate planning experts
            </p>
        </div>
    </section>

    <!-- Form Section -->
    <section class="form-section" style="padding: 80px 20px;">
        <div class="container" style="max-width: 700px; margin: 0 auto;">
            <div style="background: white; padding: 48px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h2 style="font-size: 2rem; color: #1a365d; margin-bottom: 24px; text-align: center;">
                    Book Your Call
                </h2>
                
                <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; margin-bottom: 32px; border-radius: 4px;">
                    <h3 style="color: #1e40af; font-size: 1.125rem; margin-bottom: 8px;">What to Expect:</h3>
                    <ul style="color: #1e3a8a; font-size: 0.875rem; line-height: 1.8; margin: 0; padding-left: 20px;">
                        <li>Comprehensive review of your current estate planning situation</li>
                        <li>Discussion of your family's unique goals and concerns</li>
                        <li>Overview of biblical trust structures and asset protection strategies</li>
                        <li>Custom recommendations for your specific circumstances</li>
                        <li>Clear next steps and timeline for implementation</li>
                    </ul>
                </div>
                
                <!-- WPForms shortcode will be inserted here -->
                <div class="wpforms-container">
                    <?php echo do_shortcode('[wpforms id="37"]'); ?>
                </div>
                
                <div style="margin-top: 32px; padding-top: 32px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <p style="color: #718096; font-size: 0.875rem; line-height: 1.6;">
                        <strong>Note:</strong> This consultation is complimentary and comes with no obligation. 
                        We'll confirm your appointment via email within 24 hours.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section" style="padding: 60px 20px; background: #f7fafc;">
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            <h2 style="font-size: 2rem; text-align: center; margin-bottom: 48px; color: #1a365d;">
                Why Schedule a Consultation?
            </h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 32px;">
                <div style="background: white; padding: 32px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-size: 2.5rem; margin-bottom: 16px;">🎯</div>
                    <h3 style="font-size: 1.25rem; color: #1a365d; margin-bottom: 12px;">Personalized Strategy</h3>
                    <p style="color: #4a5568; font-size: 0.875rem; line-height: 1.6;">Get custom recommendations based on your unique family situation and financial goals</p>
                </div>
                
                <div style="background: white; padding: 32px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-size: 2.5rem; margin-bottom: 16px;">💡</div>
                    <h3 style="font-size: 1.25rem; color: #1a365d; margin-bottom: 12px;">Expert Guidance</h3>
                    <p style="color: #4a5568; font-size: 0.875rem; line-height: 1.6;">Work directly with experienced estate planning professionals who understand biblical stewardship</p>
                </div>
                
                <div style="background: white; padding: 32px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <div style="font-size: 2.5rem; margin-bottom: 16px;">⚡</div>
                    <h3 style="font-size: 1.25rem; color: #1a365d; margin-bottom: 12px;">Clear Action Plan</h3>
                    <p style="color: #4a5568; font-size: 0.875rem; line-height: 1.6;">Leave with concrete next steps and a timeline for protecting your family's legacy</p>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
