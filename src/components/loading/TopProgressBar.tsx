import React, { useEffect, useState } from 'react';

interface TopProgressBarProps {
	isSaving: boolean;
}

export const TopProgressBar: React.FC< TopProgressBarProps > = ( {
	isSaving,
} ) => {
	const [ progress, setProgress ] = useState( 0 );

	useEffect( () => {
		let interval: NodeJS.Timeout;
		if ( isSaving ) {
			setProgress( 0 );
			interval = setInterval( () => {
				setProgress( ( prev ) => {
					if ( prev >= 90 ) {
						clearInterval( interval );
						return prev;
					}
					const jump = Math.random() * 10;
					return prev + jump;
				} );
			}, 300 );
		} else {
			setProgress( 100 );
			const timeout = setTimeout( () => {
				setProgress( 0 );
			}, 500 ); // Wait for transition to finish before resetting

			return () => clearTimeout( timeout );
		}

		return () => {
			if ( interval ) {
				clearInterval( interval );
			}
		};
	}, [ isSaving ] );

	if ( ! isSaving && progress === 0 ) {
		return null;
	}

	return (
		<div className="wpab-wpoa-fixed wpab-wpoa-top-0 wpab-wpoa-left-0 wpab-wpoa-w-full wpab-wpoa-h-[3px] wpab-wpoa-z-[99999] wpab-wpoa-pointer-events-none">
			<div
				className="wpab-wpoa-h-full wpab-wpoa-bg-[#2271b1] wpab-wpoa-transition-all wpab-wpoa-duration-300 wpab-wpoa-ease-out"
				style={ {
					width: `${ progress }%`,
					opacity: progress === 100 ? 0 : 1,
				} }
			/>
		</div>
	);
};
