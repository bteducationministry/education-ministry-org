<?php
/**
 * Funnel Functions — Forms, AJAX handlers, WPForms registration, hooks.
 *
 * This file is included from functions.php and handles:
 * 1. Enqueueing funnel-specific CSS/JS assets
 * 2. Native form AJAX handlers (Offer 0 signup, Capstone apply, Book call)
 * 3. WPForms programmatic creation helper
 * 4. Welcome-email logic
 * 5. AEMP server-side event helper
 *
 * @package BT_Education_Ministry
 * @version 1.0.0
 *
 * ─── Form IDs & Custom Hooks Reference ─────────────────────────────────
 *
 *  WPForms option keys (wp_options):
 *    btem_wpforms_offer0_id     → Offer 0 Signup Form ID
 *    btem_wpforms_capstone_id   → Capstone Application Form ID
 *    btem_wpforms_booking_id    → Consultation Booking Form ID
 *
 *  Calendly option:
 *    btem_calendly_url          → Calendly embed URL (if configured)
 *
 *  Custom hooks:
 *    do_action( 'btem_offer0_signup_complete', $user_id, $data )
 *    do_action( 'btem_capstone_application_received', $data )
 *    do_action( 'btem_booking_request_received', $data )
 *
 *  Filters:
 *    apply_filters( 'btem_offer0_welcome_email_subject', $subject )
 *    apply_filters( 'btem_offer0_welcome_email_body', $body, $user_id )
 *    apply_filters( 'btem_capstone_admin_email', $email )
 *    apply_filters( 'btem_capstone_qualification_result', $result, $data )
 *
 * ────────────────────────────────────────────────────────────────────────
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/* =========================================================================
   1. Conditional Asset Enqueueing
   ========================================================================= */

/**
 * Enqueue funnel CSS + analytics JS on funnel pages only.
 */
