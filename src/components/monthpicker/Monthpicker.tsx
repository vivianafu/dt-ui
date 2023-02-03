import { useCallback, useId, useState, useEffect, useRef } from 'react';

import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import Popover from '../popover/Popover';

import {
  convertToDateFormat,
  getSplitDateObject,
  convertToSplitDate,
  getDefaultView,
  isMonthDisabled,
  isValidDateFormat,
  isCurrentMonth,
  getDisplayMonthsInYear,
} from './helpers';

import type { Condition, MonthOption, View } from './types';
import type { ChangeEvent, KeyboardEvent } from 'react';

type Props = {
  label?: string;
  splitter?: string;
  autoComplete?: 'on' | 'off' | undefined;
  selected?: Date | null | undefined;
  dateFormat?: string;
  placeholder?: string;
  maxDate?: Date | null;
  minDate?: Date | null;
  onChange?: (value?: Date | undefined | null) => void;
  disabled?: boolean;
};

type MonthModalProps = {
  setView: React.Dispatch<React.SetStateAction<View>>;
  view: View;
  selectedMonth: MonthOption['key'] | Record<string, never>;
  handleSelectDate: (month: MonthOption) => void;
  condition: Condition;
};

const MonthModal = ({ handleSelectDate, selectedMonth, view, setView, condition }: MonthModalProps) => {
  const isSelected = (date: MonthOption['key']) =>
    date.year === selectedMonth.year && date.month === selectedMonth.month;

  const handleDecreaseYear = () => {
    const lastYear = (Number(view.year) - 1).toString();
    const months = getDisplayMonthsInYear(lastYear, condition);
    setView({ year: lastYear, months: months });
  };

  const handleIncreaseYear = () => {
    const nextYear = (Number(view.year) + 1).toString();
    const months = getDisplayMonthsInYear(nextYear, condition);
    setView({ year: nextYear, months: months });
  };

  return (
    <>
      <div className="my-2 flex w-full items-center justify-between px-1">
        <ChevronLeftIcon
          className="h-4 w-4 cursor-pointer text-gray-300 hover:text-gray-50"
          onClick={handleDecreaseYear}
        />
        <div className="flex h-full items-center text-gray-50 ">{view.year}</div>
        <ChevronRightIcon
          className="h-4 w-4 cursor-pointer text-gray-300 hover:text-gray-50"
          onClick={handleIncreaseYear}
        />
      </div>
      <div className="mb-2 grid grid-cols-4 gap-1">
        {view.months.map((option) => (
          <button
            onClick={() => handleSelectDate(option)}
            key={option.key.year + option.key.month}
            className={clsx(
              'relative min-w-12 cursor-pointer select-none rounded px-2 py-1 text-center hover:bg-primary-700 dark:hover:bg-cyan-700',
              isSelected(option.key)
                ? 'bg-primary-500 font-semibold text-gray-100 hover:bg-primary-500 dark:bg-cyan-500 hover:dark:bg-cyan-500'
                : '',
              isCurrentMonth(option.key) ? '!font-semibold text-primary-400 dark:text-cyan-500' : '',
              isCurrentMonth(option.key) && option.isDisabled ? 'text-primary-400/50 dark:text-cyan-500/50' : '',
              isCurrentMonth(option.key) && isSelected(option.key)
                ? '!bg-primary-500 font-semibold !text-gray-100 hover:bg-primary-500 dark:!bg-cyan-500 hover:dark:bg-cyan-500'
                : '',
              !isCurrentMonth(option.key) && option.isDisabled ? 'text-gray-700' : '',
              option.value === '' ? 'hidden bg-transparent' : '',
            )}
          >
            {option.value}
          </button>
        ))}
      </div>
    </>
  );
};

