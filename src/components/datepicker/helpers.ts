const convertMonthToString = (number: number) => number.toString().padStart(2, '0');

export const getLastMonth = ({ year, month }: { year: string; month: string }) => {
  if (month === '01') return { year: (Number(year) - 1).toString(), month: '12' };
  return { year: year, month: convertMonthToString(Number(month) - 1) };
};

export const getNextMonth = ({ year, month }: { year: string; month: string }) => {
  if (month === '12') return { year: (Number(year) + 1).toString(), month: '01' };
  return { year: year, month: convertMonthToString(Number(month) + 1) };
};

export const getDisplayDatesInMonth = ({ year, month }: { year: string; month: string }) => {
  const firstDateInMonth = new Date(`${year}-${month}-01`);
  const startWeekday = firstDateInMonth.getDay();
  const totalDays = new Date(Number(year), Number(month), 0).getDate();

  const dates = Array.from({ length: totalDays }, (_, i) => ({
    key: {
      year,
      month,
      date: (i + 1).toString().padStart(2, '0'),
      day: new Date(`${year}-${month}-${(i + 1).toString().padStart(2, '0')}`).getDay().toString(),
    },
    value: (i + 1).toString(),
  }));

  const lastMonth = getLastMonth({ year, month });
  const lastDateOfLastMonth = new Date(Number(lastMonth.year), Number(lastMonth.month), 0).getDate();

  const fillLastMonth =
    startWeekday > 0
      ? Array.from({ length: startWeekday }, (_, i) => ({
          key: {
            year: lastMonth.year,
            month: lastMonth.month,
            date: (lastDateOfLastMonth - i).toString(),
            day: i.toString(),
          },
          value: '',
          disabled: true,
        })).reverse()
      : [];

  return [...fillLastMonth, ...dates];
};

export const getDefaultView = (date?: string | number | Date) => {
  const defaultDate = date ? new Date(date) : new Date();
  const year = defaultDate.getFullYear().toString();
  const month = convertMonthToString(defaultDate.getMonth() + 1);
  const dates = getDisplayDatesInMonth({ year, month });

  return { year, month, dates };
};

export const getSplitDateObject = (date: Date) => {
  return {
    year: date.getFullYear().toString(),
    month: convertMonthToString(date.getMonth() + 1),
    date: date.getDate().toString().padStart(2, '0'),
    day: date.getDay().toString(),
  };
};
