import React, { useState, useRef, useEffect } from 'react';

export type PopoverAlign =
	| 'top'
	| 'top-left'
	| 'top-right'
	| 'bottom'
	| 'bottom-left'
	| 'bottom-right'
	| 'left'
	| 'right';

interface PopoverProps {
	trigger: React.ReactNode;
	content: React.ReactNode;
	align?: PopoverAlign;
	className?: string;
	classNames?: {
		root?: string;
		triggerWrapper?: string;
		content?: string;
	};
}

export const Popover: React.FC< PopoverProps > = ( {
	trigger,
	content,
	align = 'bottom-left',
	className = '',
	classNames,
} ) => {
	const [ isOpen, setIsOpen ] = useState( false );
	const containerRef = useRef< HTMLDivElement >( null );

	// Close when clicking outside
	useEffect( () => {
		const handleClickOutside = ( event: MouseEvent ) => {
			if (
				containerRef.current &&
				! containerRef.current.contains( event.target as Node )
			) {
				setIsOpen( false );
			}
		};

		if ( isOpen ) {
			document.addEventListener( 'mousedown', handleClickOutside );
		}
		return () => {
			document.removeEventListener( 'mousedown', handleClickOutside );
		};
	}, [ isOpen ] );

	const toggle = () => setIsOpen( ! isOpen );

	// Position & Origin Logic
	let positionClasses = '';
	let originClass = '';

	switch ( align ) {
		case 'top':
			positionClasses =
				'wpab-wpoa-bottom-full wpab-wpoa-mb-2 wpab-wpoa-left-1/2 wpab-wpoa--translate-x-1/2';
			originClass = 'wpab-wpoa-origin-bottom';
			break;
		case 'top-left':
			positionClasses =
				'wpab-wpoa-bottom-full wpab-wpoa-mb-2 wpab-wpoa-left-0';
			originClass = 'wpab-wpoa-origin-bottom-left';
			break;
		case 'top-right':
			positionClasses =
				'wpab-wpoa-bottom-full wpab-wpoa-mb-2 wpab-wpoa-right-0';
			originClass = 'wpab-wpoa-origin-bottom-right';
			break;
		case 'bottom':
			positionClasses =
				'wpab-wpoa-top-full wpab-wpoa-mt-2 wpab-wpoa-left-1/2 wpab-wpoa--translate-x-1/2';
			originClass = 'wpab-wpoa-origin-top';
			break;
		case 'bottom-left':
			positionClasses =
				'wpab-wpoa-top-full wpab-wpoa-mt-2 wpab-wpoa-left-0';
			originClass = 'wpab-wpoa-origin-top-left';
			break;
		case 'bottom-right':
			positionClasses =
				'wpab-wpoa-top-full wpab-wpoa-mt-2 wpab-wpoa-right-0';
			originClass = 'wpab-wpoa-origin-top-right';
			break;
		case 'left':
			positionClasses =
				'wpab-wpoa-right-full wpab-wpoa-mr-2 wpab-wpoa-top-1/2 wpab-wpoa--translate-y-1/2';
			originClass = 'wpab-wpoa-origin-right';
			break;
		case 'right':
			positionClasses =
				'wpab-wpoa-left-full wpab-wpoa-ml-2 wpab-wpoa-top-1/2 wpab-wpoa--translate-y-1/2';
			originClass = 'wpab-wpoa-origin-left';
			break;
		default:
			positionClasses =
				'wpab-wpoa-top-full wpab-wpoa-mt-2 wpab-wpoa-left-0';
			originClass = 'wpab-wpoa-origin-top-left';
	}

	// Transition classes (Opacity + Scale)
	const transitionClasses = isOpen
		? 'wpab-wpoa-opacity-100 wpab-wpoa-scale-100 wpab-wpoa-pointer-events-auto'
		: 'wpab-wpoa-opacity-0 wpab-wpoa-scale-95 wpab-wpoa-pointer-events-none';

	return (
		<div
			ref={ containerRef }
			className={ `wpab-wpoa-relative wpab-wpoa-inline-block ${ className } ${
				classNames?.root || ''
			}` }
		>
			{ /* Trigger Wrapper */ }
			<div
				onClick={ toggle }
				className={ `wpab-wpoa-cursor-pointer wpab-wpoa-inline-flex ${
					classNames?.triggerWrapper || ''
				}` }
			>
				{ trigger }
			</div>

			{ /* Dropdown Content */ }
			<div
				className={ `
          wpab-wpoa-absolute wpab-wpoa-z-50 wpab-wpoa-w-48
          wpab-wpoa-bg-white wpab-wpoa-rounded-xl wpab-wpoa-shadow-xl wpab-wpoa-border wpab-wpoa-border-default
          wpab-wpoa-transition-all wpab-wpoa-duration-200 wpab-wpoa-ease-out
          ${ positionClasses }
          ${ originClass }
          ${ transitionClasses }
          ${ classNames?.content || '' }
        ` }
			>
				{ content }
			</div>
		</div>
	);
};
