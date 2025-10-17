import MuiAlert, { type AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { memo } from 'react';

type ToastProps = {
	open: boolean;
	message: string;
	severity?: AlertColor;
	autoHideDuration?: number;
	onClose: () => void;
	anchorOrigin?: {
		vertical: 'top' | 'bottom';
		horizontal: 'left' | 'center' | 'right';
	};
};

export const Toast = memo(
	({
		open,
		message,
		severity = 'info',
		autoHideDuration = 3000,
		onClose,
		anchorOrigin = { vertical: 'bottom', horizontal: 'center' }
	}: ToastProps) => {
		const handleClose = (
			_event?: React.SyntheticEvent | Event,
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
	}
);
