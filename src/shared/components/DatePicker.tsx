import { DatePicker } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs";
import { DEFAULT_DATE_FORMAT } from "../constants";

type Props = {
  value?: Dayjs;
  minDate?: Dayjs;
  format?: string;
  onChange: (date: Dayjs | null) => void;
};

export const DatePickerComponent = ({
  value,
  minDate,
  onChange,
  format = DEFAULT_DATE_FORMAT,
}: Props) => {
  return (
    <DatePicker
      value={value}
      minDate={minDate}
      onChange={onChange}
      format={format}
    />
  );
};
