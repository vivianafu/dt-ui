import { isNil } from 'lodash';

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

const getPreviousDay = (date = new Date()) => {
  const previous = new Date(date.getTime());
  previous.setDate(date.getDate() - 1);

  return previous;
};

const getNextDay = (date = new Date()) => {
  const next = new Date(date.getTime());
  next.setDate(date.getDate() + 1);

  return next;
};

/**
 * 判斷日期是否大/小於maxDate.minDate
 * @param current
 * @param condition
 * @returns
 */
export const isDateDisabled = (current: Date, condition: Condition): boolean => {
  if (condition.maxDate && condition.minDate) {
    const nextDate = getNextDay(condition.maxDate);
    const previousDate = getPreviousDay(condition?.minDate);
    return isBefore(nextDate, current) || isBefore(current, previousDate);
  }
  if (condition?.maxDate) {
    const nextDate = getNextDay(condition.maxDate);
    return isBefore(nextDate, current);
  }
  if (condition?.minDate) {
    const previousDate = getPreviousDay(condition?.minDate);
    return isBefore(current, previousDate);
  }

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

export const isBefore = (a: Date, b: Date): boolean => a.getTime() <= b.getTime();

const weekDayConfig = {
  '0': 'Sun',
  '1': 'Mon',
  '2': 'Tue',
  '3': 'Wed',
  '4': 'Thu',
  '5': 'Fri',
  '6': 'Sat',
};

const dateFormatOptions = {
  year: 'yyyy',
  month: 'MM',
  date: 'dd',
  day: 'w',
};

const yearReg = new RegExp(dateFormatOptions.year, 'gi');
const monthReg = new RegExp(dateFormatOptions.month, 'gi');
const dateReg = new RegExp(dateFormatOptions.date, 'gi');
const dayReg = new RegExp(dateFormatOptions.day, 'gi');

export const convertToDateFormat = (format: string, splitDate: SplitDateObject | Record<string, never>): string => {
  if (!splitDate || isNil(splitDate)) return '';

  const { year, month, date } = splitDate;
  const isFormatValid = format.includes('yyyy') && format.includes('MM') && format.includes('dd');
  if (!isFormatValid) return `${year}/${month}/${date}`;

  const convertedDate = format
    .replace(yearReg, splitDate.year)
    .replace(monthReg, splitDate.month)
    .replace(dateReg, splitDate.date);

  if (splitDate.day) return convertedDate.replace(dayReg, (weekDayConfig as any)?.[splitDate?.day]);

  return convertedDate;
};

export const convertToSplitDate = (format: string, input: string): SplitDateObject => {
  if (!input) return { year: '', month: '', date: '', day: '' };

  const isFormatValid = format.includes('yyyy') && format.includes('MM') && format.includes('dd');
  if (!isFormatValid) return { year: '', month: '', date: '', day: '' };

  const yearIndex = format.search(yearReg);
  const monthIndex = format.search(monthReg);
  const dateIndex = format.search(dateReg);

  const date = new Date(
    `${input.substring(yearIndex, yearIndex + 4)}-${input.substring(monthIndex, monthIndex + 2)}-${input.substring(
      dateIndex,
      dateIndex + 2,
    )}`,
  );

  return getSplitDateObject(date);
};

/**
 * 判斷是否為合法之日期
 * @param format
 * @param input
 */
export const isValidDateFormat = (format = 'yyyy/MM/dd', input: string) => {
  const convertedRule = format
    .replace(yearReg, `([0-9]{4})`)
    .replace(monthReg, `(1[0-2]|0[1-9])`)
    .replace(dateReg, `(3[01]|[12][0-9]|0[1-9])`)
    .replace(dayReg, `([0-6]{1})`);

  const rule = new RegExp(convertedRule);

  const yearIndex = format.search(yearReg);
  const monthIndex = format.search(monthReg);
  const dateIndex = format.search(dateReg);

  const year = input.substring(yearIndex, yearIndex + 4);
  const month = input.substring(monthIndex, monthIndex + 2);
  const date = input.substring(dateIndex, dateIndex + 2);

  const lastDateInMonth = new Date(Number(year), Number(month), 0).getDate();

  return rule.test(input) && Number(date) <= lastDateInMonth;
};
