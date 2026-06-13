import React from 'react';

export const SkeletonSettings: React.FC = () => {
	const SkeleBox = () => (
		<div className="wpab-wpoa-mb-8 wpab-wpoa-bg-white wpab-wpoa-border wpab-wpoa-border-gray-200 wpab-wpoa-rounded-lg wpab-wpoa-overflow-hidden">
			<div className="wpab-wpoa-px-6 wpab-wpoa-py-5 wpab-wpoa-border-b wpab-wpoa-border-gray-200">
				<div className="wpab-wpoa-h-6 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-48 wpab-wpoa-mb-2"></div>
				<div className="wpab-wpoa-h-4 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-96"></div>
			</div>
			<div className="wpab-wpoa-px-6 wpab-wpoa-py-6 wpab-wpoa-flex wpab-wpoa-flex-col wpab-wpoa-gap-6">
				{ Array.from( { length: 2 } ).map( ( _, i ) => (
					<div key={ i } className="wpab-wpoa-flex wpab-wpoa-gap-4">
						<div className="wpab-wpoa-w-1/3">
							<div className="wpab-wpoa-h-5 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-32 wpab-wpoa-mb-2"></div>
							<div className="wpab-wpoa-h-3 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-24"></div>
						</div>
						<div className="wpab-wpoa-w-2/3">
							<div className="wpab-wpoa-h-10 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-full"></div>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);

	return (
		<div className="wpab-wpoa-animate-pulse wpab-wpoa-w-full">
			<SkeleBox />
			<SkeleBox />
			<div className="wpab-wpoa-h-10 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-32 wpab-wpoa-mt-8"></div>
		</div>
	);
};
