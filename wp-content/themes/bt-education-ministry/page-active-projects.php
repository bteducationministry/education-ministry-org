<?php
/**
 * Template Name: BTPMA Active Projects
 * Description: Member's AEMP projects dashboard with status tracking
 */

// Member-only access control
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header();

$current_user = wp_get_current_user();
$user_id = $current_user->ID;

// TODO: Fetch projects from database
// Example query: $projects = get_user_aemp_projects($user_id);
// Placeholder project data
$projects = [
    [
        'id' => 1,
        'title' => 'Community Garden Initiative',
        'status' => 'active',
        'progress' => 65,
        'category' => 'Community Development',
        'start_date' => 'January 15, 2026',
        'last_updated' => '2 days ago'
    ],
    [
        'id' => 2,
        'title' => 'Youth Education Program',
        'status' => 'planning',
        'progress' => 30,
        'category' => 'Education',
        'start_date' => 'March 1, 2026',
        'last_updated' => '5 days ago'
    ],
    [
        'id' => 3,
        'title' => 'Local Business Cooperative',
        'status' => 'completed',
        'progress' => 100,
        'category' => 'Economic Development',
        'start_date' => 'October 10, 2025',
        'last_updated' => '1 week ago'
    ],
];

$status_filter = isset($_GET['status']) ? sanitize_text_field($_GET['status']) : 'all';
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
            <span>Active Projects</span>
        </nav>

        <!-- Page Header -->
        <section class="page-header">
            <div class="header-content">
                <h1><i class="fas fa-project-diagram"></i> Active Projects</h1>
                <p class="page-description">Manage and track your AEMP (Abacus Economic Mobility Platform) projects.</p>
            </div>
            <div class="header-actions">
                <a href="https://aemp-dashboard.btpma.org/measure" target="_blank" class="btn-primary">
                    <i class="fas fa-chart-line"></i> View Analytics
                    <span class="secure-badge-inline"><i class="fas fa-lock"></i></span>
                </a>
            </div>
        </section>

        <!-- Filter Bar -->
        <section class="filter-bar">
            <div class="filter-group">
                <label>Filter by Status:</label>
                <div class="filter-buttons">
                    <a href="?status=all" class="filter-btn <?php echo ($status_filter === 'all') ? 'active' : ''; ?>">All</a>
                    <a href="?status=planning" class="filter-btn <?php echo ($status_filter === 'planning') ? 'active' : ''; ?>">Planning</a>
                    <a href="?status=active" class="filter-btn <?php echo ($status_filter === 'active') ? 'active' : ''; ?>">Active</a>
                    <a href="?status=completed" class="filter-btn <?php echo ($status_filter === 'completed') ? 'active' : ''; ?>">Completed</a>
                </div>
            </div>
        </section>

        <!-- Projects Grid -->
        <section class="projects-grid">
            <?php 
            foreach ($projects as $project) :
                // Apply status filter
                if ($status_filter !== 'all' && $project['status'] !== $status_filter) {
                    continue;
                }
            ?>
            <div class="project-card status-<?php echo esc_attr($project['status']); ?>">
                <div class="project-header">
                    <h3><?php echo esc_html($project['title']); ?></h3>
                    <span class="status-indicator status-<?php echo esc_attr($project['status']); ?>">
                        <?php 
                        $status_icons = [
                            'planning' => 'fa-clipboard-list',
                            'active' => 'fa-play-circle',
                            'completed' => 'fa-check-circle'
                        ];
                        ?>
                        <i class="fas <?php echo $status_icons[$project['status']]; ?>"></i>
                        <?php echo ucfirst($project['status']); ?>
                    </span>
                </div>

                <div class="project-meta">
                    <span class="project-category">
                        <i class="fas fa-tag"></i> <?php echo esc_html($project['category']); ?>
                    </span>
                    <span class="project-date">
                        <i class="fas fa-calendar"></i> Started: <?php echo esc_html($project['start_date']); ?>
                    </span>
                </div>

                <div class="project-progress">
                    <div class="progress-header">
                        <span>Progress</span>
                        <span class="progress-percentage"><?php echo $project['progress']; ?>%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: <?php echo $project['progress']; ?>%;"></div>
                    </div>
                </div>

                <div class="project-footer">
                    <span class="last-updated">
                        <i class="fas fa-clock"></i> Updated <?php echo esc_html($project['last_updated']); ?>
                    </span>
                    <div class="project-actions">
                        <a href="#" class="action-btn" title="View Details">
                            <i class="fas fa-eye"></i>
                        </a>
                        <a href="#" class="action-btn" title="Update Status">
                            <i class="fas fa-edit"></i>
                        </a>
                        <a href="#" class="action-btn" title="Add Notes">
                            <i class="fas fa-sticky-note"></i>
                        </a>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>

            <?php if (empty($projects) || ($status_filter !== 'all' && count(array_filter($projects, function($p) use ($status_filter) { return $p['status'] === $status_filter; })) === 0)) : ?>
            <div class="no-projects-message">
                <i class="fas fa-folder-open"></i>
                <h3>No projects found</h3>
                <p>You don't have any <?php echo ($status_filter !== 'all') ? $status_filter : ''; ?> projects yet.</p>
            </div>
            <?php endif; ?>
        </section>

        <!-- Related Resources -->
        <section class="dashboard-card related-resources">
            <h2><i class="fas fa-link"></i> Related Resources</h2>
            <div class="resource-grid">
                <a href="https://platform.btpma.org/educate/" target="_blank" class="resource-link">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Project Management Courses</span>
                    <span class="secure-badge-small"><i class="fas fa-lock"></i></span>
                </a>
                <a href="<?php echo home_url('/document-vault'); ?>" class="resource-link">
                    <i class="fas fa-folder"></i>
                    <span>Project Documents</span>
                </a>
                <a href="<?php echo home_url('/head-steward-ai'); ?>" class="resource-link">
                    <i class="fas fa-robot"></i>
                    <span>Ask AI for Project Help</span>
                </a>
                <a href="https://aemp-dashboard.btpma.org/measure" target="_blank" class="resource-link">
                    <i class="fas fa-chart-bar"></i>
                    <span>Detailed Analytics</span>
                    <span class="secure-badge-small"><i class="fas fa-lock"></i></span>
                </a>
            </div>
        </section>

    </main>
</div>

<?php get_footer(); ?>