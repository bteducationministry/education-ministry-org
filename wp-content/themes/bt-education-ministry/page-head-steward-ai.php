<?php
/**
 * Template Name: BTPMA Head Steward AI
 * Description: AI assistant interface with usage limits by tier
 */

// Member-only access control
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header();

$current_user = wp_get_current_user();
$user_id = $current_user->ID;

// TODO: Fetch member tier and usage data
$member_tier = 'Operator'; // Placeholder
$usage_limits = [
    'Seeker' => ['limit' => 5, 'period' => 'month'],
    'Operator' => ['limit' => 25, 'period' => 'month'],
    'Architect' => ['limit' => 100, 'period' => 'month'],
    'Steward' => ['limit' => 'Unlimited', 'period' => 'month'],
];

$current_limit = $usage_limits[$member_tier];
$queries_used = 8; // TODO: Fetch from database
$queries_remaining = ($current_limit['limit'] === 'Unlimited') ? 'Unlimited' : ($current_limit['limit'] - $queries_used);

// TODO: Fetch recent conversation history
$recent_conversations = [
    ['id' => 1, 'title' => 'Trust formation questions', 'date' => 'March 20, 2026'],
    ['id' => 2, 'title' => 'AEMP project guidance', 'date' => 'March 18, 2026'],
    ['id' => 3, 'title' => 'Membership tier benefits', 'date' => 'March 15, 2026'],
];

// Quick prompt templates
$quick_prompts = [
    'Explain the Estate Trust Directive',
    'How do I start an AEMP project?',
    'What are the benefits of upgrading my membership?',
    'Help me understand governance policies',
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
            <span>Head Steward AI</span>
        </nav>

        <!-- Page Header -->
        <section class="page-header">
            <div class="header-content">
                <h1><i class="fas fa-brain"></i> Head Steward AI Assistant</h1>
                <p class="page-description">Get instant guidance on trusts, projects, governance, and membership questions.</p>
            </div>
            <div class="header-badge">
                <span class="usage-badge">
                    <i class="fas fa-chart-pie"></i> 
                    <?php echo esc_html($queries_remaining); ?> queries remaining this <?php echo $current_limit['period']; ?>
                </span>
            </div>
        </section>

        <!-- AI Capabilities Overview -->
        <section class="dashboard-card ai-capabilities">
            <h2><i class="fas fa-lightbulb"></i> What Can Head Steward AI Help With?</h2>
            <div class="capabilities-grid">
                <div class="capability-item">
                    <i class="fas fa-balance-scale"></i>
                    <h3>Trust Education</h3>
                    <p>Learn about Estate Trust Directives, trust formation, and trust management.</p>
                </div>
                <div class="capability-item">
                    <i class="fas fa-project-diagram"></i>
                    <h3>AEMP Projects</h3>
                    <p>Get guidance on planning, executing, and managing your economic mobility projects.</p>
                </div>
                <div class="capability-item">
                    <i class="fas fa-gavel"></i>
                    <h3>Governance</h3>
                    <p>Understand policies, procedures, and organizational governance structures.</p>
                </div>
                <div class="capability-item">
                    <i class="fas fa-user-shield"></i>
                    <h3>Membership</h3>
                    <p>Learn about membership tiers, benefits, and how to maximize your membership.</p>
                </div>
            </div>
        </section>

        <!-- Usage Limits by Tier -->
        <section class="dashboard-card usage-limits">
            <h2><i class="fas fa-layer-group"></i> Usage Limits by Membership Tier</h2>
            <div class="tier-limits-grid">
                <?php foreach ($usage_limits as $tier => $limit) : ?>
                <div class="tier-limit-card <?php echo ($tier === $member_tier) ? 'current-tier' : ''; ?>">
                    <h3><?php echo esc_html($tier); ?></h3>
                    <p class="limit-amount"><?php echo esc_html($limit['limit']); ?></p>
                    <p class="limit-period">queries per <?php echo esc_html($limit['period']); ?></p>
                    <?php if ($tier === $member_tier) : ?>
                    <span class="current-tier-badge"><i class="fas fa-check-circle"></i> Your Tier</span>
                    <?php endif; ?>
                </div>
                <?php endforeach; ?>
            </div>
            <?php if ($member_tier !== 'Steward') : ?>
            <div class="upgrade-cta">
                <p><i class="fas fa-arrow-up"></i> Want unlimited AI queries? <a href="<?php echo home_url('/account'); ?>">Upgrade to Steward</a></p>
            </div>
            <?php endif; ?>
        </section>

        <!-- Main AI Interface -->
        <section class="dashboard-card ai-interface">
            <h2><i class="fas fa-comments"></i> Chat with Head Steward AI</h2>
            
            <!-- External Platform Link -->
            <div class="external-platform-notice">
                <div class="notice-content">
                    <i class="fas fa-external-link-alt"></i>
                    <div>
                        <h3>Access Full AI Interface</h3>
                        <p>The complete Head Steward AI chat interface is available on our secure platform.</p>
                    </div>
                </div>
                <a href="https://platform.btpma.org/head-steward-ai/" target="_blank" class="btn-primary btn-large">
                    Launch AI Assistant
                    <span class="secure-badge-inline"><i class="fas fa-lock"></i> Secure Portal</span>
                </a>
            </div>

            <!-- Quick Prompts -->
            <div class="quick-prompts-section">
                <h3>Quick Prompts to Get Started:</h3>
                <div class="quick-prompts-grid">
                    <?php foreach ($quick_prompts as $prompt) : ?>
                    <button class="quick-prompt-btn" onclick="window.open('https://platform.btpma.org/head-steward-ai/', '_blank')">
                        <i class="fas fa-comment-dots"></i>
                        <?php echo esc_html($prompt); ?>
                    </button>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>

        <!-- Recent Conversations -->
        <?php if (!empty($recent_conversations)) : ?>
        <section class="dashboard-card recent-conversations">
            <h2><i class="fas fa-history"></i> Recent Conversations</h2>
            <div class="conversation-list">
                <?php foreach ($recent_conversations as $conversation) : ?>
                <div class="conversation-item">
                    <div class="conversation-info">
                        <i class="fas fa-comment"></i>
                        <div>
                            <h4><?php echo esc_html($conversation['title']); ?></h4>
                            <p class="conversation-date"><?php echo esc_html($conversation['date']); ?></p>
                        </div>
                    </div>
                    <a href="https://platform.btpma.org/head-steward-ai/" target="_blank" class="btn-secondary">
                        Continue <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
                <?php endforeach; ?>
            </div>
        </section>
        <?php endif; ?>

        <!-- AI Tips & Best Practices -->
        <section class="dashboard-card ai-tips">
            <h2><i class="fas fa-info-circle"></i> Tips for Using Head Steward AI</h2>
            <div class="tips-list">
                <div class="tip-item">
                    <i class="fas fa-check-circle"></i>
                    <p><strong>Be specific:</strong> The more detailed your question, the better the AI can assist you.</p>
                </div>
                <div class="tip-item">
                    <i class="fas fa-check-circle"></i>
                    <p><strong>Ask follow-ups:</strong> Don't hesitate to ask clarifying questions or request more details.</p>
                </div>
                <div class="tip-item">
                    <i class="fas fa-check-circle"></i>
                    <p><strong>Reference context:</strong> Mention your membership tier or specific projects for personalized guidance.</p>
                </div>
                <div class="tip-item">
                    <i class="fas fa-check-circle"></i>
                    <p><strong>Save important info:</strong> Copy important responses to your Document Vault for future reference.</p>
                </div>
            </div>
        </section>

    </main>
</div>

<?php get_footer(); ?>