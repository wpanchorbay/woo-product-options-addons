import React from 'react';

export const FormError = ( { message }: { message?: string } ) => {
	if ( ! message ) {
		return null;
	}
	return (
		<div className="wpab-wpoa-text-[#d63638] wpab-wpoa-text-xs wpab-wpoa-mt-1">
			{ message }
		</div>
	);
};
