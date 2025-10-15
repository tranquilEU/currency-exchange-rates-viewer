import type { GridColDef } from "@mui/x-data-grid";
import { DataTable } from "../../shared/components/DataTable";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import type { TCurrency } from "../../shared/@types/types";
import { useGetCurrencyRates } from "../../shared/hooks/useGetCurrencyRates";
import {
  DEFAULT_DATE,
  DEFAULT_BASE_CURRENCY,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_STRING,
  MIN_DAYS_FROM_START,
} from "../../shared/constants";
import { DatePickerComponent } from "../../shared/components/DatePicker";
import { SelectComponent } from "../../shared/components/Select";
import { useGetCurrencies } from "../../shared/hooks/useGetCurrencies";

const columns: GridColDef<TCurrency[]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "code",
    headerName: "Currency Code",
    width: 150,
  },
  {
    field: "name",
    headerName: "Currency Name",
    width: 150,
  },
  {
    field: "rate",
    headerName: "Rate",
    width: 150,
  },
];

export const CurrencyExchanger = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(DEFAULT_DATE);
  const [selectedCurrency, setSelectedCurrency] = useState<string>();

  const { data: currencies } = useGetCurrencies();

  const { data: rows } = useGetCurrencyRates({
    date: selectedDate?.format(DEFAULT_DATE_FORMAT) || DEFAULT_DATE_STRING,
    baseCurrency: selectedCurrency || DEFAULT_BASE_CURRENCY,
  });

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const mapDataToRows = (data: typeof rows) => {
    if (!data || data.length === 0) return [];

    return data.map(({ date, data }) => ({
      id: date,
      code: data.code,
      name: data.name,
    }));
  };

  return (
    <>
      <SelectComponent
        value={selectedCurrency || DEFAULT_BASE_CURRENCY}
        options={currencies || {}}
        onChange={(e) => setSelectedCurrency(e.target.value)}
      />
      <DatePickerComponent
        value={selectedDate ?? undefined}
        minDate={DEFAULT_DATE.subtract(MIN_DAYS_FROM_START, "day")}
        onChange={handleDateChange}
      />
      <DataTable rows={mapDataToRows(rows) ?? []} columns={columns} />
    </>
  );
};
