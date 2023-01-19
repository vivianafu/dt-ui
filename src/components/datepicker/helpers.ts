import type { DateOption, Condition, YearMonth, SplitDateObject, View } from './types';

const convertMonthToString = (number: number): string => number.toString().padStart(2, '0');

export const getLastMonth = ({ year, month }: { year: string; month: string }): YearMonth => {
  if (month === '01') return { year: (Number(year) - 1).toString(), month: '12' };
  return { year: year, month: convertMonthToString(Number(month) - 1) };
};

export const getNextMonth = ({ year, month }: { year: string; month: string }): YearMonth => {
  if (month === '12') return { year: (Number(year) + 1).toString(), month: '01' };
  return { year: year, month: convertMonthToString(Number(month) + 1) };
};

/**
 * 產生應補齊之上月天數
 * @param startWeekday
 * @param lastMonth
 * @param lastDateOfLastMonth
 * @returns
 */
const generateFillInLastMonthDates = (
  startWeekday: number,
  lastMonth: YearMonth,
  lastDateOfLastMonth: number,
): Array<DateOption> =>
  startWeekday > 0
    ? Array.from({ length: startWeekday }, (_, i) => ({
        key: {
          year: lastMonth.year,
          month: lastMonth.month,
          date: (lastDateOfLastMonth - i).toString(),
          day: i.toString(),
        },
        value: '',
        isDisabled: true,
      })).reverse()
    : [];

/**
 * 判斷日期是否大/小於maxDate.minDate
 * @param current
 * @param condition
 * @returns
 */
const isDateDisabled = (current: Date, condition: Condition): boolean => {
  if (condition.maxDate && condition.minDate)
    return isBefore(condition.maxDate, current) || isBefore(current, condition.minDate);
  if (condition?.maxDate) return isBefore(condition.maxDate, current);
  if (condition.minDate) return isBefore(current, condition.minDate);
  return false;
};

export const getDisplayDatesInMonth = ({ year, month }: YearMonth, condition: Condition = {}): Array<DateOption> => {
  const firstDateInMonth = new Date(`${year}-${month}-01`);
  const startWeekday = firstDateInMonth.getDay();
  const totalDays = new Date(Number(year), Number(month), 0).getDate();

  const currentMonthDates = Array.from({ length: totalDays }, (_, i) => {
    const date = (i + 1).toString().padStart(2, '0');
    const current = new Date(`${year}-${month}-${date}`);

    return {
      key: {
        year,
        month,
        date,
        day: new Date(`${year}-${month}-${(i + 1).toString().padStart(2, '0')}`).getDay().toString(),
      },
      value: (i + 1).toString(),
      isDisabled: isDateDisabled(current, condition),
    };
  });

  const lastMonth = getLastMonth({ year, month });
  const lastDateOfLastMonth = new Date(Number(lastMonth.year), Number(lastMonth.month), 0).getDate();
  const fillLastMonth = generateFillInLastMonthDates(startWeekday, lastMonth, lastDateOfLastMonth);

  return [...fillLastMonth, ...currentMonthDates];
};

export const getDefaultView = (date?: string | number | Date, condition?: Condition): View => {
  const defaultDate = date ? new Date(date) : new Date();
  const year = defaultDate.getFullYear().toString();
  const month = convertMonthToString(defaultDate.getMonth() + 1);
  const dates = getDisplayDatesInMonth({ year, month }, condition);

  return { year, month, dates };
};

export const getSplitDateObject = (date: Date): SplitDateObject => {
  return {
    year: date.getFullYear().toString(),
    month: convertMonthToString(date.getMonth() + 1),
    date: date.getDate().toString().padStart(2, '0'),
    day: date.getDay().toString(),
  };
};

export const isToday = (date: DateOption['key']): boolean => {
  const splitTodayObject = getSplitDateObject(new Date());

  return (
    date.year === splitTodayObject.year && date.month === splitTodayObject.month && date.date === splitTodayObject.date
  );
};

export const isBefore = (a: Date, b: Date): boolean => a.getTime() < b.getTime();
