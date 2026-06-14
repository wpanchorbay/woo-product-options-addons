import { __ } from '@wordpress/i18n';
import {
	Type,
	AlignLeft,
	ChevronDown,
	SquareCheck,
	CircleDot,
	ToggleLeft,
	Hash,
	AtSign,
	Palette,
	ImagePlus,
	LucideIcon,
} from 'lucide-react';

// Removed proFeatures logic

export const FIELD_TYPE_ICONS: Record< string, LucideIcon > = {
	text: Type,
	textarea: AlignLeft,
	select: ChevronDown,
	checkbox: SquareCheck,
	radio: CircleDot,
	single_checkbox: ToggleLeft,
	number: Hash,
	email: AtSign,
	color_swatch: Palette,
	image_swatch: ImagePlus,
};

export const FIELD_TYPES = [
	{ value: 'text', label: __('Text Input', 'product-options-addons-woo') },
	{ value: 'textarea', label: __('Textarea', 'product-options-addons-woo') },
	{ value: 'select', label: __('Dropdown', 'product-options-addons-woo') },
	{ value: 'checkbox', label: __('Checkboxes', 'product-options-addons-woo') },
	{ value: 'radio', label: __('Radio Buttons', 'product-options-addons-woo') },
	{ value: 'single_checkbox', label: __('Checkbox', 'product-options-addons-woo') },
	{ value: 'number', label: __('Number', 'product-options-addons-woo') },
	{ value: 'email', label: __('Email', 'product-options-addons-woo') },
	{ value: 'color_swatch', label: __('Color Swatch', 'product-options-addons-woo') },
	{ value: 'image_swatch', label: __('Image Swatch', 'product-options-addons-woo') },
	{ value: 'static_content', label: __('Static Content', 'product-options-addons-woo') },
];

export const PRICE_TYPES = [
	{ value: 'none', label: __( 'No Price', 'product-options-addons-woo' ) },
	{ value: 'flat', label: __( 'Flat Fee', 'product-options-addons-woo' ) },
	{ value: 'percentage', label: __( 'Percentage of Base', 'product-options-addons-woo' ) },
];

export const REDUCTION_MODES = [
	{ value: 'per_item_qty', label: __( 'Per Item Quantity', 'product-options-addons-woo' ) },
	{
		value: 'per_line_item',
		label: __( 'Per Line Item (Once)', 'product-options-addons-woo' ),
	},
];
