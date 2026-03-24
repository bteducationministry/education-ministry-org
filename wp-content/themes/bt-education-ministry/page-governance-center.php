<?php
/**
 * Template Name: BTPMA Governance Center
 * Description: Governance documents, policies, and decision-making interface
 */

// Member-only access control - Architect tier and above
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

// TODO: Check tier access - Architect and Steward only
// Example: if (!current_user_can('access_governance_center')) { wp_die('Access restricted to Architect and Steward members'); }

get_header();

$current_user = wp_get_current_user();
$user_id = $current_user->ID;

// TODO: Fetch member tier
$member_tier = 'Architect'; // Placeholder: Architect or Steward
$is_steward = ($member_tier === 'Steward');

// TODO: Fetch governance documents from database
$governance_docs = [
    ['name' => 'BTPMA Bylaws', 'type' => 'Bylaws', 'updated' => 'January 2026', 'size' => '1.2 MB'],
    ['name' => 'Membership Policy', 'type' => 'Policy', 'updated' => 'February 2026', 'size' => '456 KB'],
    ['name' => 'Financial Procedures', 'type' => 'Procedure', 'updated' => 'March 2026', 'size' => '890 KB'],
    ['name' => 'Code of Conduct', 'type' => 'Policy', 'updated' => 'December 2025', 'size' => '234 KB'],
];

// TODO: Fetch active votes/decisions
$active_votes = [
    ['id' => 1, 'title' => 'Q2 2026 Budget Approval', 'deadline' => 'March 31, 2026', 'status' => 'open'],
    ['id' => 2, 'title' => 'New Committee Formation', 'deadline' => 'April 15, 2026', 'status' => 'open'],
];

