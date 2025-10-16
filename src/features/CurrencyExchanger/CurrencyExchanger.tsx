import { DataTable } from "../../shared/components/DataTable";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import type { InputItem, OutputItem } from "../../shared/@types/types";
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
import type { GridColDef } from "@mui/x-data-grid";
import { formatCurrency } from "../../shared/utils/formatCurrency";

export const CurrencyExchanger = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(DEFAULT_DATE);
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    DEFAULT_BASE_CURRENCY
  );

  const { data: currencies } = useGetCurrencies();
  const { data: currencyRates } = useGetCurrencyRates({
    date: selectedDate?.format(DEFAULT_DATE_FORMAT) || DEFAULT_DATE_STRING,
    baseCurrency: selectedCurrency || DEFAULT_BASE_CURRENCY,
  });

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const mapDataToRows = (arr: InputItem[]): OutputItem[] => {
    const result: Record<string, OutputItem> = {};
    arr.forEach(({ date, data }) => {
      Object.entries(data[selectedCurrency]).forEach(([currency, value]) => {
        if (!result[currency]) {
          result[currency] = {
            id: currency,
            currency: formatCurrency(currency, currencies || {}),
          };
        }
        result[currency][date] = value;
      });
    });

    return Object.values(result);
  };

  const rows = mapDataToRows(currencyRates || []);

  const columns: GridColDef<OutputItem[]>[] = [
    { field: "currency", headerName: "Currency", width: 200 },
    ...(currencyRates ?? []).map((day) => ({
      field: day.date,
      headerName: day.date,
      width: 130,
    })),
  ];

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
      <DataTable rows={rows} columns={columns} />
    </>
  );
};
