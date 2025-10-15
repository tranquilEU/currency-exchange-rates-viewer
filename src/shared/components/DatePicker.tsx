import { DatePicker } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";

type Props = {
  value?: Dayjs;
  minDate?: Dayjs;
  onChange: (date: Dayjs | null) => void;
};

export const DatePickerComponent = ({ value, minDate, onChange }: Props) => {
  return <DatePicker value={value} minDate={minDate} onChange={onChange} />;
};
