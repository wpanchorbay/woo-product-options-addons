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
	{ value: 'text', label: __('Text Input', 'woo-product-options-addons') },
	{ value: 'textarea', label: __('Textarea', 'woo-product-options-addons') },
	{ value: 'select', label: __('Dropdown', 'woo-product-options-addons') },
	{ value: 'checkbox', label: __('Checkboxes', 'woo-product-options-addons') },
	{ value: 'radio', label: __('Radio Buttons', 'woo-product-options-addons') },
	{ value: 'single_checkbox', label: __('Checkbox', 'woo-product-options-addons') },
	{ value: 'number', label: __('Number', 'woo-product-options-addons') },
	{ value: 'email', label: __('Email', 'woo-product-options-addons') },
	{ value: 'color_swatch', label: __('Color Swatch', 'woo-product-options-addons') },
	{ value: 'image_swatch', label: __('Image Swatch', 'woo-product-options-addons') },
	{ value: 'static_content', label: __('Static Content', 'woo-product-options-addons') },
];

export const PRICE_TYPES = [
	{ value: 'none', label: __( 'No Price', 'woo-product-options-addons' ) },
	{ value: 'flat', label: __( 'Flat Fee', 'woo-product-options-addons' ) },
	{ value: 'percentage', label: __( 'Percentage of Base', 'woo-product-options-addons' ) },
];

export const REDUCTION_MODES = [
	{ value: 'per_item_qty', label: __( 'Per Item Quantity', 'woo-product-options-addons' ) },
	{
		value: 'per_line_item',
		label: __( 'Per Line Item (Once)', 'woo-product-options-addons' ),
	},
];
