import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type SelectProps = {
  value: string;
  options: Record<string, string>;
  onChange: (event: SelectChangeEvent) => void;
};

export const SelectComponent = ({ value, options, onChange }: SelectProps) => {
  return (
    <FormControl variant="outlined">
      <InputLabel id="currency-label">{value}</InputLabel>
      <Select
        labelId="currency-label"
        label={value}
        value={value}
        onChange={onChange}
      >
        {Object.entries(options)
          .filter(([, label]) => label && label.trim() !== "")
          .map(([key, label]) => (
            <MenuItem key={key} value={key}>
              {`${key.toUpperCase()} - ${label}`}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};
