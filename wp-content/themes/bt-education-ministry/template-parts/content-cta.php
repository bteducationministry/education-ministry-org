<?php
/**
 * Template Part: CTA Section
 * Reusable call-to-action section
 *
 * Usage: get_template_part( 'template-parts/content', 'cta' );
 *
 * @package BT_Education_Ministry
 */

$heading = isset( $args['heading'] ) ? $args['heading'] : 'Start Your Journey Today';
$text    = isset( $args['text'] ) ? $args['text'] : 'Take the first step toward structured education, clarity, and long-term impact.';
$style   = isset( $args['style'] ) ? $args['style'] : 'dark'; // dark or light
?>

<section class="section section--<?php echo esc_attr( $style ); ?>">
    <div class="container text-center">
        <h2 style="<?php echo $style === 'dark' ? 'color:var(--color-white);' : ''; ?>"><?php echo esc_html( $heading ); ?></h2>
        <p style="<?php echo $style === 'dark' ? 'color:rgba(255,255,255,0.8);' : ''; ?>font-size:var(--text-body-lg);max-width:600px;margin:0 auto var(--space-xl);"><?php echo esc_html( $text ); ?></p>
        <div class="btn-group" style="justify-content:center;">
            <a href="<?php echo esc_url( home_url( '/start/' ) ); ?>" class="btn btn--primary btn--lg">Start Your Civic Education Journey</a>
            <a href="<?php echo esc_url( home_url( '/membership/' ) ); ?>" class="btn <?php echo $style === 'dark' ? 'btn--outline-light' : 'btn--outline'; ?> btn--lg">Join Membership</a>
        </div>
    </div>
</section>
