export type YearMonth = { year: string; month: string };
export type SplitDateObject = { year: string; month: string; date: string; day: string };

export type View = {
  year: string;
  month: string;
  dates: Array<DateOption>;
};

export type DateOption = {
  key: SplitDateObject;
  value: string;
  isDisabled?: boolean;
};

export type Condition = {
  maxDate?: Date | null | undefined;
  minDate?: Date | null | undefined;
};

export type DateFormatOption = ('yyyy' | 'mm' | 'dd') | 'w';
export type DateFormat = `${DateFormatOption}${string}` | `${string}${DateFormatOption}`;
//TODO type should be string and must includes 'yyyy','mm','dd'
