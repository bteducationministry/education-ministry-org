<?php
/**
 * BT Education Ministry Theme Functions
 *
 * @package BT_Education_Ministry
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'BTEM_VERSION', '1.0.0' );
define( 'BTEM_DIR', get_template_directory() );
define( 'BTEM_URI', get_template_directory_uri() );

/* ==========================================================================
   Theme Setup
   ========================================================================== */

function btem_setup() {
    // Title tag support
    add_theme_support( 'title-tag' );

    // Post thumbnails
    add_theme_support( 'post-thumbnails' );
    add_image_size( 'btem-hero', 1200, 720, true );
    add_image_size( 'btem-card', 600, 400, true );
    add_image_size( 'btem-square', 400, 400, true );

    // Custom logo
    add_theme_support( 'custom-logo', array(
        'height'      => 80,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ) );

    // HTML5 support
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
        'navigation-widgets',
    ) );

    // Block editor support
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );

    // Editor color palette matching design system
    add_theme_support( 'editor-color-palette', array(
        array(
            'name'  => __( 'Deep Purple', 'bt-education-ministry' ),
            'slug'  => 'purple',
            'color' => '#1A0F2E',
        ),
        array(
            'name'  => __( 'Purple Light', 'bt-education-ministry' ),
            'slug'  => 'purple-light',
            'color' => '#2D1B4E',
        ),
        array(
            'name'  => __( 'Gold', 'bt-education-ministry' ),
            'slug'  => 'gold',
            'color' => '#C8A951',
        ),
        array(
            'name'  => __( 'Gold Dark', 'bt-education-ministry' ),
            'slug'  => 'gold-dark',
            'color' => '#A68B3A',
        ),
        array(
            'name'  => __( 'Light Gray', 'bt-education-ministry' ),
            'slug'  => 'light',
            'color' => '#F7F7F7',
        ),
        array(
            'name'  => __( 'White', 'bt-education-ministry' ),
            'slug'  => 'white',
            'color' => '#FFFFFF',
        ),
        array(
            'name'  => __( 'Text Primary', 'bt-education-ministry' ),
            'slug'  => 'text-primary',
            'color' => '#111111',
        ),
        array(
            'name'  => __( 'Text Secondary', 'bt-education-ministry' ),
            'slug'  => 'text-secondary',
            'color' => '#666666',
        ),
    ) );

    // Editor font sizes
    add_theme_support( 'editor-font-sizes', array(
        array( 'name' => __( 'Small', 'bt-education-ministry' ), 'size' => 14, 'slug' => 'small' ),
        array( 'name' => __( 'Normal', 'bt-education-ministry' ), 'size' => 16, 'slug' => 'normal' ),
        array( 'name' => __( 'Large', 'bt-education-ministry' ), 'size' => 20, 'slug' => 'large' ),
        array( 'name' => __( 'Huge', 'bt-education-ministry' ), 'size' => 32, 'slug' => 'huge' ),
    ) );

    // Register navigation menus
    register_nav_menus( array(
        'primary'  => __( 'Primary Navigation', 'bt-education-ministry' ),
        'footer'   => __( 'Footer Navigation', 'bt-education-ministry' ),
    ) );
}
add_action( 'after_setup_theme', 'btem_setup' );

/* ==========================================================================
   Enqueue Styles & Scripts
   ========================================================================== */

