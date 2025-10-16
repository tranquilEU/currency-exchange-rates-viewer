import MuiAlert, { type AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';

export interface ToastProps {
	open: boolean;
	message: string;
	severity?: AlertColor;
	autoHideDuration?: number;
	onClose: () => void;
	anchorOrigin?: {
		vertical: 'top' | 'bottom';
		horizontal: 'left' | 'center' | 'right';
	};
}

const Toast: React.FC<ToastProps> = ({
	open,
	message,
	severity = 'info',
	autoHideDuration = 3000,
	onClose,
	anchorOrigin = { vertical: 'bottom', horizontal: 'center' }
}) => {
	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') return;
		onClose();
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={autoHideDuration}
			onClose={handleClose}
			anchorOrigin={anchorOrigin}
		>
			<MuiAlert
				variant="filled"
				onClose={handleClose}
				severity={severity}
				sx={{ width: '100%' }}
			>
				{message}
			</MuiAlert>
		</Snackbar>
	);
};

export default Toast;
