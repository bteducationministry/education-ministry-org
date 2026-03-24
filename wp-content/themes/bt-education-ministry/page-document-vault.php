<?php
/**
 * Template Name: BTPMA Document Vault
 * Description: Secure document library with upload/download capabilities
 */

// Member-only access control - Operator tier and above
if (!is_user_logged_in()) {
    wp_redirect(wp_login_url(get_permalink()));
    exit;
}

// TODO: Check tier access - Operator and above
// Example: if (!current_user_can('access_document_vault')) { wp_die('Access denied'); }

get_header();

$current_user = wp_get_current_user();
$user_id = $current_user->ID;

// TODO: Fetch member tier to determine upload permissions
$member_tier = 'Operator'; // Placeholder
$can_upload = in_array($member_tier, ['Architect', 'Steward']);

// TODO: Fetch documents from database
// Example: $documents = get_user_documents($user_id);
// Placeholder document data
$documents = [
    [
        'id' => 1,
        'name' => 'Trust Formation Guide.pdf',
        'category' => 'trust',
        'size' => '2.4 MB',
        'uploaded' => 'March 15, 2026',
        'version' => '1.0',
        'access_level' => 'Private'
    ],
    [
        'id' => 2,
        'name' => 'Community Garden Project Plan.docx',
        'category' => 'projects',
        'size' => '856 KB',
        'uploaded' => 'March 10, 2026',
        'version' => '2.1',
        'access_level' => 'Private'
    ],
    [
        'id' => 3,
        'name' => 'Governance Policy Manual.pdf',
        'category' => 'governance',
        'size' => '5.2 MB',
        'uploaded' => 'February 28, 2026',
        'version' => '1.5',
        'access_level' => 'Shared'
    ],
    [
        'id' => 4,
        'name' => 'Personal Estate Inventory.xlsx',
        'category' => 'personal',
        'size' => '124 KB',
        'uploaded' => 'February 20, 2026',
        'version' => '3.0',
        'access_level' => 'Private'
    ],
];

