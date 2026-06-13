import React, { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes< HTMLButtonElement > {
	children: React.ReactNode;
	className?: string;
	size?: 'small' | 'medium' | 'large';
	color?: 'primary' | 'secondary' | 'danger';
	variant?: 'solid' | 'outline' | 'ghost';
}

const Button = forwardRef< HTMLButtonElement, ButtonProps >(
	(
		{
			children,
			className = '',
			size = 'medium',
			color = 'primary',
			variant = 'solid',
			...props
		},
		ref
	) => {
		const sizeClasses = {
			small: 'wpab-wpoa-px-[8px] wpab-wpoa-py-[5px]',
			medium: 'wpab-wpoa-px-[12px] wpab-wpoa-py-[6px]',
			large: 'wpab-wpoa-px-[16px] wpab-wpoa-py-[10px]',
		};

		const colorClasses = {
			primary: {
				solid: 'wpab-wpoa-bg-primary wpab-wpoa-text-white wpab-wpoa-border wpab-wpoa-border-primary hover:wpab-wpoa-bg-primary-hovered hover:wpab-wpoa-border-primary-hovered',
				outline:
					'wpab-wpoa-bg-transparent wpab-wpoa-border wpab-wpoa-border-primary wpab-wpoa-text-primary hover:wpab-wpoa-bg-primary hover:wpab-wpoa-text-white',
				ghost: 'wpab-wpoa-bg-transparent wpab-wpoa-text-primary hover:wpab-wpoa-text-primary-hovered hover:wpab-wpoa-bg-primary/10',
			},
			secondary: {
				solid: 'wpab-wpoa-bg-secondary wpab-wpoa-text-white wpab-wpoa-border wpab-wpoa-border-secondary hover:wpab-wpoa-bg-secondary-hovered',
				outline:
					'wpab-wpoa-bg-transparent wpab-wpoa-border wpab-wpoa-border-secondary wpab-wpoa-text-secondary hover:wpab-wpoa-bg-secondary hover:wpab-wpoa-text-white',
				ghost: 'wpab-wpoa-bg-transparent wpab-wpoa-text-[#1e1e1e] hover:!wpab-wpoa-text-primary',
			},
			danger: {
				solid: 'wpab-wpoa-bg-red-500 wpab-wpoa-text-white wpab-wpoa-border wpab-wpoa-border-red-500 hover:wpab-wpoa-bg-red-600 hover:wpab-wpoa-border-red-600',
				outline:
					'wpab-wpoa-bg-transparent wpab-wpoa-border wpab-wpoa-border-red-500 wpab-wpoa-text-red-500 hover:wpab-wpoa-bg-red-500 hover:wpab-wpoa-text-white',
				ghost: 'wpab-wpoa-bg-transparent wpab-wpoa-text-red-500 hover:wpab-wpoa-bg-red-500/10',
			},
		};

		// Safely access nested properties
		const variantClasses =
			colorClasses[ color ]?.[ variant ] ?? colorClasses.primary.solid;
		const finalSizeClass = sizeClasses[ size ] ?? sizeClasses.medium;

		return (
			<button
				ref={ ref }
				className={ `
                wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-justify-center wpab-wpoa-gap-[6px]
                wpab-wpoa-text-default wpab-wpoa-rounded-[8px] wpab-wpoa-transition-all wpab-wpoa-duration-200
                disabled:wpab-wpoa-opacity-50 disabled:wpab-wpoa-cursor-not-allowed
                ${ finalSizeClass } 
                ${ variantClasses } 
                ${ className }
            ` }
				{ ...props }
			>
				{ children }
			</button>
		);
	}
);

export default Button;
