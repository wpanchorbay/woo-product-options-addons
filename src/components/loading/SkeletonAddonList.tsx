import React from 'react';

export const SkeletonAddonList: React.FC = () => {
	const skeletonRows = Array.from( { length: 5 }, ( _, i ) => i );

	return (
		<>
			{ skeletonRows.map( ( index ) => (
				<tr
					key={ index }
					className="wpab-wpoa-border-b wpab-wpoa-border-gray-200 wpab-wpoa-animate-pulse"
				>
					<td className="wpab-wpoa-p-2">
						<div className="wpab-wpoa-w-4 wpab-wpoa-h-4 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded"></div>
					</td>
					<td className="wpab-wpoa-p-2">
						<div className="wpab-wpoa-h-4 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-3/4"></div>
						<div className="wpab-wpoa-h-3 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-1/2 wpab-wpoa-mt-2"></div>
					</td>
					<td className="wpab-wpoa-p-2">
						<div className="wpab-wpoa-h-4 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-6"></div>
					</td>
					<td className="wpab-wpoa-p-2">
						<div className="wpab-wpoa-h-4 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-1/3"></div>
					</td>
					<td className="wpab-wpoa-p-2">
						<div className="wpab-wpoa-h-5 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-12"></div>
					</td>
				</tr>
			) ) }
		</>
	);
};
