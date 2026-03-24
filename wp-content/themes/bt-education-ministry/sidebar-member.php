<?php
/**
 * Member Dashboard Sidebar Navigation
 * Displays navigation menu for BTPMA member platform pages
 */

if (!is_user_logged_in()) {
    return;
}

$current_user = wp_get_current_user();
// TODO: Fetch member tier for conditional menu items
$member_tier = 'Operator'; // Placeholder
$tier_level = ['Seeker' => 1, 'Operator' => 2, 'Architect' => 3, 'Steward' => 4];
$current_tier_level = $tier_level[$member_tier] ?? 1;

// Get current page for active state
$current_url = $_SERVER['REQUEST_URI'];
?>

<aside class="btpma-sidebar">
    <div class="sidebar-header">
        <a href="<?php echo home_url(); ?>" class="sidebar-logo">
            <i class="fas fa-graduation-cap"></i>
            <span>BTPMA Portal</span>
        </a>
    </div>

    <nav class="sidebar-nav">
        <ul class="nav-menu">
            <li class="<?php echo (strpos($current_url, '/dashboard') !== false) ? 'active' : ''; ?>">
                <a href="<?php echo home_url('/dashboard'); ?>">
                    <i class="fas fa-th-large"></i>
                    <span>Dashboard</span>
                </a>
            </li>

            <li class="nav-section-title">Services</li>

            <li class="<?php echo (strpos($current_url, '/trust-services') !== false) ? 'active' : ''; ?>">
                <a href="<?php echo home_url('/trust-services'); ?>">
                    <i class="fas fa-balance-scale"></i>
                    <span>Trust Services</span>
                </a>
            </li>

            <li class="<?php echo (strpos($current_url, '/active-projects') !== false) ? 'active' : ''; ?>">
                <a href="<?php echo home_url('/active-projects'); ?>">
                    <i class="fas fa-project-diagram"></i>
                    <span>Active Projects</span>
                </a>
            </li>

            <?php if ($current_tier_level >= 2) : // Operator and above ?>
            <li class="<?php echo (strpos($current_url, '/document-vault') !== false) ? 'active' : ''; ?>">
                <a href="<?php echo home_url('/document-vault'); ?>">
                    <i class="fas fa-vault"></i>
                    <span>Document Vault</span>
                </a>
            </li>
            <?php endif; ?>

            <?php if ($current_tier_level >= 3) : // Architect and above ?>
            <li class="<?php echo (strpos($current_url, '/governance-center') !== false) ? 'active' : ''; ?>">
                <a href="<?php echo home_url('/governance-center'); ?>">
                    <i class="fas fa-gavel"></i>
                    <span>Governance Center</span>
                </a>
            </li>
            <?php endif; ?>

            <li class="nav-section-title">Tools</li>

            <li class="<?php echo (strpos($current_url, '/head-steward-ai') !== false) ? 'active' : ''; ?>">
                <a href="<?php echo home_url('/head-steward-ai'); ?>">
                    <i class="fas fa-brain"></i>
                    <span>Head Steward AI</span>
                </a>
            </li>

            <li>
                <a href="https://platform.btpma.org/educate/" target="_blank">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Learning Platform</span>
                    <i class="fas fa-external-link-alt external-icon"></i>
                </a>
            </li>

            <li>
                <a href="https://aemp-dashboard.btpma.org/measure" target="_blank">
                    <i class="fas fa-chart-line"></i>
                    <span>Analytics</span>
                    <i class="fas fa-external-link-alt external-icon"></i>
                </a>
            </li>

            <li class="nav-section-title">Account</li>

            <li class="<?php echo (strpos($current_url, '/account') !== false) ? 'active' : ''; ?>">
                <a href="<?php echo home_url('/account'); ?>">
                    <i class="fas fa-user-cog"></i>
                    <span>Account Settings</span>
                </a>
            </li>

            <li>
                <a href="<?php echo wp_logout_url(home_url()); ?>">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    </nav>

    <div class="sidebar-footer">
        <div class="member-info">
            <div class="member-avatar">
                <?php echo get_avatar($current_user->ID, 40); ?>
            </div>
            <div class="member-details">
                <p class="member-name"><?php echo esc_html($current_user->display_name); ?></p>
                <p class="member-tier tier-<?php echo strtolower($member_tier); ?>"><?php echo esc_html($member_tier); ?></p>
            </div>
        </div>
    </div>
</aside>