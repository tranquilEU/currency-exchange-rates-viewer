export type GBPValues = {
  [currency: string]: number;
};

export type InputItem = {
  date: string;
  data: GBPValues;
};

export type OutputItem = {
  id: string;
  currency: string;
  [date: string]: string | number;
};