function btem_enqueue_funnel_assets() {
    if ( ! is_page() ) {
        return;
    }

    $funnel_slugs = array( 'start', 'learn', 'signup', 'welcome', 'capstone', 'apply', 'book-call' );
    $current_slug = get_post_field( 'post_name', get_queried_object_id() );

    if ( ! in_array( $current_slug, $funnel_slugs, true ) ) {
        return;
    }

    // Funnel stylesheet
    wp_enqueue_style(
        'btem-funnels',
        BTEM_URI . '/assets/css/funnels.css',
        array( 'btem-style' ),
        BTEM_VERSION
    );

    // Analytics script
    wp_enqueue_script(
        'btem-analytics',
        BTEM_URI . '/assets/js/analytics.js',
        array(),
        BTEM_VERSION,
        true
    );

    // Pass userId to analytics
    wp_localize_script( 'btem-analytics', 'btemData', array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'btem_nonce' ),
        'siteUrl' => home_url( '/' ),
        'userId'  => get_current_user_id(),
    ) );

    // Funnel form JS (handles native form submissions via AJAX)
    wp_enqueue_script(
        'btem-funnel-forms',
        BTEM_URI . '/assets/js/funnel-forms.js',
        array( 'btem-analytics' ),
        BTEM_VERSION,
        true
    );

    wp_localize_script( 'btem-funnel-forms', 'btemFunnel', array(
        'ajaxUrl'    => admin_url( 'admin-ajax.php' ),
        'welcomeUrl' => home_url( '/welcome/' ),
        'bookCallUrl'=> home_url( '/book-call/' ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'btem_enqueue_funnel_assets', 20 );

/* =========================================================================
   2. AJAX — Offer 0 Signup
   ========================================================================= */

function btem_ajax_offer0_signup() {
    check_ajax_referer( 'btem_offer0_signup', 'btem_offer0_nonce' );

    $fullname = sanitize_text_field( wp_unslash( $_POST['fullname'] ?? '' ) );
    $email    = sanitize_email( wp_unslash( $_POST['email'] ?? '' ) );
    $phone    = sanitize_text_field( wp_unslash( $_POST['phone'] ?? '' ) );
    $referral = sanitize_text_field( wp_unslash( $_POST['referral'] ?? '' ) );
    $agree    = ! empty( $_POST['agree_terms'] );

    // Validation
    if ( ! $fullname || ! $email ) {
        wp_send_json_error( array( 'message' => 'Full name and email are required.' ) );
    }
    if ( ! is_email( $email ) ) {
        wp_send_json_error( array( 'message' => 'Please enter a valid email address.' ) );
    }
    if ( ! $agree ) {
        wp_send_json_error( array( 'message' => 'You must agree to the terms to continue.' ) );
    }

    // Check if user already exists
    $existing = get_user_by( 'email', $email );
    if ( $existing ) {
        wp_send_json_error( array( 'message' => 'An account with this email already exists. Please log in or use a different email.' ) );
    }

    // Create WP user (Seeker level — Subscriber role)
    $username = sanitize_user( strtolower( str_replace( ' ', '.', $fullname ) ) . '.' . wp_rand( 100, 999 ) );
    $password = wp_generate_password( 12, true, true );

    $user_id = wp_insert_user( array(
        'user_login'   => $username,
        'user_email'   => $email,
        'user_pass'    => $password,
        'display_name' => $fullname,
        'first_name'   => explode( ' ', $fullname )[0],
        'last_name'    => implode( ' ', array_slice( explode( ' ', $fullname ), 1 ) ),
        'role'         => 'subscriber',
    ) );

    if ( is_wp_error( $user_id ) ) {
        wp_send_json_error( array( 'message' => 'Registration failed: ' . $user_id->get_error_message() ) );
    }

    // Store extra meta
    update_user_meta( $user_id, 'btem_membership_tier', 'seeker' );
    update_user_meta( $user_id, 'btem_phone', $phone );
    update_user_meta( $user_id, 'btem_referral_source', $referral );
    update_user_meta( $user_id, 'btem_signup_date', current_time( 'mysql' ) );
    update_user_meta( $user_id, 'btem_funnel_source', 'offer0' );

    // Send welcome email
    btem_send_welcome_email( $user_id, $password );

    // Fire AEMP event server-side
    btem_send_aemp_event( 'form_submit_offer0_signup', array(
        'user_id' => $user_id,
        'email'   => $email,
    ) );

    // Custom hook
    do_action( 'btem_offer0_signup_complete', $user_id, array(
        'fullname' => $fullname,
        'email'    => $email,
        'phone'    => $phone,
        'referral' => $referral,
    ) );

    wp_send_json_success( array(
        'message'  => 'Welcome aboard! Redirecting you now…',
        'redirect' => home_url( '/welcome/' ),
    ) );
}
add_action( 'wp_ajax_nopriv_btem_offer0_signup', 'btem_ajax_offer0_signup' );
add_action( 'wp_ajax_btem_offer0_signup', 'btem_ajax_offer0_signup' );

/* =========================================================================
   3. AJAX — Capstone Application
   ========================================================================= */

function btem_ajax_capstone_apply() {
    check_ajax_referer( 'btem_capstone_apply', 'btem_capstone_nonce' );

    $data = array(
        'fullname'              => sanitize_text_field( wp_unslash( $_POST['fullname'] ?? '' ) ),
        'email'                 => sanitize_email( wp_unslash( $_POST['email'] ?? '' ) ),
        'phone'                 => sanitize_text_field( wp_unslash( $_POST['phone'] ?? '' ) ),
        'beneficiaries'         => sanitize_text_field( wp_unslash( $_POST['beneficiaries'] ?? '' ) ),
        'generations'           => sanitize_text_field( wp_unslash( $_POST['generations'] ?? '' ) ),
        'total_assets'          => sanitize_text_field( wp_unslash( $_POST['total_assets'] ?? '' ) ),
        'estate_status'         => sanitize_text_field( wp_unslash( $_POST['estate_status'] ?? '' ) ),
        'governance_experience' => sanitize_text_field( wp_unslash( $_POST['governance_experience'] ?? '' ) ),
        'interest_reason'       => sanitize_textarea_field( wp_unslash( $_POST['interest_reason'] ?? '' ) ),
        'timeframe'             => sanitize_text_field( wp_unslash( $_POST['timeframe'] ?? '' ) ),
    );

    // Validation
    if ( ! $data['fullname'] || ! $data['email'] || ! $data['phone'] ) {
        wp_send_json_error( array( 'message' => 'Name, email, and phone are required.' ) );
    }
    if ( ! $data['total_assets'] ) {
        wp_send_json_error( array( 'message' => 'Please select your estimated asset range.' ) );
    }
    if ( ! $data['interest_reason'] ) {
        wp_send_json_error( array( 'message' => 'Please tell us why you\'re interested.' ) );
    }

    // Qualification logic
    $qualified_assets = in_array( $data['total_assets'], array( '500k-1m', '1m-5m', '5m+' ), true );
    $qualified_family = in_array( $data['beneficiaries'], array( '3-5', '6-10', '10+' ), true );

    $qualification = 'needs_review'; // default
    if ( $qualified_assets && $qualified_family ) {
        $qualification = 'qualified';
    } elseif ( $qualified_assets || $qualified_family ) {
        $qualification = 'needs_review';
    } else {
        $qualification = 'needs_review';
    }

    // Allow filtering
    $qualification = apply_filters( 'btem_capstone_qualification_result', $qualification, $data );

    // Send admin email notification
    $admin_email = apply_filters( 'btem_capstone_admin_email', get_option( 'admin_email' ) );
    $subject     = 'New Capstone Application — ' . $data['fullname'];
    $body        = "New Estate Trust Directive Application\n\n";
    foreach ( $data as $key => $value ) {
        $body .= ucfirst( str_replace( '_', ' ', $key ) ) . ': ' . $value . "\n";
    }
    $body .= "\nQualification Status: " . ucfirst( str_replace( '_', ' ', $qualification ) );

    wp_mail( $admin_email, $subject, $body, array( 'Content-Type: text/plain; charset=UTF-8' ) );

    // Fire AEMP event server-side
    btem_send_aemp_event( 'form_submit_capstone_application', array_merge( $data, array(
        'qualification' => $qualification,
    ) ) );

    // Custom hook
    do_action( 'btem_capstone_application_received', $data );

    // Response based on qualification
    if ( $qualification === 'qualified' ) {
        wp_send_json_success( array(
            'message'       => 'Congratulations! Based on your profile, you appear to qualify for the Estate Trust Directive. Proceed to book your complimentary consultation.',
            'qualification' => 'qualified',
            'redirect'      => home_url( '/book-call/' ),
            'show_redirect' => true,
        ) );
    } else {
        wp_send_json_success( array(
            'message'       => 'Thank you for your application! Our advisory team will review your information and contact you within 3–5 business days to discuss next steps.',
            'qualification' => 'needs_review',
            'redirect'      => '',
            'show_redirect' => false,
        ) );
    }
}
add_action( 'wp_ajax_nopriv_btem_capstone_apply', 'btem_ajax_capstone_apply' );
add_action( 'wp_ajax_btem_capstone_apply', 'btem_ajax_capstone_apply' );

/* =========================================================================
   4. AJAX — Book Call
   ========================================================================= */

function btem_ajax_book_call() {
    check_ajax_referer( 'btem_book_call', 'btem_booking_nonce' );

    $data = array(
        'fullname'         => sanitize_text_field( wp_unslash( $_POST['fullname'] ?? '' ) ),
        'email'            => sanitize_email( wp_unslash( $_POST['email'] ?? '' ) ),
        'phone'            => sanitize_text_field( wp_unslash( $_POST['phone'] ?? '' ) ),
        'preferred_date_1' => sanitize_text_field( wp_unslash( $_POST['preferred_date_1'] ?? '' ) ),
        'preferred_time_1' => sanitize_text_field( wp_unslash( $_POST['preferred_time_1'] ?? '' ) ),
        'preferred_date_2' => sanitize_text_field( wp_unslash( $_POST['preferred_date_2'] ?? '' ) ),
        'preferred_time_2' => sanitize_text_field( wp_unslash( $_POST['preferred_time_2'] ?? '' ) ),
        'notes'            => sanitize_textarea_field( wp_unslash( $_POST['notes'] ?? '' ) ),
    );

    if ( ! $data['fullname'] || ! $data['email'] || ! $data['phone'] || ! $data['preferred_date_1'] ) {
        wp_send_json_error( array( 'message' => 'Name, email, phone, and at least one preferred date are required.' ) );
    }

    // Send admin email
    $admin_email = apply_filters( 'btem_capstone_admin_email', get_option( 'admin_email' ) );
    $subject     = 'Capstone Consultation Booking — ' . $data['fullname'];
    $body        = "New Consultation Booking Request\n\n";
    foreach ( $data as $key => $value ) {
        if ( $value ) {
            $body .= ucfirst( str_replace( '_', ' ', $key ) ) . ': ' . $value . "\n";
        }
    }

    wp_mail( $admin_email, $subject, $body, array( 'Content-Type: text/plain; charset=UTF-8' ) );

    // AEMP event
    btem_send_aemp_event( 'form_submit_booking_request', $data );

    // Custom hook
    do_action( 'btem_booking_request_received', $data );

    wp_send_json_success( array(
        'message' => 'Your booking request has been submitted! We\'ll confirm your consultation date via email within 1–2 business days.',
    ) );
}
add_action( 'wp_ajax_nopriv_btem_book_call', 'btem_ajax_book_call' );
add_action( 'wp_ajax_btem_book_call', 'btem_ajax_book_call' );

/* =========================================================================
   5. Welcome Email
   ========================================================================= */

function btem_send_welcome_email( $user_id, $password ) {
    $user = get_userdata( $user_id );
    if ( ! $user ) {
        return;
    }

    $subject = apply_filters( 'btem_offer0_welcome_email_subject', 'Welcome to the Young Civic Engagement Challenge!' );

    $body = "Hi {$user->display_name},\n\n";
    $body .= "Welcome to the BT Education Ministry Young Civic Engagement Challenge!\n\n";
    $body .= "Your account has been created. Here are your login details:\n\n";
    $body .= "Username: {$user->user_login}\n";
    $body .= "Password: {$password}\n";
    $body .= "Login URL: https://platform.btpma.org/educate/\n\n";
    $body .= "Please change your password after your first login.\n\n";
    $body .= "What's next?\n";
    $body .= "1. Log in to the learning platform\n";
    $body .= "2. Start Module 1: Foundations of Civic Literacy\n";
    $body .= "3. Work through all 4 modules at your own pace\n";
    $body .= "4. Earn your certificate of completion\n\n";
    $body .= "If you have any questions, contact us at info@educationministry.org\n\n";
    $body .= "— BT Education Ministry\n";
    $body .= "971 US Highway 202 N, Ste N, Branchburg, NJ 08876\n";
    $body .= "Phone: (732) 375-9474\n";

    $body = apply_filters( 'btem_offer0_welcome_email_body', $body, $user_id );

    wp_mail( $user->user_email, $subject, $body, array( 'Content-Type: text/plain; charset=UTF-8' ) );
}

/* =========================================================================
   6. AEMP Server-Side Event Helper
   ========================================================================= */

/**
 * Send an event to the AEMP measurement endpoint from the server side.
 * Non-blocking using wp_remote_post with a short timeout.
 *
 * @param string $event Event name.
 * @param array  $meta  Additional metadata.
 */
function btem_send_aemp_event( $event, $meta = array() ) {
    $endpoint = 'https://aemp-dashboard.btpma.org/measure';

    $payload = array(
        'event'      => $event,
        'page_url'   => wp_get_referer() ?: home_url(),
        'page_title' => '',
        'user_id'    => get_current_user_id(),
        'timestamp'  => gmdate( 'c' ),
        'event_type' => implode( '_', array_slice( explode( '_', $event ), 0, 2 ) ),
        'meta'       => $meta,
        'source'     => 'server',
    );

    wp_remote_post( $endpoint, array(
        'body'      => wp_json_encode( $payload ),
        'headers'   => array( 'Content-Type' => 'application/json' ),
        'timeout'   => 2,
        'blocking'  => false,
        'sslverify' => false,
    ) );
}

/* =========================================================================
   7. WPForms Hooks (if WPForms is active)
   ========================================================================= */

/**
 * When WPForms Offer 0 form is submitted, trigger user creation + AEMP event.
 * Requires the WPForms form to have fields mapped by name attribute.
 *
 * Hook: wpforms_process_complete_{form_id}
 * This is registered dynamically below.
 */
function btem_wpforms_offer0_handler( $fields, $entry, $form_data, $entry_id ) {
    // Extract fields (WPForms stores fields by numeric ID)
    $fullname = '';
    $email    = '';
    $phone    = '';
    $referral = '';

    foreach ( $fields as $field ) {
        $label = strtolower( $field['name'] ?? '' );
        if ( strpos( $label, 'name' ) !== false && strpos( $label, 'full' ) !== false ) {
            $fullname = $field['value'];
        } elseif ( strpos( $label, 'email' ) !== false ) {
            $email = $field['value'];
        } elseif ( strpos( $label, 'phone' ) !== false ) {
            $phone = $field['value'];
        } elseif ( strpos( $label, 'hear' ) !== false || strpos( $label, 'referral' ) !== false ) {
            $referral = $field['value'];
        }
    }

    if ( $email && ! get_user_by( 'email', $email ) ) {
        $username = sanitize_user( strtolower( str_replace( ' ', '.', $fullname ) ) . '.' . wp_rand( 100, 999 ) );
        $password = wp_generate_password( 12, true, true );

        $user_id = wp_insert_user( array(
            'user_login'   => $username,
            'user_email'   => $email,
            'user_pass'    => $password,
            'display_name' => $fullname,
            'role'         => 'subscriber',
        ) );

        if ( ! is_wp_error( $user_id ) ) {
            update_user_meta( $user_id, 'btem_membership_tier', 'seeker' );
            update_user_meta( $user_id, 'btem_phone', $phone );
            update_user_meta( $user_id, 'btem_referral_source', $referral );
            update_user_meta( $user_id, 'btem_signup_date', current_time( 'mysql' ) );
            update_user_meta( $user_id, 'btem_funnel_source', 'offer0_wpforms' );

            btem_send_welcome_email( $user_id, $password );
            btem_send_aemp_event( 'form_submit_offer0_signup', array(
                'user_id' => $user_id,
                'email'   => $email,
                'source'  => 'wpforms',
            ) );

            do_action( 'btem_offer0_signup_complete', $user_id, array(
                'fullname' => $fullname,
                'email'    => $email,
                'phone'    => $phone,
                'referral' => $referral,
            ) );
        }
    }
}

/**
 * When WPForms Capstone form is submitted, trigger AEMP event + admin email.
 */
function btem_wpforms_capstone_handler( $fields, $entry, $form_data, $entry_id ) {
    $data = array();
    foreach ( $fields as $field ) {
        $key          = sanitize_title( $field['name'] ?? 'field_' . $field['id'] );
        $data[ $key ] = $field['value'];
    }

    btem_send_aemp_event( 'form_submit_capstone_application', $data );
    do_action( 'btem_capstone_application_received', $data );
}

/**
 * Dynamically attach WPForms handlers based on stored form IDs.
 */
function btem_register_wpforms_hooks() {
    $offer0_id   = get_option( 'btem_wpforms_offer0_id', '' );
    $capstone_id = get_option( 'btem_wpforms_capstone_id', '' );

    if ( $offer0_id ) {
        add_action( 'wpforms_process_complete_' . intval( $offer0_id ), 'btem_wpforms_offer0_handler', 10, 4 );
    }
    if ( $capstone_id ) {
        add_action( 'wpforms_process_complete_' . intval( $capstone_id ), 'btem_wpforms_capstone_handler', 10, 4 );
    }
}
add_action( 'init', 'btem_register_wpforms_hooks' );
