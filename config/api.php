<?php
/**
 * API Configuration
 *
 * Use this file to register your API controllers.
 * Each controller must extend Opopw\Api\ApiController
 * and implement get_instance() and run().
 *
 * @since      1.0.0
 * @package    Opopw
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return array(
	\Opopw\Api\SettingsController::class,
	\Opopw\Api\AddonGroupController::class,
	\Opopw\Api\ResourceController::class,
	\Opopw\Api\InventoryController::class,
	\Opopw\Api\ExportImportController::class,
);
