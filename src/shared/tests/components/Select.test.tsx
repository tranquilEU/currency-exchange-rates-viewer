import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { SelectComponent } from '@/shared/components/Select';

const labelId = 'currency-select';
const label = 'Currency';
const placeholder = 'Select a Currency';

describe('SelectComponent', () => {
	const options = {
		gbp: 'Great British Pound',
		usd: 'US Dollar',
		aud: 'Australian Dollar'
	};

	it('renders options when opened', () => {
		render(
			<SelectComponent
				value=""
				options={options}
				labelId={labelId}
				label={label}
				placeholder={placeholder}
				onChange={jest.fn()}
			/>
		);

		fireEvent.mouseDown(screen.getByLabelText(/currency/i));

		expect(screen.getByText('GBP - Great British Pound')).toBeInTheDocument();
		expect(screen.getByText('USD - US Dollar')).toBeInTheDocument();
		expect(screen.getByText('AUD - Australian Dollar')).toBeInTheDocument();
	});

	it('shows the selected value when provided', () => {
		render(
			<SelectComponent
				value="aud"
				options={options}
				labelId={labelId}
				label={label}
				placeholder={placeholder}
				onChange={jest.fn()}
			/>
		);

		expect(screen.getByText('AUD - Australian Dollar')).toBeInTheDocument();
	});
});
