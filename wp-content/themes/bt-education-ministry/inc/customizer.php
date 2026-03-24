<?php
/**
 * Customizer Settings
 * @package BT_Education_Ministry
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function btem_customize_register( $wp_customize ) {
    // External URLs Section
    $wp_customize->add_section( 'btem_external_urls', array(
        'title'    => __( 'External Platform URLs', 'bt-education' ),
        'priority' => 30,
    ) );

    $urls = array(
        'lms_url'        => array( 'LMS URL', 'https://platform.btpma.org/educate/' ),
        'dashboard_url'  => array( 'Member Dashboard URL', 'https://platform.btpma.org/member-portal/' ),
        'ai_url'         => array( 'Head Steward AI URL', 'https://platform.btpma.org/head-steward-ai/' ),
        'vault_url'      => array( 'Knowledge Vault URL', 'https://aemp-dashboard.btpma.org/knowledge-vault' ),
        'aemp_url'       => array( 'AEMP Dashboard URL', 'https://aemp-dashboard.btpma.org/measure' ),
        'calendly_url'   => array( 'Calendly Booking URL', 'https://calendly.com/bt-education-ministry' ),
    );

    foreach ( $urls as $key => $data ) {
        $wp_customize->add_setting( 'btem_' . $key, array(
            'default'           => $data[1],
            'sanitize_callback' => 'esc_url_raw',
        ) );
        $wp_customize->add_control( 'btem_' . $key, array(
            'label'   => $data[0],
            'section' => 'btem_external_urls',
            'type'    => 'url',
        ) );
    }

    // Stripe Section
    $wp_customize->add_section( 'btem_stripe', array(
        'title'    => __( 'Stripe Configuration', 'bt-education' ),
        'priority' => 35,
    ) );

    $wp_customize->add_setting( 'btem_stripe_mode', array(
        'default'           => 'test',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'btem_stripe_mode', array(
        'label'   => 'Stripe Mode',
        'section' => 'btem_stripe',
        'type'    => 'select',
        'choices' => array( 'test' => 'Test', 'live' => 'Live' ),
    ) );
}
add_action( 'customize_register', 'btem_customize_register' );
