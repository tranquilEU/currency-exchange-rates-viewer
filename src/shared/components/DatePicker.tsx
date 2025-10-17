import { DatePicker } from '@mui/x-date-pickers';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { memo } from 'react';

import { DEFAULT_DATE_FORMAT } from '@/shared/constants';

type Props = {
	value?: Dayjs;
	minDate?: Dayjs;
	maxDate?: Dayjs;
	format?: string;
	onChange: (date: Dayjs | null) => void;
};

export const DatePickerComponent = memo(
	({
		value,
		minDate,
		maxDate = dayjs(),
		onChange,
		format = DEFAULT_DATE_FORMAT
	}: Props) => {
		return (
			<DatePicker
				value={value}
				minDate={minDate}
				maxDate={maxDate}
				onChange={onChange}
				format={format}
			/>
		);
	}
);
