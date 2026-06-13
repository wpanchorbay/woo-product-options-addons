import React from 'react';

export const SkeletonBuilder: React.FC = () => {
	return (
		<div className="wpab-wpoa-animate-pulse wpab-wpoa-flex wpab-wpoa-flex-col lg:wpab-wpoa-flex-row wpab-wpoa-gap-6 wpab-wpoa-items-start wpab-wpoa-w-full">
			{ /* Left side */ }
			<div className="wpab-wpoa-w-full wpab-wpoa-flex wpab-wpoa-flex-col wpab-wpoa-gap-6">
				{ /* Title Input */ }
				<div className="wpab-wpoa-h-[50px] wpab-wpoa-bg-gray-200 wpab-wpoa-rounded-md wpab-wpoa-w-full"></div>

				{ /* Assignment rules container */ }
				<div className="wpab-wpoa-h-[100px] wpab-wpoa-bg-gray-200 wpab-wpoa-rounded-lg wpab-wpoa-w-full"></div>

				{ /* Fields header */ }
				<div>
					<div className="wpab-wpoa-h-6 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-32 wpab-wpoa-mb-2"></div>
					<div className="wpab-wpoa-h-4 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-w-64"></div>
				</div>

				{ /* Fields list */ }
				<div className="wpab-wpoa-border wpab-wpoa-border-gray-200 wpab-wpoa-rounded-lg wpab-wpoa-p-4">
					{ Array.from( { length: 3 } ).map( ( _, i ) => (
						<div
							key={ i }
							className="wpab-wpoa-h-12 wpab-wpoa-bg-gray-100 wpab-wpoa-rounded-md wpab-wpoa-w-full wpab-wpoa-mb-2 wpab-wpoa-flex wpab-wpoa-items-center wpab-wpoa-px-4"
						>
							<div className="wpab-wpoa-h-4 wpab-wpoa-w-4 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-mr-4"></div>
							<div className="wpab-wpoa-h-4 wpab-wpoa-w-32 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded wpab-wpoa-mr-auto"></div>
							<div className="wpab-wpoa-h-4 wpab-wpoa-w-24 wpab-wpoa-bg-gray-200 wpab-wpoa-rounded"></div>
						</div>
					) ) }
				</div>
			</div>

			{ /* Right Sidebar */ }
			<div className="lg:wpab-wpoa-w-[320px] wpab-wpoa-w-full wpab-wpoa-flex-shrink-0">
				<div className="wpab-wpoa-h-[500px] wpab-wpoa-bg-gray-200 wpab-wpoa-rounded-lg wpab-wpoa-w-full"></div>
			</div>
		</div>
	);
};
