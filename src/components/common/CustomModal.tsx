import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface CustomModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: ReactNode;
	children: ReactNode;
	footer?: ReactNode;
	maxWidth?: string;
	closeOnOutsideClick?: boolean;
	className?: string;
	showHeader?: boolean;
	classNames?: {
		header?: string;
		body?: string;
		footer?: string;
	};
}

const CustomModal: React.FC< CustomModalProps > = ( {
	isOpen,
	onClose,
	title,
	children,
	footer,
	maxWidth = 'wpab-wpoa-max-w-2xl',
	closeOnOutsideClick = true,
	className = '',
	showHeader = true,
	classNames = {
		header: '',
		body: '',
		footer: '',
	},
} ) => {
	// Handle Escape key to close
	useEffect( () => {
		const handleEsc = ( e: KeyboardEvent ) => {
			if ( e.key === 'Escape' ) {
				onClose();
			}
		};

		if ( isOpen ) {
			window.addEventListener( 'keydown', handleEsc );
			// Prevent scrolling on body when modal is open
			document.body.style.overflow = 'hidden';
		}

		return () => {
			window.removeEventListener( 'keydown', handleEsc );
			document.body.style.overflow = '';
		};
	}, [ isOpen, onClose ] );

	if ( ! isOpen ) {
		return null;
	}

	return createPortal(
		<div className="wpab-wpoa-fixed wpab-wpoa-inset-0 wpab-wpoa-z-[9998] wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-justify-center wpab-wpoa-p-4 wpab-wpoa-bg-black/75 wpab-wpoa-transition-opacity wpab-wpoa-duration-300">
			{ /* Backdrop click handler */ }
			<div
				className="wpab-wpoa-absolute wpab-wpoa-inset-0"
				onClick={ closeOnOutsideClick ? onClose : undefined }
			/>

			{ /* Modal Content */ }
			<div
				className={ `
          wpab-wpoa-relative wpab-wpoa-w-full ${ maxWidth } 
          wpab-wpoa-bg-white wpab-wpoa-shadow-2xl wpab-wpoa-rounded-xl 
          wpab-wpoa-flex wpab-wpoa-flex-col wpab-wpoa-max-h-[90vh]
          wpab-wpoa-animate-in wpab-wpoa-fade-in wpab-wpoa-zoom-in-95 wpab-wpoa-duration-200
          ${ className }
        ` }
				role="dialog"
				aria-modal="true"
			>
				{ /* Header */ }
				{ showHeader && (
					<div
						className={ `wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-justify-between wpab-wpoa-px-6 wpab-wpoa-py-4 wpab-wpoa-border-b wpab-wpoa-border-gray-100 ${ classNames.header }` }
					>
						<h3 className="wpab-wpoa-text-lg wpab-wpoa-font-semibold wpab-wpoa-text-gray-900">
							{ title }
						</h3>
						<button
							onClick={ onClose }
							className="wpab-wpoa-p-1.5 wpab-wpoa-text-gray-400 hover:wpab-wpoa-text-gray-600 wpab-wpoa-transition-colors hover:wpab-wpoa-bg-gray-100 wpab-wpoa-rounded-full"
							aria-label="Close modal"
						>
							<X className="wpab-wpoa-w-5 wpab-wpoa-h-5" />
						</button>
					</div>
				) }

				{ /* Body */ }
				<div
					className={ `wpab-wpoa-p-6 wpab-wpoa-overflow-y-auto wpab-wpoa-flex-1 ${ classNames.body }` }
				>
					{ children }
				</div>

				{ /* Footer */ }
				{ footer && (
					<div
						className={ `wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-justify-end wpab-wpoa-gap-3 wpab-wpoa-px-6 wpab-wpoa-py-4 wpab-wpoa-bg-gray-50 wpab-wpoa-border-t wpab-wpoa-border-gray-100 wpab-wpoa-rounded-b-xl ${ classNames.footer }` }
					>
						{ footer }
					</div>
				) }
			</div>
		</div>,
		document.body
	);
};

export default CustomModal;
