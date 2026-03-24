<?php
/**
 * BTPMA Member Dashboard Functions
 * Add these functions to your theme's functions.php file
 */

// Enqueue dashboard assets for member pages
function btpma_enqueue_dashboard_assets() {
    // Only load on member dashboard pages
    if (is_page_template('page-dashboard.php') || 
        is_page_template('page-trust-services.php') || 
        is_page_template('page-active-projects.php') || 
        is_page_template('page-document-vault.php') || 
        is_page_template('page-governance-center.php') || 
        is_page_template('page-head-steward-ai.php') || 
        is_page_template('page-account.php')) {
        
        // Enqueue dashboard CSS
        wp_enqueue_style('btpma-dashboard', get_template_directory_uri() . '/dashboard.css', array(), '1.0.0');
        
        // Enqueue Font Awesome
        wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css', array(), '6.4.0');
    }
}
add_action('wp_enqueue_scripts', 'btpma_enqueue_dashboard_assets');

// Register member sidebar
function btpma_register_member_sidebar() {
    register_sidebar(array(
        'name'          => __('Member Dashboard Sidebar', 'bt-education-ministry'),
        'id'            => 'member',
        'description'   => __('Sidebar for BTPMA member dashboard pages', 'bt-education-ministry'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'btpma_register_member_sidebar');

// Optional: Register custom capabilities for tier-based access control
// Uncomment and customize based on your membership plugin
/*
function btpma_add_member_capabilities() {
    // Get roles
    $seeker = get_role('seeker');
    $operator = get_role('operator');
    $architect = get_role('architect');
    $steward = get_role('steward');
    
    // Add capabilities
    if ($operator) {
        $operator->add_cap('access_document_vault');
    }
    if ($architect) {
        $architect->add_cap('access_document_vault');
        $architect->add_cap('access_governance_center');
        $architect->add_cap('upload_documents');
    }
    if ($steward) {
        $steward->add_cap('access_document_vault');
        $steward->add_cap('access_governance_center');
        $steward->add_cap('upload_documents');
        $steward->add_cap('governance_voting');
    }
}
add_action('init', 'btpma_add_member_capabilities');
*/

// Helper function to get member tier
// TODO: Integrate with your membership plugin
function btpma_get_member_tier($user_id = null) {
    if (!$user_id) {
        $user_id = get_current_user_id();
    }
    
    // Example: Get from user meta
    $tier = get_user_meta($user_id, 'membership_tier', true);
    
    // Default to Seeker if not set
    return $tier ? $tier : 'Seeker';
}

// Helper function to check tier level
function btpma_check_tier_level($required_tier, $user_id = null) {
    $tier_levels = array(
        'Seeker' => 1,
        'Operator' => 2,
        'Architect' => 3,
        'Steward' => 4
    );
    
    $current_tier = btpma_get_member_tier($user_id);
    $current_level = isset($tier_levels[$current_tier]) ? $tier_levels[$current_tier] : 1;
    $required_level = isset($tier_levels[$required_tier]) ? $tier_levels[$required_tier] : 1;
    
    return $current_level >= $required_level;
}
