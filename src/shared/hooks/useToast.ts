import { useState } from 'react';

export const useToast = () => {
	const [open, setOpen] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [toastSeverity, setToastSeverity] = useState<
		'info' | 'success' | 'warning' | 'error'
	>('info');

	const triggerToast = (
		message: string,
		severity: 'info' | 'success' | 'warning' | 'error'
	) => {
		setToastMessage(message);
		setToastSeverity(severity);
		setOpen(true);
	};
	return { open, setOpen, toastMessage, toastSeverity, triggerToast };
};
