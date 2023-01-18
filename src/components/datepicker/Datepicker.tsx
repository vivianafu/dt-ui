import { Fragment, useId, useState, useEffect } from 'react';

import { useFloating, autoUpdate, autoPlacement } from '@floating-ui/react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { isEmpty } from 'lodash';
import { useMeasure } from 'react-use';

import Ellipsis from '../ellipsis/Ellipsis';

import { getLastMonth, getNextMonth, getDisplayDatesInMonth, getDefaultDate } from './helpers';

import type { Strategy, Placement } from '@floating-ui/react';

type View = {
  year: string;
  month: string;
  dates: Array<DateOption>;
};

type DateOption = {
  key: { year: string; month: string; date: string; day: string };
  value: string;
  disabled?: boolean;
};

type Props = {
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  optionClassName?: string;
  label?: string;
  selected?: DateOption['key'] | Record<string, never>;
  placeholder?: string;
  splitter?: string;
  ariaLabel?: string;
  strategy?: Strategy;
  placement?: Placement;
  onChange?: (value: DateOption['key']) => void;
  maxDate?: Date | null;
  disabled?: boolean;
};

export default function Datepicker({
  className = '',
  containerClassName = '',
  buttonClassName = '',
  optionClassName = '',
  label,
  selected = {},
  placeholder = 'Select',
  splitter = ':',
  ariaLabel = '',
  strategy: _strategy = 'absolute',
  placement: _placement = 'bottom',
  onChange = (value: DateOption['key']): void => {},
  maxDate = null,
  disabled = false,
}: Props) {
  const id = useId();
  const [ref, { width }] = useMeasure<HTMLDivElement>();
  const [view, setView] = useState<View>(() =>
    getDefaultDate(isEmpty(selected) ? '' : `${selected.year}-${selected.month}-${selected.date}`),
  );
  const [selectedDate, setSelectedDate] = useState<DateOption['key'] | Record<string, never>>(selected);

  const { x, y, reference, floating, strategy, placement } = useFloating({
    strategy: _strategy,
    ...{ placement: _placement },
    middleware: [...(_placement ? [] : [autoPlacement({ padding: 8, allowedPlacements: ['top', 'bottom'] })])],
    whileElementsMounted: autoUpdate,
  });

  const isSelected = (date: DateOption['key']) =>
    date.year === selectedDate.year && date.month === selectedDate.month && date.date === selectedDate.date;

  const handleDecreaseMonth = ({ year, month }: { year: string; month: string }) => {
    const result = getLastMonth({ year, month });
    const dates = getDisplayDatesInMonth({ ...result });
    setView({ ...result, dates: dates });
  };

  const handleIncreaseMonth = ({ year, month }: { year: string; month: string }) => {
    const result = getNextMonth({ year, month });
    const dates = getDisplayDatesInMonth({ ...result });
    setView({ ...result, dates: dates });
  };

  const handleSelectDate = (option: DateOption) => {
    setSelectedDate(option.key);
    onChange(option.key);
  };

  const getDisplayText = (selectedDate: DateOption['key'] | Record<string, never>, placeholder: string) => {
    if (isEmpty(selectedDate)) return placeholder;
    return selectedDate.year + '/' + selectedDate.month + '/' + selectedDate.date;
  };

  return (
    <Popover className={clsx('inline-flex max-h-9', containerClassName)}>
      {({ open, close }) => (
        <>
          {label && (
            <>
              <label htmlFor={id} className="mr-1 inline-flex shrink-0 self-center truncate font-medium text-gray-50">
                {label}
              </label>
              {splitter && <span className="mr-1 self-center text-gray-50">{splitter}</span>}
            </>
          )}
          <div className={clsx('relative inline-flex min-w-40', className)} ref={ref}>
            <Popover.Button
              id={id}
              ref={reference}
              {...(ariaLabel && { 'aria-label': ariaLabel })}
              className={clsx(
                'relative min-h-9 w-full cursor-pointer rounded-md border border-gray-50/20 bg-primary-900 py-1 pl-3 pr-10 text-left text-gray-50 shadow-sm focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700 dark:bg-transparent dark:focus:border-transparent dark:focus:ring-cyan-500',
                disabled ? 'pointer-events-none cursor-default !bg-opacity-50 text-gray-600' : '',
                buttonClassName,
              )}
            >
              <span className={clsx('block truncate', isEmpty(selectedDate) ? 'text-gray-700' : '')}>
                {getDisplayText(selectedDate, placeholder)}
              </span>
              <span
                className={clsx(
                  'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2',
                  disabled ? 'opacity-40' : '',
                )}
              >
                <CalendarIcon className="h-4 w-4" aria-hidden="true" />
              </span>
            </Popover.Button>
            <div
              className="z-20"
              ref={floating}
              style={{
                width: width,
                position: strategy,
                top: y ?? '',
                left: x ?? '',
              }}
            >
              <Transition
                show={open}
                afterLeave={() => setView(getDefaultDate(`${selectedDate.year}-${selectedDate.month}`))}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Panel
                  className={clsx(
                    'absolute z-20 mt-1 w-full min-w-[20rem] overflow-auto rounded-md border border-gray-50/20 bg-primary-900 p-2 text-sm shadow-lg focus:outline-none dark:bg-gray-900',
                    placement === 'top' && 'translate-y-[calc((100%_+_0.5rem)*-1)]',
                  )}
                  static
                >
                  <div className="my-2 flex w-full items-center justify-between px-1">
                    <ChevronLeftIcon
                      className="h-4 w-4 cursor-pointer text-gray-300 hover:text-gray-50"
                      onClick={() => handleDecreaseMonth(view)}
                    />
                    <div className="flex h-full items-center text-gray-50 ">
                      {view.year} / {view.month}
                    </div>
                    <ChevronRightIcon
                      className="h-4 w-4 cursor-pointer text-gray-300 hover:text-gray-50"
                      onClick={() => handleIncreaseMonth(view)}
                    />
                  </div>
                  <ul className="my-2 mt-3 grid grid-cols-7 gap-1 text-center font-semibold text-gray-100">
                    <li>日</li>
                    <li>一</li>
                    <li>二</li>
                    <li>三</li>
                    <li>四</li>
                    <li>五</li>
                    <li>六</li>
                  </ul>
                  <div className={clsx('grid grid-cols-7 gap-1', optionClassName)}>
                    {view.dates.map((option: DateOption) => (
                      <div
                        aria-label={`option-${option}`}
                        key={view.month + option.key.year + option.key.month + option.key.date}
                        className={clsx(
                          'relative cursor-default select-none rounded-md text-center hover:bg-primary-700 dark:hover:bg-cyan-700',
                          option.disabled ? 'pointer-events-none' : '',
                        )}
                      >
                        <>
                          <Ellipsis
                            label={option.value}
                            className={clsx(
                              'relative z-10 cursor-pointer rounded-md p-1 text-gray-300',
                              option.value && isSelected(option.key)
                                ? 'bg-primary-500 font-semibold text-gray-100 dark:bg-cyan-500'
                                : 'font-normal',
                              option.value && option.disabled ? 'bg-primary-500/30 text-gray-700' : '',
                            )}
                            onClick={() => {
                              close();
                              handleSelectDate(option);
                            }}
                          ></Ellipsis>
                        </>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Popover>
  );
}