<?php
/**
 * Plugin Name: BT AEMP Analytics Integration
 * Description: Sends membership events to AEMP Dashboard for analytics tracking
 * Version: 1.0
 * Author: BT Education Ministry
 */

// Send membership events to AEMP Dashboard
function bt_send_membership_event_to_aemp($event_type, $user_id, $level_id, $order_data = array()) {
    $user = get_userdata($user_id);
    if (!$user) return;
    
    $level = pmpro_getLevel($level_id);
    
    $event_data = array(
        'event_type' => $event_type,
        'timestamp' => current_time('mysql'),
        'user_id' => $user_id,
        'user_email' => $user->user_email,
        'user_name' => $user->display_name,
        'membership_level_id' => $level_id,
        'membership_level_name' => $level ? $level->name : 'None',
        'membership_amount' => $level ? $level->billing_amount : 0,
        'order_id' => isset($order_data['id']) ? $order_data['id'] : null,
        'order_total' => isset($order_data['total']) ? $order_data['total'] : null,
        'site' => 'educationministry.org'
    );
    
    // Send to AEMP Dashboard
    $response = wp_remote_post('https://aemp-dashboard.btpma.org/measure', array(
        'method' => 'POST',
        'timeout' => 10,
        'headers' => array(
            'Content-Type' => 'application/json',
        ),
        'body' => json_encode($event_data),
    ));
    
    // Log for debugging
    if (is_wp_error($response)) {
        error_log('AEMP Webhook Error: ' . $response->get_error_message());
    } else {
        error_log('AEMP Webhook Success: ' . $event_type . ' for user ' . $user_id);
    }
}

// Hook: Membership level change (signup, upgrade, downgrade, cancel)
add_action('pmpro_after_change_membership_level', function($level_id, $user_id, $old_levels) {
    if (empty($level_id)) {
        // Membership canceled
        bt_send_membership_event_to_aemp('membership_cancel', $user_id, 0);
    } elseif (empty($old_levels)) {
        // New signup
        bt_send_membership_event_to_aemp('membership_signup', $user_id, $level_id);
    } else {
        // Upgrade or downgrade
        bt_send_membership_event_to_aemp('membership_upgrade', $user_id, $level_id);
    }
}, 10, 3);

// Hook: After checkout (payment success)
add_action('pmpro_after_checkout', function($user_id, $order) {
    if ($order && $order->status == 'success') {
        $order_data = array(
            'id' => $order->id,
            'total' => $order->total
        );
        bt_send_membership_event_to_aemp('payment_success', $user_id, $order->membership_id, $order_data);
    }
}, 10, 2);

// Hook: Payment failed
add_action('pmpro_subscription_payment_failed', function($order) {
    if ($order) {
        $order_data = array(
            'id' => $order->id,
            'total' => $order->total
        );
        bt_send_membership_event_to_aemp('payment_failed', $order->user_id, $order->membership_id, $order_data);
    }
}, 10, 1);

// Hook: Recurring payment received
add_action('pmpro_subscription_payment_completed', function($order) {
    if ($order) {
        $order_data = array(
            'id' => $order->id,
            'total' => $order->total
        );
        bt_send_membership_event_to_aemp('payment_success', $order->user_id, $order->membership_id, $order_data);
    }
}, 10, 1);

// Add admin notice to confirm integration is active
add_action('admin_notices', function() {
    if (current_user_can('manage_options')) {
        echo '<div class="notice notice-success"><p><strong>BT AEMP Analytics Integration:</strong> Active and sending events to aemp-dashboard.btpma.org/measure</p></div>';
    }
});
