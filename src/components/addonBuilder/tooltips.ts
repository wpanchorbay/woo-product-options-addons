import { __ } from '@wordpress/i18n';

/**
 * Centralized tooltips for the Addon Builder field settings.
 * All help text strings are internationalized using __().
 */
export const FIELD_TOOLTIPS = {
	label: __(
		'The name of the field shown to the customer on the product page.',
		'woo-product-options-addons'
	),
	id: __(
		'A unique identifier for this field, used for internal tracking and conditional logic.',
		'woo-product-options-addons'
	),
	type: __(
		'The input method used to collect data from customers.',
		'woo-product-options-addons'
	),
	description: __(
		'Additional instruction text displayed below the field input on the product page.',
		'woo-product-options-addons'
	),
	placeholder: __(
		"A short hint displayed inside the input when it is empty.",
		'woo-product-options-addons'
	),
	required: __(
		'Whether this field must be completed before the product can be added to the cart.',
		'woo-product-options-addons'
	),
	class_name: __(
		'Custom CSS class for advanced styling of the field container.',
		'woo-product-options-addons'
	),
	price_type: __(
		'The calculation method used to determine the price impact of this field.',
		'woo-product-options-addons'
	),
	price: __(
		'The monetary value added to or subtracted from the product price.',
		'woo-product-options-addons'
	),
	weight: __(
		'The weight adjustment for this field, used in shipping calculations.',
		'woo-product-options-addons'
	),
	restrictions: __(
		'Validation rules such as character limits or numeric ranges.',
		'woo-product-options-addons'
	),
	file_restrictions: __(
		'Allowed file extensions and maximum file size for uploads.',
		'woo-product-options-addons'
	),
	choices: __(
		'The list of selectable options available for this field.',
		'woo-product-options-addons'
	),
	conditional_logic: __(
		'Rules that determine when this field is shown or hidden based on other field values.',
		'woo-product-options-addons'
	),
};
