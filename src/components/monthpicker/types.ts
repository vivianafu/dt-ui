export type SplitMonthObject = { year: string; month: string };

export type View = {
  year: string;
  months: Array<MonthOption>;
};

export type Condition = {
  maxDate?: Date | null | undefined;
  minDate?: Date | null | undefined;
};

export type MonthOption = {
  key: SplitMonthObject;
  value: string;
  isDisabled?: boolean;
};
