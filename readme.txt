=== OptionBay - Product Options and Addons ===
Contributors: wpanchorbay
Tags: woocommerce, product options, addons, product fields, extra product options
Requires at least: 6.8
Tested up to: 7.0
Requires PHP: 7.0
WC requires at least: 6.1
WC tested up to: 10.8
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Add custom product options, paid add-ons, extra fields, and customizable swatches to your WooCommerce store with flexible pricing, conditional logic, and inventory management.

== Description ==

**OptionBay - Product Options and Addons** helps WooCommerce stores add flexible product fields, paid add-ons, swatches, conditional logic, and inventory-aware options to product pages.

Create highly customizable option groups and assign them to specific products, categories, tags, or globally across your entire store. Whether you need to collect custom text, set up image/color swatches, or configure flat or percentage pricing, OptionBay handles it all with a smooth, premium React-based admin interface and robust database persistence.

= Core Features =
* **Rich Field Types**: Support for Text, Textarea, Number, Email, Select Dropdowns, Checkboxes (Single & Multiple), Radio Buttons, Color Swatches, Image Swatches, and HTML/Static Content.
* **Flexible Pricing**: Assign flat fees or percentage increases/decreases to your custom options.
* **Conditional Logic**: Show or hide fields dynamically based on user selections and values of other fields in the group.
* **Dynamic Target Assignments**: Route options globally, or restrict them to specific products, product categories, and tags with support for exclusion rules and execution priorities.
* **Real-time Inventory Handshake**: Atomically track and reserve stock levels at the individual option level, checking availability on the frontend and decrementing on checkout to prevent overselling.
* **HPOS Ready**: Fully compatible with WooCommerce High-Performance Order Storage (HPOS) and traditional post-meta database architectures.
* **Import & Export**: Easily migrate options, configurations, and inventory settings between staging and production environments using JSON exports.

= Developer-First Architecture =
* Fully decoupled REST API endpoints for schema and inventory management.
* Built using modern React, TypeScript, and webpack tools.
* Clean PHP codebase utilizing object-oriented singleton patterns, Composer autoloader, and standard WordPress database hooks.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/woo-product-options-addons` directory, or install the plugin directly through the WordPress plugins screen.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Use the new **Options** submenu under the **Products** menu to start creating your first option group.

== Frequently Asked Questions ==

= Does this plugin require WooCommerce to be active? =
Yes, OptionBay requires WooCommerce to be active as it integrates directly with WooCommerce products, cart, checkout, and order structures.

= Can I set up paid add-ons that change the main product price? =
Absolutely. Each option can have its own pricing model (flat or percentage) which automatically updates the product display price on the frontend and aggregates at checkout.

= Does it support inventory tracking on option selections? =
Yes. The plugin features a custom inventory management lookup table. You can map options to global inventory records to ensure stock counts are verified on product pages and decremented upon successful checkout.

= Can I show or hide fields depending on what the customer chooses? =
Yes. You can build advanced conditional logic rules within the React builder UI to show or hide fields dynamically depending on customer selections.

== Screenshots ==

1. Option Groups Builder - The premium React-powered option groups builder admin interface.
2. Product Page Rendering - Custom text inputs and image swatches rendered on the product page.
3. Checkout & Order Details - Cart and order summary showing selected options and pricing breakdowns.

== Changelog ==

= 1.0.0 =
* Initial release.
* Added 11 key field types, advanced pricing strategies, conditional logic, and target assignment rules.
* Integrated dynamic option-level inventory tracking.
