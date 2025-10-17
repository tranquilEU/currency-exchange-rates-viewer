import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Toast } from '@/shared/components/Toast';

describe('Toast component', () => {
	it('renders with message and default severity', () => {
		render(<Toast open={true} message="Hello World" onClose={jest.fn()} />);

		expect(screen.getByText('Hello World')).toBeInTheDocument();

		expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledInfo');
	});

	it('renders with custom severity', () => {
		render(
			<Toast
				open={true}
				message="Error occurred"
				severity="error"
				onClose={jest.fn()}
			/>
		);

		expect(screen.getByText('Error occurred')).toBeInTheDocument();
		expect(screen.getByRole('alert')).toHaveClass('MuiAlert-filledError');
	});
});
