import React from 'react';

interface ClassicToggleProps {
	checked: boolean;
	onChange: ( checked: boolean ) => void;
	disabled?: boolean;
	className?: string;
	isError?: boolean;
	id?: string;
}

export const ClassicToggle: React.FC< ClassicToggleProps > = ( {
	checked,
	onChange,
	disabled,
	className = '',
	isError = false,
	id,
} ) => {
	const toggleId =
		id || `classic-toggle-${ Math.random().toString( 36 ).slice( 2, 9 ) }`;

	return (
		<div
			className={ `wpab-wpoa-relative wpab-wpoa-inline-block wpab-wpoa-w-10 wpab-wpoa-align-middle wpab-wpoa-select-none wpab-wpoa-transition wpab-wpoa-duration-200 wpab-wpoa-ease-in ${ className }` }
		>
			<input
				type="checkbox"
				id={ toggleId }
				checked={ checked }
				onChange={ ( e ) => onChange( e.target.checked ) }
				disabled={ disabled }
				className="wpab-wpoa-toggle-checkbox wpab-wpoa-absolute wpab-wpoa-block wpab-wpoa-w-5 wpab-wpoa-h-5 wpab-wpoa-rounded-full wpab-wpoa-bg-white wpab-wpoa-border-4 wpab-wpoa-appearance-none wpab-wpoa-cursor-pointer checked:wpab-wpoa-right-0 checked:wpab-wpoa-border-[#2271b1] wpab-wpoa-right-5 wpab-wpoa-border-[#8c8f94] wpab-wpoa-transition-all wpab-wpoa-duration-200"
			/>
			<label
				htmlFor={ toggleId }
				className={ `wpab-wpoa-toggle-label wpab-wpoa-block wpab-wpoa-overflow-hidden wpab-wpoa-h-5 wpab-wpoa-rounded-full wpab-wpoa-cursor-pointer transition-colors duration-200 ${
					checked
						? isError ? '!wpab-wpoa-bg-red-400' : 'wpab-wpoa-bg-[#2271b1]'
						: isError ? '!wpab-wpoa-bg-red-400' : 'wpab-wpoa-bg-[#8c8f94]'
				} ${
					disabled
						? 'wpab-wpoa-opacity-50 wpab-wpoa-cursor-not-allowed'
						: ''
				}` }
			></label>
			<style>{ `
        .wpab-wpoa-toggle-checkbox:checked {
          right: 0;
          border-color: ${isError ? '#f87171' : '#2271b1'};
        }
        .wpab-wpoa-toggle-checkbox:focus {
            outline: none;
        }
        ${isError ? `.wpab-wpoa-toggle-checkbox { border-color: #f87171 !important; }` : ''}
      ` }</style>
		</div>
	);
};