export default function Monthpicker({
  label = '',
  splitter = ':',
  autoComplete = 'off',
  selected = new Date(),
  dateFormat = 'yyyy/MM',
  placeholder = '',
  maxDate = null,
  minDate = null,
  onChange = () => {},
  disabled = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const emptyDate = { year: '', month: '' };
  const [selectedMonth, setSelectedMonth] = useState<MonthOption['key'] | Record<string, never>>(
    selected ? getSplitDateObject(selected) : emptyDate,
  );
  const isEmptySelected = !selected && Object.values(selectedMonth).every((item) => item === '');

  const getDisplayText = useCallback(
    (selectedMonth: MonthOption['key'] | Record<string, never>, placeholder: string) => {
      if (isEmptySelected) return placeholder;
      return convertToDateFormat(dateFormat, selectedMonth);
    },
    [dateFormat, isEmptySelected],
  );

  const [displayText, setDisplayText] = useState(getDisplayText(selectedMonth, placeholder));
  const [isOpen, setIsOpen] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [view, setView] = useState<View>(() => getDefaultView(selected ? selected : '', { minDate, maxDate }));

  const handleSelectDate = (option: MonthOption) => {
    const { year, month } = option.key;
    const result = new Date(`${year}-${month}-01`);
    setSelectedMonth(option.key);
    return onChange(result);
  };

  const handleResetSelected = () => {
    setSelectedMonth(selectedMonth);
    setDisplayText(getDisplayText(selectedMonth, placeholder));
  };

  const handleRenewSelected = (inputValue: string) => {
    const keyInSplitDate = convertToSplitDate(dateFormat, inputValue);
    const { year, month } = keyInSplitDate;
    const keyInDate = new Date(`${year}-${month}-01`);

    const isSelectable = !isMonthDisabled(keyInDate, { minDate, maxDate });

    if (isSelectable) {
      setSelectedMonth(keyInSplitDate);

      setView(getDefaultView(`${keyInSplitDate.year}-${keyInSplitDate.month}-01`, { minDate, maxDate }));
      return onChange(keyInDate);
    }
  };

  /**
   * 判斷當前input之文字是否符合日期格式
   * 若符合則更新，反之返回前一次選擇之日期
   * @param inputValue
   */
  const handleUpdateSelected = (inputValue: string) => {
    const isValidFormat = isValidDateFormat(dateFormat, inputValue);

    if (isValidFormat) return handleRenewSelected(inputValue);
    return handleResetSelected();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDisplayText(event.target.value);
    setIsEntering(true);
    const isValidFormat = isValidDateFormat(dateFormat, event.target.value);

    if (isValidFormat) handleRenewSelected(event.target.value);
  };

  const handleInputOnBlur = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEntering(false);

    return handleUpdateSelected(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleUpdateSelected(displayText);
      inputRef.current !== null && inputRef.current.blur();
      setIsOpen(false);
      setIsEntering(false);
    }
  };

  useEffect(() => {
    setDisplayText(getDisplayText(selectedMonth, placeholder));
  }, [selectedMonth, getDisplayText, placeholder]);

  return (
    <>
      {label && (
        <>
          <label htmlFor={id} className="mr-1 inline-flex shrink-0 self-center truncate font-medium text-gray-50">
            {label}
          </label>
          {splitter && <span className="mr-1 self-center text-gray-50">{splitter}</span>}
        </>
      )}
      <Popover
        placement="bottom-start"
        triggerClassName="relative"
        contentClassName="rounded-md"
        open={isOpen || isEntering}
        onOpenChange={setIsOpen}
        render={
          <MonthModal
            condition={{ maxDate, minDate }}
            setView={setView}
            view={view}
            selectedMonth={selectedMonth}
            handleSelectDate={handleSelectDate}
          />
        }
      >
        <input
          id={id}
          ref={inputRef}
          className={clsx(
            'relative min-h-9 w-full cursor-pointer rounded-md border border-gray-50/20 bg-primary-900 pl-3 pr-10 text-left text-gray-50 shadow-sm focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700 dark:bg-transparent dark:focus:border-transparent dark:focus:ring-cyan-500',
            disabled ? 'pointer-events-none cursor-default !bg-opacity-50 text-gray-600' : '',
            isOpen
              ? 'border-primary-700 outline-none ring-2 ring-primary-700 dark:border-transparent dark:ring-cyan-500'
              : '',
          )}
          value={displayText}
          onFocus={(e) => {
            console.log('onFocus'); // trigger component and input focus conflicts?
            setIsOpen(true);
          }}
          onChange={handleInputChange}
          onBlur={handleInputOnBlur}
          onKeyDown={handleKeyDown}
          autoComplete={autoComplete}
        />
        <span
          className={clsx(
            'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-100',
            disabled ? 'opacity-40' : '',
          )}
        >
          <CalendarIcon className="h-4 w-4" aria-hidden="true" />
        </span>
      </Popover>
    </>
  );
}