$category_filter = isset($_GET['category']) ? sanitize_text_field($_GET['category']) : 'all';
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
            <span>Document Vault</span>
        </nav>

        <!-- Page Header -->
        <section class="page-header">
            <div class="header-content">
                <h1><i class="fas fa-vault"></i> Document Vault</h1>
                <p class="page-description">Securely store and access your important documents.</p>
            </div>
            <?php if ($can_upload) : ?>
            <div class="header-actions">
                <button class="btn-primary" id="uploadDocumentBtn">
                    <i class="fas fa-upload"></i> Upload Document
                </button>
            </div>
            <?php else : ?>
            <div class="header-actions">
                <div class="upgrade-notice">
                    <i class="fas fa-info-circle"></i> Upgrade to Architect for upload access
                </div>
            </div>
            <?php endif; ?>
        </section>

        <!-- Filter and Search Bar -->
        <section class="filter-search-bar">
            <div class="filter-group">
                <label>Category:</label>
                <div class="filter-buttons">
                    <a href="?category=all" class="filter-btn <?php echo ($category_filter === 'all') ? 'active' : ''; ?>">All</a>
                    <a href="?category=personal" class="filter-btn <?php echo ($category_filter === 'personal') ? 'active' : ''; ?>">Personal</a>
                    <a href="?category=projects" class="filter-btn <?php echo ($category_filter === 'projects') ? 'active' : ''; ?>">Projects</a>
                    <a href="?category=trust" class="filter-btn <?php echo ($category_filter === 'trust') ? 'active' : ''; ?>">Trust</a>
                    <a href="?category=governance" class="filter-btn <?php echo ($category_filter === 'governance') ? 'active' : ''; ?>">Governance</a>
                </div>
            </div>
            <div class="search-group">
                <input type="text" id="documentSearch" placeholder="Search documents..." class="search-input">
                <i class="fas fa-search"></i>
            </div>
        </section>

        <!-- Documents Table -->
        <section class="dashboard-card documents-table">
            <table class="vault-table">
                <thead>
                    <tr>
                        <th>Document Name</th>
                        <th>Category</th>
                        <th>Size</th>
                        <th>Uploaded</th>
                        <th>Version</th>
                        <th>Access</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                    foreach ($documents as $doc) :
                        // Apply category filter
                        if ($category_filter !== 'all' && $doc['category'] !== $category_filter) {
                            continue;
                        }
                        
                        $category_icons = [
                            'personal' => 'fa-user',
                            'projects' => 'fa-project-diagram',
                            'trust' => 'fa-balance-scale',
                            'governance' => 'fa-gavel'
                        ];
                    ?>
                    <tr>
                        <td class="doc-name">
                            <i class="fas fa-file-pdf"></i>
                            <?php echo esc_html($doc['name']); ?>
                        </td>
                        <td>
                            <span class="category-badge category-<?php echo esc_attr($doc['category']); ?>">
                                <i class="fas <?php echo $category_icons[$doc['category']]; ?>"></i>
                                <?php echo ucfirst($doc['category']); ?>
                            </span>
                        </td>
                        <td><?php echo esc_html($doc['size']); ?></td>
                        <td><?php echo esc_html($doc['uploaded']); ?></td>
                        <td>v<?php echo esc_html($doc['version']); ?></td>
                        <td>
                            <span class="access-badge access-<?php echo strtolower($doc['access_level']); ?>">
                                <?php echo esc_html($doc['access_level']); ?>
                            </span>
                        </td>
                        <td class="action-buttons">
                            <a href="#" class="action-btn" title="View">
                                <i class="fas fa-eye"></i>
                            </a>
                            <a href="#" class="action-btn" title="Download">
                                <i class="fas fa-download"></i>
                            </a>
                            <a href="#" class="action-btn" title="Version History">
                                <i class="fas fa-history"></i>
                            </a>
                            <?php if ($can_upload) : ?>
                            <a href="#" class="action-btn" title="Delete">
                                <i class="fas fa-trash"></i>
                            </a>
                            <?php endif; ?>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>

            <?php if (empty($documents) || ($category_filter !== 'all' && count(array_filter($documents, function($d) use ($category_filter) { return $d['category'] === $category_filter; })) === 0)) : ?>
            <div class="no-documents-message">
                <i class="fas fa-folder-open"></i>
                <h3>No documents found</h3>
                <p>You don't have any <?php echo ($category_filter !== 'all') ? $category_filter : ''; ?> documents yet.</p>
            </div>
            <?php endif; ?>
        </section>

        <!-- Storage Info -->
        <section class="dashboard-card storage-info">
            <h2><i class="fas fa-hdd"></i> Storage Information</h2>
            <div class="storage-details">
                <div class="storage-bar">
                    <div class="storage-used" style="width: 35%;"></div>
                </div>
                <p>Using 3.5 GB of 10 GB available storage</p>
                <?php if (!$can_upload) : ?>
                <p class="upgrade-note"><i class="fas fa-arrow-up"></i> Upgrade to Architect or Steward for increased storage and upload capabilities.</p>
                <?php endif; ?>
            </div>
        </section>

        <!-- Upload Modal (Hidden by default) -->
        <?php if ($can_upload) : ?>
        <div id="uploadModal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2><i class="fas fa-upload"></i> Upload Document</h2>
                <form id="uploadForm" enctype="multipart/form-data">
                    <!-- TODO: Implement file upload handler -->
                    <div class="form-group">
                        <label>Select File:</label>
                        <input type="file" name="document" required>
                    </div>
                    <div class="form-group">
                        <label>Category:</label>
                        <select name="category" required>
                            <option value="personal">Personal</option>
                            <option value="projects">Projects</option>
                            <option value="trust">Trust</option>
                            <option value="governance">Governance</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Access Level:</label>
                        <select name="access_level" required>
                            <option value="private">Private</option>
                            <option value="shared">Shared</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary">Upload</button>
                </form>
            </div>
        </div>

        <script>
        // Simple modal toggle
        document.getElementById('uploadDocumentBtn')?.addEventListener('click', function() {
            document.getElementById('uploadModal').style.display = 'flex';
        });
        document.querySelector('.close-modal')?.addEventListener('click', function() {
            document.getElementById('uploadModal').style.display = 'none';
        });
        </script>
        <?php endif; ?>

    </main>
</div>

<?php get_footer(); ?>