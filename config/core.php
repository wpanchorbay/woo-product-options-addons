<?php
/**
 * Core Configuration
 *
 * Use this file to register your Core classes that need to be initialized.
 * Each class should implement a run($loader) method or similar logic
 * to register its hooks with the Loader.
 *
 * @since      1.0.0
 * @package    Opopw
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	\Opopw\Admin\Admin::class,
	\Opopw\Core\Settings::class,
	\Opopw\Core\Cron::class,
	\Opopw\Core\AddonGroup::class,
	\Opopw\Core\AddonRenderer::class,
	\Opopw\Core\CartManager::class,
);
