<?php
/**
 * Template Functions
 * @package BT_Education_Ministry
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Get themed button HTML
 */
function btem_button( $text, $url, $style = 'primary', $attrs = array() ) {
    $classes = 'btem-btn btem-btn-' . esc_attr( $style );
    if ( isset( $attrs['class'] ) ) {
        $classes .= ' ' . esc_attr( $attrs['class'] );
    }
    $target = isset( $attrs['target'] ) ? ' target="' . esc_attr( $attrs['target'] ) . '"' : '';
    $data_event = isset( $attrs['data-event'] ) ? ' data-aemp-event="' . esc_attr( $attrs['data-event'] ) . '"' : '';
    $data_location = isset( $attrs['data-location'] ) ? ' data-aemp-location="' . esc_attr( $attrs['data-location'] ) . '"' : '';

    return sprintf(
        '<a href="%s" class="%s"%s%s%s>%s</a>',
        esc_url( $url ),
        $classes,
        $target,
        $data_event,
        $data_location,
        esc_html( $text )
    );
}

/**
 * Get pricing card HTML
 */
function btem_pricing_card( $tier, $price, $period, $features, $cta_text, $cta_url, $highlight = false ) {
    $class = 'btem-pricing-card';
    if ( $highlight ) $class .= ' btem-pricing-highlight';

    $html = '<div class="' . esc_attr( $class ) . '">';
    $html .= '<h3 class="btem-pricing-tier">' . esc_html( $tier ) . '</h3>';
    $html .= '<div class="btem-pricing-price">';
    if ( $price === 'Free' ) {
        $html .= '<span class="btem-price-amount">Free</span>';
    } else {
        $html .= '<span class="btem-price-amount">$' . esc_html( $price ) . '</span>';
        $html .= '<span class="btem-price-period">/' . esc_html( $period ) . '</span>';
    }
    $html .= '</div>';
    $html .= '<ul class="btem-pricing-features">';
    foreach ( $features as $feature ) {
        $html .= '<li>' . esc_html( $feature ) . '</li>';
    }
    $html .= '</ul>';
    $html .= btem_button( $cta_text, $cta_url, $highlight ? 'primary' : 'secondary' );
    $html .= '</div>';

    return $html;
}

/**
 * Render progress steps for funnel pages
 */
function btem_progress_steps( $current = 1, $total = 3 ) {
    $html = '<div class="btem-progress-steps">';
    for ( $i = 1; $i <= $total; $i++ ) {
        $class = 'btem-step';
        if ( $i < $current ) $class .= ' btem-step-completed';
        if ( $i === $current ) $class .= ' btem-step-active';
        $html .= '<div class="' . $class . '"><span>' . $i . '</span></div>';
        if ( $i < $total ) $html .= '<div class="btem-step-connector"></div>';
    }
    $html .= '</div>';
    return $html;
}
