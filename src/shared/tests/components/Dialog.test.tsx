import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { DialogComponent } from '@/shared/components/Dialog';

describe('DialogComponent', () => {
	const title = 'Delete Item';
	const confirmText = 'Are you sure you want to delete this item?';

	it('renders nothing when confirmOpen is false', () => {
		render(
			<DialogComponent
				title={title}
				confirmText={confirmText}
				confirmOpen={false}
				handleCancelDelete={jest.fn()}
				handleConfirmDelete={jest.fn()}
			/>
		);

		expect(screen.queryByText(title)).not.toBeInTheDocument();
		expect(screen.queryByText(confirmText)).not.toBeInTheDocument();
	});

	it('renders title and confirm text when open', () => {
		render(
			<DialogComponent
				title={title}
				confirmText={confirmText}
				confirmOpen={true}
				handleCancelDelete={jest.fn()}
				handleConfirmDelete={jest.fn()}
			/>
		);

		expect(screen.getByText(title)).toBeInTheDocument();
		expect(screen.getByText(confirmText)).toBeInTheDocument();
	});

	it('calls handleCancelDelete when Cancel button is clicked', () => {
		const handleCancelDelete = jest.fn();

		render(
			<DialogComponent
				title={title}
				confirmText={confirmText}
				confirmOpen={true}
				handleCancelDelete={handleCancelDelete}
				handleConfirmDelete={jest.fn()}
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

		expect(handleCancelDelete).toHaveBeenCalledTimes(1);
	});

	it('calls handleConfirmDelete when Delete button is clicked', () => {
		const handleConfirmDelete = jest.fn();

		render(
			<DialogComponent
				title={title}
				confirmText={confirmText}
				confirmOpen={true}
				handleCancelDelete={jest.fn()}
				handleConfirmDelete={handleConfirmDelete}
			/>
		);

		fireEvent.click(screen.getByRole('button', { name: /delete/i }));

		expect(handleConfirmDelete).toHaveBeenCalledTimes(1);
	});
});
