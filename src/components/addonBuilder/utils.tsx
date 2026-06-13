import React from 'react';
import { MultiSelectOption } from '../../utils/types';

/**
 * Custom render for product options in ClassicMultiSelect (shows thumbnail, ID, SKU)
 * @param option
 */
export function renderProductOption( option: MultiSelectOption ) {
	const opt = option as any;
	return (
		<div className="wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-gap-2">
			{ opt.image && (
				<img
					src={ opt.image }
					alt=""
					className="wpab-wpoa-w-8 wpab-wpoa-h-8 wpab-wpoa-object-cover wpab-wpoa-rounded wpab-wpoa-shrink-0"
				/>
			) }
			<div className="wpab-wpoa-min-w-0">
				<div className="wpab-wpoa-font-medium wpab-wpoa-leading-tight">
					{ opt.label }
				</div>
				<div className="wpab-wpoa-text-[11px] wpab-wpoa-text-[#888] wpab-wpoa-leading-tight">
					ID: { opt.value }
					{ opt.sku ? ` • SKU: ${ opt.sku }` : '' }
				</div>
			</div>
		</div>
	);
}
