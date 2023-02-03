import { isNil } from 'lodash';

import type { Condition, MonthOption, SplitMonthObject, View } from './types';

export const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const convertMonthToString = (number: number): string => number.toString().padStart(2, '0');

export const isBefore = (a: Date, b: Date): boolean => a.getTime() <= b.getTime();

export const getSplitDateObject = (date: Date): SplitMonthObject => {
  return {
    year: date.getFullYear().toString(),
    month: convertMonthToString(date.getMonth() + 1),
  };
};

const dateFormatOptions = {
  year: 'yyyy',
  month: 'MM',
};

const yearReg = new RegExp(dateFormatOptions.year, 'gi');
const monthReg = new RegExp(dateFormatOptions.month, 'gi');

export const getNextMonth = (date = new Date()) => {
  const next = new Date(date.getTime());
  next.setDate(date.getMonth() + 2);

  return next;
};

const getPreviousMonth = (date = new Date()) => {
  const next = new Date(date.getTime());
  next.setDate(date.getMonth() - 2);

  return next;
};

/**
 * 判斷日期是否大/小於maxDate.minDate
 * @param current
 * @param condition
 * @returns
 */
export const isMonthDisabled = (current: Date, condition: Condition): boolean => {
  if (condition.maxDate && condition.minDate) {
    const nextMonth = getNextMonth(condition.maxDate);
    const previousDate = getPreviousMonth(condition?.minDate);
    return isBefore(nextMonth, current) || isBefore(current, previousDate);
  }
  if (condition?.maxDate) {
    const nextDate = getNextMonth(condition.maxDate);
    return isBefore(nextDate, current);
  }
  if (condition?.minDate) {
    const previousDate = getPreviousMonth(condition?.minDate);
    return isBefore(current, previousDate);
  }

  return false;
};

export const convertToDateFormat = (format: string, splitDate: SplitMonthObject | Record<string, never>): string => {
  if (!splitDate || isNil(splitDate)) return '';

  const { year, month } = splitDate;
  const isFormatValid = format.includes('yyyy') && format.includes('MM') && format.includes('dd');
  if (!isFormatValid) return `${year}/${month}`;

  const convertedDate = format.replace(yearReg, splitDate.year).replace(monthReg, splitDate.month);

  return convertedDate;
};

export const getDefaultView = (date?: string | number | Date, condition?: Condition): View => {
  const defaultDate = date ? new Date(date) : new Date();

  const year = defaultDate.getFullYear().toString();
  const months = getDisplayMonthsInYear(year, condition);

  return { year, months };
};

export const getDisplayMonthsInYear = (year: string, condition: Condition = {}) => {
  const currentMonths = Array.from({ length: 12 }, (_, i) => {
    const month = convertMonthToString(i + 1);
    const current = new Date(Number(year), i + 1, 1);

    return {
      key: {
        year,
        month,
      },
      value: monthNames[i],
      isDisabled: isMonthDisabled(current, condition),
    };
  });

  return currentMonths;
};

/**
 * 判斷是否為合法之日期
 * @param format
 * @param input
 */
export const isValidDateFormat = (format = 'yyyy/MM', input: string) => {
  const convertedRule = format.replace(yearReg, `([0-9]{4})`).replace(monthReg, `(1[0-2]|0[1-9])`);

  const rule = new RegExp(convertedRule);

  return rule.test(input);
};

export const convertToSplitDate = (format: string, input: string): SplitMonthObject => {
  if (!input) return { year: '', month: '' };

  const isFormatValid = format.includes('yyyy') && format.includes('MM');
  if (!isFormatValid) return { year: '', month: '' };

  const yearIndex = format.search(yearReg);
  const monthIndex = format.search(monthReg);

  const date = new Date(
    `${input.substring(yearIndex, yearIndex + 4)}-${input.substring(monthIndex, monthIndex + 2)}-01`,
  );

  return getSplitDateObject(date);
};

export const isCurrentMonth = (date: MonthOption['key']): boolean => {
  const splitTodayObject = getSplitDateObject(new Date());

  return date.year === splitTodayObject.year && date.month === splitTodayObject.month;
};