// TODO: Fetch upcoming meetings
$meetings = [
    ['title' => 'Monthly Governance Meeting', 'date' => 'March 30, 2026', 'time' => '7:00 PM EST'],
    ['title' => 'Finance Committee Review', 'date' => 'April 5, 2026', 'time' => '6:00 PM EST'],
];
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
            <span>Governance Center</span>
        </nav>

        <!-- Page Header -->
        <section class="page-header">
            <div class="header-content">
                <h1><i class="fas fa-gavel"></i> Governance Center</h1>
                <p class="page-description">Access governance documents, participate in decision-making, and stay informed about organizational policies.</p>
            </div>
            <div class="header-badge">
                <span class="access-badge">
                    <i class="fas fa-shield-alt"></i> <?php echo $is_steward ? 'Full Governance Access' : 'Governance Access'; ?>
                </span>
            </div>
        </section>

        <?php if ($is_steward && !empty($active_votes)) : ?>
        <!-- Active Votes/Decisions (Steward Only) -->
        <section class="dashboard-card active-votes">
            <h2><i class="fas fa-vote-yea"></i> Active Votes & Decisions</h2>
            <div class="votes-list">
                <?php foreach ($active_votes as $vote) : ?>
                <div class="vote-item">
                    <div class="vote-info">
                        <h3><?php echo esc_html($vote['title']); ?></h3>
                        <p class="vote-deadline">
                            <i class="fas fa-clock"></i> Deadline: <?php echo esc_html($vote['deadline']); ?>
                        </p>
                    </div>
                    <div class="vote-actions">
                        <span class="status-badge status-<?php echo esc_attr($vote['status']); ?>">
                            <?php echo ucfirst($vote['status']); ?>
                        </span>
                        <a href="#" class="btn-primary">Cast Vote</a>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </section>
        <?php endif; ?>

        <!-- Two Column Layout -->
        <div class="governance-two-column">
            <!-- Policies & Procedures Library -->
            <section class="dashboard-card governance-library">
                <h2><i class="fas fa-book"></i> Policies & Procedures</h2>
                <div class="document-list">
                    <?php foreach ($governance_docs as $doc) : ?>
                    <div class="governance-doc-item">
                        <div class="doc-icon">
                            <i class="fas fa-file-alt"></i>
                        </div>
                        <div class="doc-details">
                            <h4><?php echo esc_html($doc['name']); ?></h4>
                            <p class="doc-meta">
                                <span class="doc-type"><?php echo esc_html($doc['type']); ?></span> • 
                                <span class="doc-updated">Updated <?php echo esc_html($doc['updated']); ?></span> • 
                                <span class="doc-size"><?php echo esc_html($doc['size']); ?></span>
                            </p>
                        </div>
                        <div class="doc-actions">
                            <a href="#" class="action-btn" title="View">
                                <i class="fas fa-eye"></i>
                            </a>
                            <a href="#" class="action-btn" title="Download">
                                <i class="fas fa-download"></i>
                            </a>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </section>

            <!-- Sidebar Cards -->
            <div class="governance-sidebar">
                <!-- Upcoming Meetings -->
                <section class="dashboard-card meetings-card">
                    <h2><i class="fas fa-calendar-alt"></i> Upcoming Meetings</h2>
                    <div class="meetings-list">
                        <?php foreach ($meetings as $meeting) : ?>
                        <div class="meeting-item">
                            <h4><?php echo esc_html($meeting['title']); ?></h4>
                            <p class="meeting-datetime">
                                <i class="fas fa-calendar"></i> <?php echo esc_html($meeting['date']); ?><br>
                                <i class="fas fa-clock"></i> <?php echo esc_html($meeting['time']); ?>
                            </p>
                        </div>
                        <?php endforeach; ?>
                    </div>
                    <a href="#" class="btn-secondary">View All Meetings</a>
                </section>

                <!-- Meeting Minutes -->
                <section class="dashboard-card minutes-card">
                    <h2><i class="fas fa-file-signature"></i> Meeting Minutes</h2>
                    <div class="minutes-list">
                        <a href="#" class="minute-link">
                            <i class="fas fa-file-pdf"></i> February 2026 Minutes
                        </a>
                        <a href="#" class="minute-link">
                            <i class="fas fa-file-pdf"></i> January 2026 Minutes
                        </a>
                        <a href="#" class="minute-link">
                            <i class="fas fa-file-pdf"></i> December 2025 Minutes
                        </a>
                    </div>
                    <a href="#" class="btn-secondary">View Archive</a>
                </section>
            </div>
        </div>

        <!-- Committee Information -->
        <section class="dashboard-card committees-section">
            <h2><i class="fas fa-users"></i> Committees</h2>
            <div class="committees-grid">
                <div class="committee-card">
                    <h3>Finance Committee</h3>
                    <p>Oversees financial planning, budgeting, and fiscal responsibility.</p>
                    <p class="committee-members"><i class="fas fa-user"></i> 5 Members</p>
                    <?php if ($is_steward) : ?>
                    <a href="#" class="btn-secondary">View Details</a>
                    <?php endif; ?>
                </div>
                <div class="committee-card">
                    <h3>Education Committee</h3>
                    <p>Develops and oversees educational programs and curriculum.</p>
                    <p class="committee-members"><i class="fas fa-user"></i> 7 Members</p>
                    <?php if ($is_steward) : ?>
                    <a href="#" class="btn-secondary">View Details</a>
                    <?php endif; ?>
                </div>
                <div class="committee-card">
                    <h3>Membership Committee</h3>
                    <p>Manages membership applications, retention, and engagement.</p>
                    <p class="committee-members"><i class="fas fa-user"></i> 4 Members</p>
                    <?php if ($is_steward) : ?>
                    <a href="#" class="btn-secondary">View Details</a>
                    <?php endif; ?>
                </div>
            </div>
        </section>

        <!-- Governance Training Resources -->
        <section class="dashboard-card training-resources">
            <h2><i class="fas fa-graduation-cap"></i> Governance Training</h2>
            <div class="resource-grid">
                <a href="https://platform.btpma.org/educate/" target="_blank" class="resource-link">
                    <i class="fas fa-book-open"></i>
                    <span>Governance Fundamentals Course</span>
                    <span class="secure-badge-small"><i class="fas fa-lock"></i></span>
                </a>
                <a href="#" class="resource-link">
                    <i class="fas fa-video"></i>
                    <span>Board Member Training Videos</span>
                </a>
                <a href="#" class="resource-link">
                    <i class="fas fa-file-alt"></i>
                    <span>Governance Best Practices Guide</span>
                </a>
                <a href="<?php echo home_url('/head-steward-ai'); ?>" class="resource-link">
                    <i class="fas fa-robot"></i>
                    <span>Ask AI About Governance</span>
                </a>
            </div>
        </section>

    </main>
</div>

<?php get_footer(); ?>