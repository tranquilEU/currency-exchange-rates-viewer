import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material';
import type { JSX } from 'react';
import { memo } from 'react';

type DialogProps = {
	title: string;
	confirmText: JSX.Element | string;
	confirmOpen: boolean;
	handleCancelDelete: () => void;
	handleConfirmDelete: () => void;
};

export const DialogComponent = memo(
	({
		title,
		confirmText,
		confirmOpen,
		handleCancelDelete,
		handleConfirmDelete
	}: DialogProps) => {
		return (
			<Dialog open={confirmOpen} onClose={handleCancelDelete}>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{confirmText}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCancelDelete}
						color="primary"
						className="text--bold"
					>
						Cancel
					</Button>
					<Button
						onClick={handleConfirmDelete}
						color="error"
						autoFocus
						className="text--bold"
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
);
