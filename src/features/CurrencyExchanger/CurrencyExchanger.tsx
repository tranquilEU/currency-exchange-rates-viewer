import { DataTable } from "../../shared/components/DataTable";
import type { Dayjs } from "dayjs";
import type {
  CurrencyRateResponse,
  CurrencyRateRow,
} from "../../shared/@types/types";
import { useGetCurrencyRates } from "../../shared/hooks/useGetCurrencyRates";
import {
  DEFAULT_DATE,
  DEFAULT_CURRENCY,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_STRING,
  MIN_DAYS_FROM_START,
} from "../../shared/constants";
import { DatePickerComponent } from "../../shared/components/DatePicker";
import { SelectComponent } from "../../shared/components/Select";
import { useGetCurrencies } from "../../shared/hooks/useGetCurrencies";
import type { GridColDef } from "@mui/x-data-grid";
import { formatCurrency } from "../../shared/utils/formatCurrency";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../shared/store/store";
import { filterCurrencies } from "../../shared/utils/filterCurrencies";

export const CurrencyExchanger = () => {
  const selectedCurrency = useSelector(
    (state: RootState) => state.currency.selectedCurrency
  );
  const selectedDate = useSelector(
    (state: RootState) => state.currency.selectedDate
  );
  const dispatch = useDispatch<AppDispatch>();

  const { data: currencies } = useGetCurrencies();
  const { data: currencyRates } = useGetCurrencyRates({
    date: selectedDate?.format(DEFAULT_DATE_FORMAT) || DEFAULT_DATE_STRING,
    baseCurrency: selectedCurrency || DEFAULT_CURRENCY,
  });

  const filteredCurrencyRates = filterCurrencies(
    selectedCurrency,
    currencyRates
  );

  const handleCurrencyChange = (
    e:
      | React.ChangeEvent<
          Omit<HTMLInputElement, "value"> & {
            value: string;
          }
        >
      | (Event & {
          target: {
            value: string;
            name: string;
          };
        })
  ) => {
    let value: string | undefined;
    if (typeof e === "string") {
      value = e;
    } else if (e && "target" in e) {
      const target = (
        e as
          | React.ChangeEvent<HTMLSelectElement>
          | React.ChangeEvent<HTMLInputElement>
      ).target as HTMLInputElement | HTMLSelectElement;
      value = target?.value;
    }
    if (typeof value === "string") {
      dispatch({ type: "currency/setSelectedCurrency", payload: value });
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (date) {
      dispatch({
        type: "currency/setSelectedDate",
        payload: date,
      });
    }
  };

  const mapDataToRows = (arr: CurrencyRateResponse[]): CurrencyRateRow[] => {
    const result: Record<string, CurrencyRateRow> = {};
    arr.forEach(({ date, data }) => {
      Object.entries(data).forEach(([currency, value], index) => {
        if (!result[currency]) {
          result[currency] = {
            id: (index + 1).toString(),
            currency: formatCurrency(currency, currencies || {}),
          };
        }
        result[currency][date] = value;
      });
    });

    return Object.values(result);
  };

  const rows = mapDataToRows(filteredCurrencyRates || []);

  const columns: GridColDef<CurrencyRateRow[]>[] = [
    { field: "id", headerName: "ID", width: 40 },
    { field: "currency", headerName: "Currency", width: 200 },
    ...(filteredCurrencyRates ?? []).reverse().map((day) => ({
      field: day.date,
      headerName: day.date,
      width: 130,
    })),
  ];

  return (
    <>
      <SelectComponent
        value={selectedCurrency || DEFAULT_CURRENCY}
        options={currencies || {}}
        onChange={(e) => handleCurrencyChange(e)}
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