function btem_enqueue_assets() {
    // Google Fonts — Playfair Display + Inter
    wp_enqueue_style(
        'btem-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
        array(),
        null
    );

    // Main stylesheet
    wp_enqueue_style(
        'btem-style',
        get_stylesheet_uri(),
        array( 'btem-google-fonts' ),
        BTEM_VERSION
    );

    // Theme JavaScript
    wp_enqueue_script(
        'btem-main',
        BTEM_URI . '/assets/js/main.js',
        array(),
        BTEM_VERSION,
        true
    );

    // Localize script data
    wp_localize_script( 'btem-main', 'btemData', array(
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'btem_nonce' ),
        'siteUrl' => home_url( '/' ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'btem_enqueue_assets' );

// Editor styles
function btem_editor_styles() {
    add_editor_style( array(
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap',
        'style.css',
    ) );
}
add_action( 'admin_init', 'btem_editor_styles' );

/* ==========================================================================
   Widget Areas
   ========================================================================== */

function btem_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Footer Column 1', 'bt-education-ministry' ),
        'id'            => 'footer-1',
        'description'   => __( 'Footer widget area - column 1', 'bt-education-ministry' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer__heading">',
        'after_title'   => '</h4>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer Column 2', 'bt-education-ministry' ),
        'id'            => 'footer-2',
        'description'   => __( 'Footer widget area - column 2', 'bt-education-ministry' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer__heading">',
        'after_title'   => '</h4>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Sidebar', 'bt-education-ministry' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Default sidebar', 'bt-education-ministry' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );
}
add_action( 'widgets_init', 'btem_widgets_init' );

/* ==========================================================================
   Custom Shortcodes
   ========================================================================== */

/**
 * [btem_cta] — Call-to-Action button
 * Usage: [btem_cta url="/start" style="primary" label="Start Your Journey"]
 */
function btem_cta_shortcode( $atts ) {
    $atts = shortcode_atts( array(
        'url'    => '#',
        'label'  => 'Learn More',
        'style'  => 'primary',    // primary, secondary, outline
        'size'   => '',           // lg, sm
        'target' => '_self',
        'icon'   => '',
    ), $atts, 'btem_cta' );

    $classes = 'btn btn--' . esc_attr( $atts['style'] );
    if ( $atts['size'] ) {
        $classes .= ' btn--' . esc_attr( $atts['size'] );
    }

    $icon_html = '';
    if ( $atts['icon'] ) {
        $icon_html = '<span class="btn__icon">' . esc_html( $atts['icon'] ) . '</span>';
    }

    return sprintf(
        '<a href="%s" class="%s" target="%s">%s%s</a>',
        esc_url( $atts['url'] ),
        esc_attr( $classes ),
        esc_attr( $atts['target'] ),
        $icon_html,
        esc_html( $atts['label'] )
    );
}
add_shortcode( 'btem_cta', 'btem_cta_shortcode' );

/**
 * [btem_membership_card] — Membership tier card
 * Usage: [btem_membership_card tier="Seeker" price="Free" level="Foundation | Awareness" featured="false"]
 */
function btem_membership_card_shortcode( $atts, $content = null ) {
    $atts = shortcode_atts( array(
        'tier'     => 'Seeker',
        'price'    => 'Free',
        'period'   => '/mo',
        'level'    => 'Foundation',
        'symbol'   => '🧭',
        'cta_url'  => '/membership',
        'cta_text' => 'Get Started',
        'featured' => 'false',
    ), $atts, 'btem_membership_card' );

    $featured_class = ( $atts['featured'] === 'true' ) ? ' featured' : '';
    $price_display = ( $atts['price'] === 'Free' )
        ? '<div class="card__price">Free</div>'
        : '<div class="card__price">$' . esc_html( $atts['price'] ) . '<span>' . esc_html( $atts['period'] ) . '</span></div>';

    ob_start();
    ?>
    <div class="card card--pricing<?php echo esc_attr( $featured_class ); ?>">
        <div class="card__icon" style="margin:0 auto var(--space-md);font-size:36px;background:none;">
            <?php echo esc_html( $atts['symbol'] ); ?>
        </div>
        <div class="card__tier"><?php echo esc_html( $atts['tier'] ); ?></div>
        <?php echo $price_display; ?>
        <div class="card__level"><?php echo esc_html( $atts['level'] ); ?></div>
        <?php if ( $content ) : ?>
            <ul>
                <?php
                $items = explode( "\n", trim( strip_tags( $content, '<li>' ) ) );
                foreach ( $items as $item ) {
                    $item = trim( $item );
                    if ( $item ) {
                        echo '<li>' . esc_html( $item ) . '</li>';
                    }
                }
                ?>
            </ul>
        <?php endif; ?>
        <a href="<?php echo esc_url( $atts['cta_url'] ); ?>" class="btn btn--primary btn--full">
            <?php echo esc_html( $atts['cta_text'] ); ?>
        </a>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'btem_membership_card', 'btem_membership_card_shortcode' );

/**
 * [btem_program_card] — Program card
 * Usage: [btem_program_card title="AEMP" icon="📘" url="/programs"]Description[/btem_program_card]
 */
function btem_program_card_shortcode( $atts, $content = null ) {
    $atts = shortcode_atts( array(
        'title' => 'Program',
        'icon'  => '📚',
        'tag'   => '',
        'url'   => '#',
    ), $atts, 'btem_program_card' );

    ob_start();
    ?>
    <div class="card card--program">
        <div class="card__icon"><?php echo esc_html( $atts['icon'] ); ?></div>
        <?php if ( $atts['tag'] ) : ?>
            <span class="card__tag"><?php echo esc_html( $atts['tag'] ); ?></span>
        <?php endif; ?>
        <h4 class="card__title"><?php echo esc_html( $atts['title'] ); ?></h4>
        <?php if ( $content ) : ?>
            <p class="card__text"><?php echo wp_kses_post( $content ); ?></p>
        <?php endif; ?>
        <a href="<?php echo esc_url( $atts['url'] ); ?>" class="btn btn--outline btn--sm">Learn More</a>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode( 'btem_program_card', 'btem_program_card_shortcode' );

/**
 * [btem_ladder] — Competency ladder display
 */
function btem_ladder_shortcode() {
    $steps = array(
        array( 'num' => '1', 'title' => 'Seeker',   'desc' => 'Awareness — Understand systems and foundational principles' ),
        array( 'num' => '2', 'title' => 'Operator',  'desc' => 'Execution — Apply structured processes with discipline' ),
        array( 'num' => '3', 'title' => 'Architect', 'desc' => 'Design — Build systems and frameworks' ),
        array( 'num' => '4', 'title' => 'Steward',   'desc' => 'Governance — Lead, manage, and oversee long-term structures' ),
    );

    ob_start();
    echo '<div class="ladder">';
    foreach ( $steps as $step ) {
        echo '<div class="ladder__step">';
        echo '<div class="ladder__number">' . esc_html( $step['num'] ) . '</div>';
        echo '<div class="ladder__content">';
        echo '<h4>' . esc_html( $step['title'] ) . '</h4>';
        echo '<p>' . esc_html( $step['desc'] ) . '</p>';
        echo '</div></div>';
    }
    echo '</div>';
    return ob_get_clean();
}
add_shortcode( 'btem_ladder', 'btem_ladder_shortcode' );

/* ==========================================================================
   Custom Nav Walker (Accessible)
   ========================================================================== */

class BTEM_Nav_Walker extends Walker_Nav_Menu {
    public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
        $classes = empty( $item->classes ) ? array() : (array) $item->classes;
        $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
        $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

        $output .= '<li' . $class_names . '>';

        $atts = array(
            'title'  => ! empty( $item->attr_title ) ? $item->attr_title : '',
            'target' => ! empty( $item->target ) ? $item->target : '',
            'rel'    => ! empty( $item->xfn ) ? $item->xfn : '',
            'href'   => ! empty( $item->url ) ? $item->url : '',
        );

        if ( $item->current ) {
            $atts['aria-current'] = 'page';
        }

        $attributes = '';
        foreach ( $atts as $attr => $value ) {
            if ( ! empty( $value ) ) {
                $attributes .= ' ' . $attr . '="' . esc_attr( $value ) . '"';
            }
        }

        $output .= '<a' . $attributes . '>';
        $output .= apply_filters( 'the_title', $item->title, $item->ID );
        $output .= '</a>';
    }
}

/* ==========================================================================
   Fallback Nav (when no menu assigned)
   ========================================================================== */

function btem_fallback_menu() {
    $pages = array(
        'Home'         => home_url( '/' ),
        'About'        => home_url( '/about/' ),
        'Programs'     => home_url( '/programs/' ),
        'Membership'   => home_url( '/membership/' ),
        'Civic Library' => home_url( '/civic-library/' ),
        'Donate'       => home_url( '/donate/' ),
    );

    echo '<ul class="primary-nav__list">';
    foreach ( $pages as $label => $url ) {
        $current = ( untrailingslashit( $url ) === untrailingslashit( home_url( $_SERVER['REQUEST_URI'] ) ) ) ? ' class="current-menu-item"' : '';
        echo '<li' . $current . '><a href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a></li>';
    }
    echo '</ul>';
}

/* ==========================================================================
   Helpers
   ========================================================================== */

/**
 * Custom excerpt length
 */
function btem_excerpt_length( $length ) {
    return 25;
}
add_filter( 'excerpt_length', 'btem_excerpt_length' );

/**
 * Custom excerpt more text
 */
function btem_excerpt_more( $more ) {
    return '&hellip;';
}
add_filter( 'excerpt_more', 'btem_excerpt_more' );

/**
 * Add preconnect for Google Fonts performance
 */
function btem_resource_hints( $urls, $relation_type ) {
    if ( 'preconnect' === $relation_type ) {
        $urls[] = array(
            'href' => 'https://fonts.googleapis.com',
            'crossorigin' => 'anonymous',
        );
        $urls[] = array(
            'href' => 'https://fonts.gstatic.com',
            'crossorigin' => 'anonymous',
        );
    }
    return $urls;
}
add_filter( 'wp_resource_hints', 'btem_resource_hints', 10, 2 );

/**
 * Allow SVG uploads
 */
function btem_mime_types( $mimes ) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter( 'upload_mimes', 'btem_mime_types' );

/**
 * Remove WordPress version from head for security
 */
remove_action( 'wp_head', 'wp_generator' );

/* ==========================================================================
   Funnel Functions (forms, AJAX, analytics, WPForms hooks)
   ========================================================================== */

require_once BTEM_DIR . '/inc/funnel-functions.php';

/**
 * Enqueue BT Analytics Script
 */
function bt_enqueue_analytics() {
    wp_enqueue_script(
        'bt-analytics',
        get_template_directory_uri() . '/assets/js/analytics.js',
        array(),
        filemtime(get_template_directory() . '/assets/js/analytics.js'),
        true
    );
}
add_action('wp_enqueue_scripts', 'bt_enqueue_analytics');
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
