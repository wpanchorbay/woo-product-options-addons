import React from 'react';

interface SwitchProps {
	checked: boolean;
	onChange: ( checked: boolean ) => void;
	disabled?: boolean;
	size?: 'small' | 'medium' | 'large';
	className?: string;
	classNames?: {
		root?: string;
		thumb?: string;
	};
}

export const Switch: React.FC< SwitchProps > = ( {
	checked,
	onChange,
	disabled,
	size = 'medium',
	className = '',
	classNames,
} ) => {
	const sizeConfig = {
		small: {
			switch: 'wpab-wpoa-h-4 wpab-wpoa-w-7',
			thumb: 'wpab-wpoa-h-3 wpab-wpoa-w-3',
			translate: 'wpab-wpoa-translate-x-3',
		},
		medium: {
			switch: 'wpab-wpoa-h-6 wpab-wpoa-w-11',
			thumb: 'wpab-wpoa-h-5 wpab-wpoa-w-5',
			translate: 'wpab-wpoa-translate-x-5',
		},
		large: {
			switch: 'wpab-wpoa-h-7 wpab-wpoa-w-14',
			thumb: 'wpab-wpoa-h-6 wpab-wpoa-w-6',
			translate: 'wpab-wpoa-translate-x-7',
		},
	};

	const currentSize = sizeConfig[ size ];

	return (
		<button
			type="button"
			role="switch"
			aria-checked={ checked }
			onClick={ () => ! disabled && onChange( ! checked ) }
			disabled={ disabled }
			className={ `
        wpab-wpoa-group wpab-wpoa-relative wpab-wpoa-inline-flex wpab-wpoa-shrink-0 wpab-wpoa-cursor-pointer wpab-wpoa-items-center wpab-wpoa-rounded-full wpab-wpoa-border-2 wpab-wpoa-border-transparent wpab-wpoa-transition-colors wpab-wpoa-duration-200 wpab-wpoa-ease-in-out focus:wpab-wpoa-outline-none focus:wpab-wpoa-ring-2 focus:wpab-wpoa-ring-primary focus:wpab-wpoa-ring-offset-2
        ${ currentSize.switch }
        ${ checked ? 'wpab-wpoa-bg-green-500' : 'wpab-wpoa-bg-black' }
        ${ disabled ? 'wpab-wpoa-opacity-50 wpab-wpoa-cursor-not-allowed' : '' }
        ${ className }
        ${ classNames?.root || '' }
      ` }
		>
			<span className="wpab-wpoa-sr-only">Toggle setting</span>
			<span
				aria-hidden="true"
				className={ `
          wpab-wpoa-pointer-events-none wpab-wpoa-inline-block wpab-wpoa-transform wpab-wpoa-rounded-full wpab-wpoa-bg-white wpab-wpoa-shadow wpab-wpoa-ring-0 wpab-wpoa-transition wpab-wpoa-duration-200 wpab-wpoa-ease-in-out
          ${ currentSize.thumb }
          ${ checked ? currentSize.translate : 'wpab-wpoa-translate-x-0' }
          ${ classNames?.thumb || '' }
        ` }
			/>
		</button>
	);
};
