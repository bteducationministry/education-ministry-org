<?php
/**
 * Template Name: BTPMA Account Settings
 * Description: Member account management, profile, billing, and preferences
 */

// Member-only access control
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

get_header();

$current_user = wp_get_current_user();
$user_id = $current_user->ID;

// TODO: Fetch user profile data
$profile_data = [
    'name' => $current_user->display_name,
    'email' => $current_user->user_email,
    'phone' => get_user_meta($user_id, 'phone', true) ?: 'Not provided',
    'member_since' => 'January 2025', // TODO: Fetch from membership data
];

// TODO: Fetch membership data
$member_tier = 'Operator'; // Placeholder
$renewal_date = 'December 31, 2026';
$membership_status = 'Active';

// TODO: Fetch billing history
$billing_history = [
    ['date' => 'January 1, 2026', 'amount' => '$99.00', 'status' => 'Paid', 'invoice' => '#INV-2026-001'],
    ['date' => 'January 1, 2025', 'amount' => '$99.00', 'status' => 'Paid', 'invoice' => '#INV-2025-001'],
];

// Tier upgrade options
$tier_upgrades = [
    'Operator' => ['next' => 'Architect', 'price' => '$249/year'],
    'Architect' => ['next' => 'Steward', 'price' => 'Capstone Required'],
    'Seeker' => ['next' => 'Operator', 'price' => '$99/year'],
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
            <span>Account Settings</span>
        </nav>

        <!-- Page Header -->
        <section class="page-header">
            <h1><i class="fas fa-user-cog"></i> Account Settings</h1>
            <p class="page-description">Manage your profile, membership, billing, and preferences.</p>
        </section>

        <!-- Account Tabs Navigation -->
        <div class="account-tabs">
            <button class="tab-btn active" data-tab="profile"><i class="fas fa-user"></i> Profile</button>
            <button class="tab-btn" data-tab="membership"><i class="fas fa-id-card"></i> Membership</button>
            <button class="tab-btn" data-tab="billing"><i class="fas fa-credit-card"></i> Billing</button>
            <button class="tab-btn" data-tab="security"><i class="fas fa-lock"></i> Security</button>
            <button class="tab-btn" data-tab="preferences"><i class="fas fa-cog"></i> Preferences</button>
        </div>

        <!-- Profile Tab -->
        <div class="tab-content active" id="profile-tab">
            <section class="dashboard-card">
                <h2><i class="fas fa-user-edit"></i> Profile Information</h2>
                <form id="profileForm" class="account-form">
                    <!-- TODO: Implement profile update handler -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="display_name">Full Name</label>
                            <input type="text" id="display_name" name="display_name" value="<?php echo esc_attr($profile_data['name']); ?>" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" value="<?php echo esc_attr($profile_data['email']); ?>" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value="<?php echo esc_attr($profile_data['phone']); ?>">
                        </div>
                        <div class="form-group">
                            <label>Member Since</label>
                            <input type="text" value="<?php echo esc_attr($profile_data['member_since']); ?>" disabled>
                        </div>
                    </div>
                    <button type="submit" class="btn-primary">Save Changes</button>
                </form>
            </section>
        </div>

        <!-- Membership Tab -->
        <div class="tab-content" id="membership-tab">
            <section class="dashboard-card">
                <h2><i class="fas fa-id-card"></i> Membership Details</h2>
                <div class="membership-info-grid">
                    <div class="info-card">
                        <h3>Current Tier</h3>
                        <p class="tier-display tier-<?php echo strtolower($member_tier); ?>">
                            <i class="fas fa-shield-alt"></i> <?php echo esc_html($member_tier); ?>
                        </p>
                    </div>
                    <div class="info-card">
                        <h3>Status</h3>
                        <p class="status-display status-active">
                            <i class="fas fa-check-circle"></i> <?php echo esc_html($membership_status); ?>
                        </p>
                    </div>
                    <div class="info-card">
                        <h3>Renewal Date</h3>
                        <p><i class="fas fa-calendar"></i> <?php echo esc_html($renewal_date); ?></p>
                    </div>
                </div>
            </section>

            <?php if (isset($tier_upgrades[$member_tier])) : ?>
            <section class="dashboard-card upgrade-section">
                <h2><i class="fas fa-arrow-up"></i> Upgrade Your Membership</h2>
                <div class="upgrade-offer">
                    <div class="upgrade-info">
                        <h3>Upgrade to <?php echo esc_html($tier_upgrades[$member_tier]['next']); ?></h3>
                        <p class="upgrade-price"><?php echo esc_html($tier_upgrades[$member_tier]['price']); ?></p>
                        <ul class="upgrade-benefits">
                            <?php if ($tier_upgrades[$member_tier]['next'] === 'Architect') : ?>
                            <li><i class="fas fa-check"></i> Trust planning consultation</li>
                            <li><i class="fas fa-check"></i> 100 AI queries per month</li>
                            <li><i class="fas fa-check"></i> Document upload access</li>
                            <li><i class="fas fa-check"></i> Governance center access</li>
                            <?php elseif ($tier_upgrades[$member_tier]['next'] === 'Steward') : ?>
                            <li><i class="fas fa-check"></i> Full Estate Trust Directive access</li>
                            <li><i class="fas fa-check"></i> Unlimited AI queries</li>
                            <li><i class="fas fa-check"></i> Governance voting rights</li>
                            <li><i class="fas fa-check"></i> Exclusive steward community</li>
                            <?php elseif ($tier_upgrades[$member_tier]['next'] === 'Operator') : ?>
                            <li><i class="fas fa-check"></i> Advanced trust education</li>
                            <li><i class="fas fa-check"></i> 25 AI queries per month</li>
                            <li><i class="fas fa-check"></i> Document vault access</li>
                            <li><i class="fas fa-check"></i> Monthly Q&A sessions</li>
                            <?php endif; ?>
                        </ul>
                    </div>
                    <div class="upgrade-action">
                        <?php if ($tier_upgrades[$member_tier]['next'] === 'Steward') : ?>
                        <a href="#" class="btn-upgrade btn-large">Apply for Capstone</a>
                        <?php else : ?>
                        <a href="#" class="btn-upgrade btn-large">Upgrade Now</a>
                        <?php endif; ?>
                    </div>
                </div>
            </section>
            <?php endif; ?>
        </div>

        <!-- Billing Tab -->
        <div class="tab-content" id="billing-tab">
            <section class="dashboard-card">
                <h2><i class="fas fa-credit-card"></i> Payment Method</h2>
                <div class="payment-method-display">
                    <i class="fas fa-credit-card fa-2x"></i>
                    <div>
                        <p><strong>Visa ending in 4242</strong></p>
                        <p>Expires 12/2027</p>
                    </div>
                    <button class="btn-secondary">Update Payment Method</button>
                </div>
            </section>

            <section class="dashboard-card">
                <h2><i class="fas fa-history"></i> Billing History</h2>
                <table class="billing-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Invoice</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($billing_history as $bill) : ?>
                        <tr>
                            <td><?php echo esc_html($bill['date']); ?></td>
                            <td><?php echo esc_html($bill['invoice']); ?></td>
                            <td><?php echo esc_html($bill['amount']); ?></td>
                            <td><span class="status-badge status-paid"><?php echo esc_html($bill['status']); ?></span></td>
                            <td>
                                <a href="#" class="action-btn" title="Download Invoice">
                                    <i class="fas fa-download"></i>
                                </a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </section>
        </div>

        <!-- Security Tab -->
        <div class="tab-content" id="security-tab">
            <section class="dashboard-card">
                <h2><i class="fas fa-key"></i> Change Password</h2>
                <form id="passwordForm" class="account-form">
                    <!-- TODO: Implement password change handler -->
                    <div class="form-group">
                        <label for="current_password">Current Password</label>
                        <input type="password" id="current_password" name="current_password" required>
                    </div>
                    <div class="form-group">
                        <label for="new_password">New Password</label>
                        <input type="password" id="new_password" name="new_password" required>
                    </div>
                    <div class="form-group">
                        <label for="confirm_password">Confirm New Password</label>
                        <input type="password" id="confirm_password" name="confirm_password" required>
                    </div>
                    <button type="submit" class="btn-primary">Update Password</button>
                </form>
            </section>

            <section class="dashboard-card">
                <h2><i class="fas fa-shield-alt"></i> Account Security</h2>
                <div class="security-options">
                    <div class="security-option">
                        <div>
                            <h3>Two-Factor Authentication</h3>
                            <p>Add an extra layer of security to your account</p>
                        </div>
                        <button class="btn-secondary">Enable 2FA</button>
                    </div>
                    <div class="security-option">
                        <div>
                            <h3>Active Sessions</h3>
                            <p>Manage devices where you're currently logged in</p>
                        </div>
                        <button class="btn-secondary">View Sessions</button>
                    </div>
                </div>
            </section>
        </div>

        <!-- Preferences Tab -->
        <div class="tab-content" id="preferences-tab">
            <section class="dashboard-card">
                <h2><i class="fas fa-bell"></i> Notification Preferences</h2>
                <form id="preferencesForm" class="account-form">
                    <!-- TODO: Implement preferences update handler -->
                    <div class="preference-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="email_announcements" checked>
                            <span>Email me about announcements and updates</span>
                        </label>
                    </div>
                    <div class="preference-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="email_projects" checked>
                            <span>Notify me about project updates</span>
                        </label>
                    </div>
                    <div class="preference-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="email_governance" checked>
                            <span>Send governance and voting notifications</span>
                        </label>
                    </div>
                    <div class="preference-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="email_billing">
                            <span>Billing and payment reminders</span>
                        </label>
                    </div>
                    <button type="submit" class="btn-primary">Save Preferences</button>
                </form>
            </section>

            <section class="dashboard-card">
                <h2><i class="fas fa-download"></i> Data & Privacy</h2>
                <div class="privacy-options">
                    <div class="privacy-option">
                        <div>
                            <h3>Download Your Data</h3>
                            <p>Request a copy of all your personal data</p>
                        </div>
                        <button class="btn-secondary">Request Data</button>
                    </div>
                    <div class="privacy-option danger-zone">
                        <div>
                            <h3>Cancel Membership</h3>
                            <p>Permanently close your account and cancel membership</p>
                        </div>
                        <button class="btn-danger">Cancel Membership</button>
                    </div>
                </div>
            </section>
        </div>

    </main>
</div>

<script>
// Simple tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all tabs and content
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');
    });
});
</script>

<?php get_footer(); ?>