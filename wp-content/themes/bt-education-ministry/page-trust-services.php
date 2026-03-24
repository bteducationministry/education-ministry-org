<?php
/**
 * Template Name: BTPMA Trust Services
 * Description: Trust services overview and tier-based offerings
 */

// Member-only access control
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header();

$current_user = wp_get_current_user();
$user_id = $current_user->ID;

// TODO: Fetch member tier from membership plugin/meta
$member_tier = 'Operator'; // Placeholder: Seeker, Operator, Architect, Steward
$tier_level = ['Seeker' => 1, 'Operator' => 2, 'Architect' => 3, 'Steward' => 4];
$current_tier_level = $tier_level[$member_tier] ?? 1;

// TODO: Fetch active trust services from database
$has_active_services = false; // Placeholder
?>

<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/dashboard.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<div class="btpma-dashboard-wrapper">
    <?php get_sidebar('member'); ?>
    
    <main class="btpma-dashboard-content">
        <!-- Breadcrumbs -->
        <nav class="btpma-breadcrumbs">
            <a href="<?php echo home_url(); ?>">Home</a> / 
            <a href="<?php echo home_url('/dashboard'); ?>">Dashboard</a> / 
            <span>Trust Services</span>
        </nav>

        <!-- Page Header -->
        <section class="page-header">
            <h1><i class="fas fa-balance-scale"></i> Trust Services</h1>
            <p class="page-description">Access trust education, planning, and Estate Trust Directive services based on your membership tier.</p>
        </section>

        <?php if ($has_active_services) : ?>
        <!-- Active Services Status -->
        <section class="dashboard-card active-services">
            <h2><i class="fas fa-tasks"></i> Your Active Services</h2>
            <div class="service-status-list">
                <?php
                // TODO: Loop through active services from database
                // Placeholder service status
                ?>
                <div class="service-status-item">
                    <div class="service-info">
                        <h3>Trust Planning Consultation</h3>
                        <p>Status: <span class="status-badge in-progress">In Progress</span></p>
                    </div>
                    <div class="service-actions">
                        <a href="#" class="btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        </section>
        <?php endif; ?>

        <!-- Service Offerings by Tier -->
        <section class="services-by-tier">
            <h2>Available Trust Services</h2>
            
            <!-- Seeker Tier -->
            <div class="service-tier-card <?php echo ($current_tier_level >= 1) ? 'tier-unlocked' : 'tier-locked'; ?>">
                <div class="tier-header tier-seeker">
                    <h3><i class="fas fa-seedling"></i> Seeker Tier</h3>
                    <?php if ($current_tier_level >= 1) : ?>
                        <span class="access-badge"><i class="fas fa-check-circle"></i> Your Access</span>
                    <?php else : ?>
                        <span class="locked-badge"><i class="fas fa-lock"></i> Locked</span>
                    <?php endif; ?>
                </div>
                <div class="tier-services">
                    <ul>
                        <li><i class="fas fa-check"></i> Basic trust education resources</li>
                        <li><i class="fas fa-check"></i> Introduction to Estate Trust Directive</li>
                        <li><i class="fas fa-check"></i> Trust fundamentals library</li>
                        <li><i class="fas fa-check"></i> Community forum access</li>
                    </ul>
                </div>
            </div>

            <!-- Operator Tier -->
            <div class="service-tier-card <?php echo ($current_tier_level >= 2) ? 'tier-unlocked' : 'tier-locked'; ?>">
                <div class="tier-header tier-operator">
                    <h3><i class="fas fa-tools"></i> Operator Tier</h3>
                    <?php if ($current_tier_level >= 2) : ?>
                        <span class="access-badge"><i class="fas fa-check-circle"></i> Your Access</span>
                    <?php else : ?>
                        <span class="locked-badge"><i class="fas fa-lock"></i> Upgrade Required</span>
                    <?php endif; ?>
                </div>
                <div class="tier-services">
                    <ul>
                        <li><i class="fas fa-check"></i> All Seeker benefits</li>
                        <li><i class="fas fa-check"></i> Advanced trust education courses</li>
                        <li><i class="fas fa-check"></i> Trust implementation guides</li>
                        <li><i class="fas fa-check"></i> Monthly Q&A sessions</li>
                        <li><i class="fas fa-check"></i> Basic document templates</li>
                    </ul>
                </div>
                <?php if ($current_tier_level < 2) : ?>
                <div class="tier-cta">
                    <a href="<?php echo home_url('/account'); ?>" class="btn-upgrade">Upgrade to Operator</a>
                </div>
                <?php endif; ?>
            </div>

            <!-- Architect Tier -->
            <div class="service-tier-card <?php echo ($current_tier_level >= 3) ? 'tier-unlocked' : 'tier-locked'; ?>">
                <div class="tier-header tier-architect">
                    <h3><i class="fas fa-drafting-compass"></i> Architect Tier</h3>
                    <?php if ($current_tier_level >= 3) : ?>
                        <span class="access-badge"><i class="fas fa-check-circle"></i> Your Access</span>
                    <?php else : ?>
                        <span class="locked-badge"><i class="fas fa-lock"></i> Upgrade Required</span>
                    <?php endif; ?>
                </div>
                <div class="tier-services">
                    <ul>
                        <li><i class="fas fa-check"></i> All Operator benefits</li>
                        <li><i class="fas fa-check"></i> One-on-one trust planning consultation</li>
                        <li><i class="fas fa-check"></i> Personalized trust strategy session</li>
                        <li><i class="fas fa-check"></i> Advanced document templates</li>
                        <li><i class="fas fa-check"></i> Priority support access</li>
                        <li><i class="fas fa-check"></i> Governance training modules</li>
                    </ul>
                </div>
                <?php if ($current_tier_level < 3) : ?>
                <div class="tier-cta">
                    <a href="<?php echo home_url('/account'); ?>" class="btn-upgrade">Upgrade to Architect</a>
                </div>
                <?php endif; ?>
            </div>

            <!-- Steward Tier -->
            <div class="service-tier-card <?php echo ($current_tier_level >= 4) ? 'tier-unlocked' : 'tier-locked'; ?>">
                <div class="tier-header tier-steward">
                    <h3><i class="fas fa-crown"></i> Steward Tier</h3>
                    <?php if ($current_tier_level >= 4) : ?>
                        <span class="access-badge"><i class="fas fa-check-circle"></i> Your Access</span>
                    <?php else : ?>
                        <span class="locked-badge"><i class="fas fa-lock"></i> Capstone Required</span>
                    <?php endif; ?>
                </div>
                <div class="tier-services">
                    <ul>
                        <li><i class="fas fa-check"></i> All Architect benefits</li>
                        <li><i class="fas fa-check"></i> <strong>Full Estate Trust Directive access</strong></li>
                        <li><i class="fas fa-check"></i> Comprehensive trust implementation support</li>
                        <li><i class="fas fa-check"></i> Ongoing trust management guidance</li>
                        <li><i class="fas fa-check"></i> Exclusive steward community</li>
                        <li><i class="fas fa-check"></i> Governance participation rights</li>
                        <li><i class="fas fa-check"></i> Annual trust review sessions</li>
                    </ul>
                </div>
                <?php if ($current_tier_level < 4) : ?>
                <div class="tier-cta">
                    <a href="#" class="btn-capstone">Apply for Capstone</a>
                </div>
                <?php endif; ?>
            </div>
        </section>

        <!-- Trust Resources -->
        <section class="dashboard-card trust-resources">
            <h2><i class="fas fa-book-open"></i> Trust Resources & Documentation</h2>
            <div class="resource-grid">
                <a href="<?php echo home_url('/document-vault'); ?>" class="resource-link">
                    <i class="fas fa-folder"></i>
                    <span>Trust Document Library</span>
                </a>
                <a href="https://platform.btpma.org/educate/" target="_blank" class="resource-link">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Trust Education Courses</span>
                    <span class="secure-badge-small"><i class="fas fa-lock"></i></span>
                </a>
                <a href="<?php echo home_url('/head-steward-ai'); ?>" class="resource-link">
                    <i class="fas fa-robot"></i>
                    <span>Ask AI About Trusts</span>
                </a>
                <a href="#" class="resource-link">
                    <i class="fas fa-calendar"></i>
                    <span>Schedule Consultation</span>
                </a>
            </div>
        </section>

    </main>
</div>

<?php get_footer(); ?>