<?php
/**
 * Template Name: Capstone - Apply
 * Description: Capstone application form page
 */

get_header(); ?>

<main id="main-content" class="funnel-page capstone-apply" role="main">
    <!-- Header Section -->
    <section class="page-header" style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 60px 20px; text-align: center;">
        <div class="container" style="max-width: 1200px; margin: 0 auto;">
            <h1 style="font-size: 2.75rem; font-weight: 700; margin-bottom: 16px;">
                Capstone Program Application
            </h1>
            <p style="font-size: 1.25rem; opacity: 0.95;">
                Complete the application below to be considered for this exclusive program
            </p>
        </div>
    </section>

    <!-- Form Section -->
    <section class="form-section" style="padding: 80px 20px;">
        <div class="container" style="max-width: 800px; margin: 0 auto;">
            <div style="background: white; padding: 48px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 32px; border-radius: 4px;">
                    <p style="color: #92400e; font-size: 0.875rem; line-height: 1.6; margin: 0;">
                        <strong>Please note:</strong> All information provided is confidential and will be used solely for evaluating your application. 
                        A member of our team will review your submission and contact you within 2-3 business days.
                    </p>
                </div>
                
                <h2 style="font-size: 2rem; color: #1a365d; margin-bottom: 32px; text-align: center;">
                    Application Form
                </h2>
                
                <!-- WPForms shortcode will be inserted here -->
                <div class="wpforms-container">
                    <?php echo do_shortcode('[wpforms id="36"]'); ?>
                </div>
            </div>
        </div>
    </section>

    <!-- What Happens Next Section -->
    <section class="next-steps-section" style="padding: 60px 20px; background: #f7fafc;">
        <div class="container" style="max-width: 1000px; margin: 0 auto;">
            <h2 style="font-size: 2rem; text-align: center; margin-bottom: 48px; color: #1a365d;">
                What Happens After You Apply
            </h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px;">
                <div style="text-align: center;">
                    <div style="background: #2c5282; color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem; margin: 0 auto 16px;">1</div>
                    <h3 style="font-size: 1.25rem; color: #1a365d; margin-bottom: 12px;">Application Review</h3>
                    <p style="color: #4a5568; font-size: 0.875rem; line-height: 1.6;">Our team reviews your application within 2-3 business days</p>
                </div>
                
                <div style="text-align: center;">
                    <div style="background: #2c5282; color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem; margin: 0 auto 16px;">2</div>
                    <h3 style="font-size: 1.25rem; color: #1a365d; margin-bottom: 12px;">Qualification Call</h3>
                    <p style="color: #4a5568; font-size: 0.875rem; line-height: 1.6;">If qualified, we'll schedule a consultation to discuss your needs</p>
                </div>
                
                <div style="text-align: center;">
                    <div style="background: #2c5282; color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem; margin: 0 auto 16px;">3</div>
                    <h3 style="font-size: 1.25rem; color: #1a365d; margin-bottom: 12px;">Custom Proposal</h3>
                    <p style="color: #4a5568; font-size: 0.875rem; line-height: 1.6;">Receive a tailored estate planning proposal for your family</p>
                </div>
                
                <div style="text-align: center;">
                    <div style="background: #2c5282; color: white; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem; margin: 0 auto 16px;">4</div>
                    <h3 style="font-size: 1.25rem; color: #1a365d; margin-bottom: 12px;">Implementation</h3>
                    <p style="color: #4a5568; font-size: 0.875rem; line-height: 1.6;">Begin the process of protecting your family's legacy</p>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
