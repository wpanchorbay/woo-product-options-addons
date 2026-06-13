import { FC } from 'react';
import { useToast } from '../../store/toast/use-toast';
import { Toast } from './Toast';

export const ToastContainer: FC = () => {
	const { toasts, removeToast } = useToast();
	return (
		<div className="wpab-wpoa-fixed wpab-wpoa-bottom-[30px] wpab-wpoa-right-[10px] wpab-wpoa-z-[999999] wpab-wpoa-flex wpab-wpoa-flex-col wpab-wpoa-gap-[10px] wpab-wpoa-min-w-[200px] wpab-wpoa-pointer-events-none">
			{ toasts.map( ( toast ) => (
				<Toast
					key={ toast.id }
					toast={ toast }
					onDismiss={ removeToast }
				/>
			) ) }
		</div>
	);
};
