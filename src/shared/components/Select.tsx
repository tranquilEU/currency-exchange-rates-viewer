import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

type SelectProps = {
	value: string;
	options: Record<string, string>;
	labelId?: string;
	label?: string;
	placeholder?: string;
	onChange: (event: SelectChangeEvent) => void;
};

export const SelectComponent = ({
	value,
	options,
	labelId,
	label = '',
	placeholder = '',
	onChange
}: SelectProps) => {
	return (
		<FormControl variant="outlined">
			<InputLabel id={labelId}>{label}</InputLabel>
			<Select
				labelId={labelId}
				label={label}
				value={options[value] ? value : ''}
				onChange={onChange}
				displayEmpty
			>
				<MenuItem value="" disabled>
					<em>{placeholder}</em>
				</MenuItem>

				{Object.entries(options)
					.filter(([, optionLabel]) => optionLabel && optionLabel.trim() !== '')
					.map(([key, optionLabel]) => (
						<MenuItem key={key} value={key}>
							{`${key.toUpperCase()} - ${optionLabel}`}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
};
