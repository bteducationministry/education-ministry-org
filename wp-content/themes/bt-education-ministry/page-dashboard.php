<?php
/**
 * Template Name: BTPMA Member Dashboard
 * Description: Main member dashboard with stats, activity feed, and quick actions
 */

// Member-only access control
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header();

// Get current user data
$current_user = wp_get_current_user();
$user_id = $current_user->ID;
$member_name = $current_user->display_name;

// TODO: Fetch member tier from membership plugin/meta
// Example: $member_tier = get_user_meta($user_id, 'membership_tier', true);
$member_tier = 'Operator'; // Placeholder
$renewal_date = 'December 31, 2026'; // TODO: Fetch from membership data

// TODO: Fetch dynamic stats from database
$active_projects = 3; // Placeholder
$total_documents = 12; // Placeholder
$upcoming_events = 2; // Placeholder
$ai_queries_remaining = 20; // Placeholder
?>

<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/dashboard.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<div class="btpma-dashboard-wrapper">
    <?php get_sidebar('member'); ?>
    
    <main class="btpma-dashboard-content">
        <!-- Breadcrumbs -->
        <nav class="btpma-breadcrumbs">
            <a href="<?php echo home_url(); ?>">Home</a> / <span>Dashboard</span>
        </nav>

        <!-- Welcome Section -->
        <section class="dashboard-welcome">
            <h1>Welcome back, <?php echo esc_html($member_name); ?>!</h1>
            <p class="member-tier-badge tier-<?php echo strtolower($member_tier); ?>">
                <i class="fas fa-shield-alt"></i> <?php echo esc_html($member_tier); ?> Member
            </p>
        </section>

        <!-- Quick Stats Cards -->
        <section class="dashboard-stats-grid">
            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-project-diagram"></i>
                </div>
                <div class="stat-content">
                    <h3><?php echo $active_projects; ?></h3>
                    <p>Active Projects</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="stat-content">
                    <h3><?php echo $total_documents; ?></h3>
                    <p>Documents</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-calendar-check"></i>
                </div>
                <div class="stat-content">
                    <h3><?php echo $upcoming_events; ?></h3>
                    <p>Upcoming Events</p>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="stat-content">
                    <h3><?php echo $ai_queries_remaining; ?></h3>
                    <p>AI Queries Left</p>
                </div>
            </div>
        </section>

        <!-- Quick Actions -->
        <section class="dashboard-quick-actions">
            <h2>Quick Actions</h2>
            <div class="action-cards-grid">
                <a href="https://platform.btpma.org/educate/" target="_blank" class="action-card">
                    <span class="secure-badge"><i class="fas fa-lock"></i> Secure Portal</span>
                    <i class="fas fa-graduation-cap"></i>
                    <h3>Access LMS</h3>
                    <p>Continue your learning journey</p>
                </a>

                <a href="<?php echo home_url('/head-steward-ai'); ?>" class="action-card">
                    <span class="secure-badge"><i class="fas fa-lock"></i> Secure Portal</span>
                    <i class="fas fa-brain"></i>
                    <h3>AI Assistant</h3>
                    <p>Get instant guidance</p>
                </a>

                <a href="<?php echo home_url('/document-vault'); ?>" class="action-card">
                    <i class="fas fa-folder-open"></i>
                    <h3>Document Vault</h3>
                    <p>Access your secure files</p>
                </a>

                <a href="https://aemp-dashboard.btpma.org/measure" target="_blank" class="action-card">
                    <span class="secure-badge"><i class="fas fa-lock"></i> Secure Portal</span>
                    <i class="fas fa-chart-line"></i>
                    <h3>Analytics</h3>
                    <p>View your progress metrics</p>
                </a>
            </div>
        </section>

        <!-- Two Column Layout -->
        <div class="dashboard-two-column">
            <!-- Recent Activity Feed -->
            <section class="dashboard-card activity-feed">
                <h2><i class="fas fa-history"></i> Recent Activity</h2>
                <div class="activity-list">
                    <?php
                    // TODO: Fetch recent activity from database
                    // Placeholder activity items
                    $activities = [
                        ['icon' => 'fa-book', 'text' => 'Completed "Trust Fundamentals" course', 'time' => '2 hours ago'],
                        ['icon' => 'fa-file-upload', 'text' => 'Uploaded document to vault', 'time' => '1 day ago'],
                        ['icon' => 'fa-project-diagram', 'text' => 'Updated AEMP project status', 'time' => '3 days ago'],
                        ['icon' => 'fa-comment', 'text' => 'Used Head Steward AI assistant', 'time' => '5 days ago'],
                    ];
                    
                    foreach ($activities as $activity) :
                    ?>
                    <div class="activity-item">
                        <i class="fas <?php echo $activity['icon']; ?>"></i>
                        <div class="activity-details">
                            <p><?php echo esc_html($activity['text']); ?></p>
                            <span class="activity-time"><?php echo esc_html($activity['time']); ?></span>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- Membership Status & Notifications -->
            <div class="dashboard-sidebar-cards">
                <!-- Membership Status Card -->
                <section class="dashboard-card membership-status">
                    <h2><i class="fas fa-id-card"></i> Membership Status</h2>
                    <div class="membership-details">
                        <div class="detail-row">
                            <span class="label">Tier:</span>
                            <span class="value tier-badge"><?php echo esc_html($member_tier); ?></span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Renewal Date:</span>
                            <span class="value"><?php echo esc_html($renewal_date); ?></span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Status:</span>
                            <span class="value status-active"><i class="fas fa-check-circle"></i> Active</span>
                        </div>
                    </div>
                    <a href="<?php echo home_url('/account'); ?>" class="btn-secondary">Manage Account</a>
                </section>

                <!-- Notifications/Announcements -->
                <section class="dashboard-card notifications">
                    <h2><i class="fas fa-bell"></i> Announcements</h2>
                    <div class="notification-list">
                        <?php
                        // TODO: Fetch announcements from database
                        // Placeholder notifications
                        ?>
                        <div class="notification-item">
                            <i class="fas fa-info-circle"></i>
                            <p>New governance training available in LMS</p>
                        </div>
                        <div class="notification-item">
                            <i class="fas fa-calendar"></i>
                            <p>Monthly member webinar: March 30, 2026</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </main>
</div>

<?php get_footer(); ?>