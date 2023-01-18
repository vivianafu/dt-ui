export type View = {
  year: string;
  month: string;
  dates: Array<DateOption>;
};

export type DateOption = {
  key: { year: string; month: string; date: string; day: string };
  value: string;
  disabled?: boolean;
};
