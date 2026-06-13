import React from 'react';

interface CheckboxProps {
	label?: string | React.ReactNode;
	checked: boolean;
	onChange: ( checked: boolean ) => void;
	disabled?: boolean;
	classNames?: {
		root?: string;
		box?: string;
		icon?: string;
		label?: string;
	};
}

export const Checkbox: React.FC< CheckboxProps > = ( {
	label,
	checked,
	onChange,
	disabled,
	classNames,
} ) => {
	return (
		<label
			className={ `wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-gap-3 wpab-wpoa-cursor-pointer ${
				disabled
					? 'wpab-wpoa-opacity-50 wpab-wpoa-cursor-not-allowed'
					: ''
			} ${ classNames?.root || '' }` }
		>
			<div
				className={ `
        wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-justify-center
        wpab-wpoa-w-4 wpab-wpoa-h-4 wpab-wpoa-rounded wpab-wpoa-border-2 wpab-wpoa-transition-all wpab-wpoa-duration-200
        ${
			checked
				? 'wpab-wpoa-border-primary wpab-wpoa-bg-primary'
				: 'wpab-wpoa-border-[#949494] wpab-wpoa-bg-transparent hover:wpab-wpoa-border-primary'
		}
        ${ classNames?.box || '' }
      ` }
			>
				<svg
					className={ `wpab-wpoa-w-3.5 wpab-wpoa-h-3.5 wpab-wpoa-text-white wpab-wpoa-transform wpab-wpoa-transition-transform wpab-wpoa-duration-200 ${
						checked ? 'wpab-wpoa-scale-100' : 'wpab-wpoa-scale-0'
					} ${ classNames?.icon || '' }` }
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<polyline points="20 6 9 17 4 12"></polyline>
				</svg>
				<input
					type="checkbox"
					className="!wpab-wpoa-hidden"
					checked={ checked }
					onChange={ ( e ) => onChange( e.target.checked ) }
					disabled={ disabled }
				/>
			</div>
			{ label && (
				<span
					className={ `wpab-wpoa-text-[13px] wpab-wpoa-font-[400] wpab-wpoa-leading-[20px] wpab-wpoa-text-[#1e1e1e] ${
						classNames?.label || ''
					}` }
				>
					{ label }
				</span>
			) }
		</label>
	);
};
