<?php
/** BT Education Ministry - Production Configuration */

// Database settings
define('WP_CACHE', true);
define( 'WPCACHEHOME', '/var/www/educationministry.org/wp-content/plugins/wp-super-cache/' );
define( 'DB_NAME', 'bt_education_wp_prod' );
define( 'DB_USER', 'wp_education' );
define( 'DB_PASSWORD', 'BTEdPr0d_S3cur3!2026' );
define( 'DB_HOST', 'prod-db-1' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// Authentication keys and salts
define('AUTH_KEY',         '--j+^pf0Z5W;@vy}20PHu[UrEAG-~{`[m00wx/bF.Gb*x9Xkj|-+|sA/;/o[eR*7');
define('SECURE_AUTH_KEY',  '`O/ n&l,x:2e2-e6LL!f{Ju{jH@GgGO6={s}<5Kf*mr>AH8}n&dP^*VkRQ^v32T_');
define('LOGGED_IN_KEY',    '3R}8^S;#`Y|+O3]0IGCs./T~^8-$hEWq7N>|Z{5%:y0.h, ^ &hTMK=6WxAbKlh5');
define('NONCE_KEY',        '><&;19+YGu+{y10-8GDP<-O )?b~I>5Q@R7t*Nn.P?R^+>]SYmsG;UV~:+SpKpx[');
define('AUTH_SALT',        'l$W.;UH{!#OV1G($l|-ks?{P3_dk7PbV}$7}ql%mI$))[#;W=sR(JTj~M8]KzQcR');
define('SECURE_AUTH_SALT', 'UN%`;O2ju<THCePjy)Fz{(qYUsO8=2bM9/o am!pdeeTyybVs;`42.Ws6rWkdkmf');
define('LOGGED_IN_SALT',   '#vy/fvqBSBEQ6y+)th*O_pQ)Ti0|6A^X4|$$H]I02Gv05?KC!ie<S{9-V+j=H`S{');
define('NONCE_SALT',       '2=b=x`dG?!hqZfS2e!}4NSy)!at-T9v=)k(sX<<ss-[sq5wN+S^$=/TSSm_3d` x');

$table_prefix = 'wp_';

// Site URLs
define( 'WP_HOME', 'https://educationministry.org' );
define( 'WP_SITEURL', 'https://educationministry.org' );

// Production settings
define( 'WP_DEBUG', false );
define( 'WP_DEBUG_DISPLAY', false );
define( 'WP_DEBUG_LOG', false );
define( 'FS_METHOD', 'direct' );
define( 'FORCE_SSL_ADMIN', true );
define( 'WP_MEMORY_LIMIT', '256M' );
define( 'WP_MAX_MEMORY_LIMIT', '512M' );
define( 'DISALLOW_FILE_EDIT', true );

// SMTP Configuration
define( 'WPMS_ON', true );
define( 'WPMS_SMTP_HOST', 'smtp.hostinger.com' );
define( 'WPMS_SMTP_PORT', 465 );
define( 'WPMS_SSL', 'ssl' );
define( 'WPMS_SMTP_AUTH', true );
define( 'WPMS_SMTP_USER', 'impact@educationministry.org' );
define( 'WPMS_SMTP_PASS', 'Trustee23!!' );
define( 'WPMS_MAIL_FROM', 'impact@educationministry.org' );
define( 'WPMS_MAIL_FROM_NAME', 'BT Education Ministry' );

if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}
require_once ABSPATH . 'wp-settings.php';
