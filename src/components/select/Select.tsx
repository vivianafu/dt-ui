import { Fragment } from 'react';

import { useFloating, autoUpdate, autoPlacement } from '@floating-ui/react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useMeasure } from 'react-use';

import Ellipsis from '../ellipsis/Ellipsis';

import type { Strategy, Placement } from '@floating-ui/react';

type Option = {
  key: string;
  value: string;
  disabled?: boolean;
};

type Props = {
  className?: string;
  containerClassName?: string;
  buttonClassName?: string;
  optionClassName?: string;
  label?: string;
  options?: Array<Option>;
  selected?: Option;
  placeholder?: string;
  splitter?: string;
  ariaLabel?: string;
  strategy?: Strategy;
  placement?: Placement;
  onChange?: any;
  disabled?: boolean;
};

export default function Select({
  className = '',
  containerClassName = '',
  buttonClassName = '',
  optionClassName = '',
  label,
  options = [],
  selected = options[0] || {},
  placeholder = 'Select',
  splitter = ':',
  ariaLabel = '',
  strategy: _strategy = 'absolute',
  placement: _placement = 'bottom',
  onChange = (): void => {},
  disabled = false,
}: Props) {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  const { x, y, reference, floating, strategy, placement } = useFloating({
    strategy: _strategy,
    ...{ placement: _placement },
    middleware: [...(_placement ? [] : [autoPlacement({ padding: 8, allowedPlacements: ['top', 'bottom'] })])],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Listbox
      value={selected}
      onChange={onChange}
      as="div"
      className={clsx('inline-flex', containerClassName)}
      disabled={disabled}
    >
      {({ open }) => (
        <>
          {label && (
            <>
              <Listbox.Label className="mr-1 inline-flex shrink-0 self-center truncate font-medium text-gray-50">
                {label}
              </Listbox.Label>
              {splitter && <span className="mr-1 self-center text-gray-50">{splitter}</span>}
            </>
          )}
          <div className={clsx('relative inline-flex', className)} ref={ref}>
            <Listbox.Button
              ref={reference}
              {...(ariaLabel && { 'aria-label': ariaLabel })}
              className={clsx(
                'relative min-h-9 w-full cursor-pointer rounded-md border border-gray-50/20 bg-primary-900 py-1 pl-3 pr-10 text-left text-gray-50 shadow-sm focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700 dark:bg-transparent dark:focus:border-transparent dark:focus:ring-cyan-500',
                disabled ? 'pointer-events-none cursor-default !bg-opacity-50 text-gray-600' : '',
                buttonClassName,
              )}
            >
              <span className={clsx('block truncate', options.length === 0 && 'opacity-50')}>
                {options.length === 0 ? placeholder : selected.value}
              </span>
              <span
                className={clsx(
                  'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2',
                  disabled ? 'opacity-40' : '',
                )}
              >
                <ChevronDownIcon className="h-4 w-4 fill-gray-100 dark:hidden dark:fill-gray-300" aria-hidden="true" />
                <ChevronDownIcon className="hidden h-5 w-5 text-gray-300 dark:block" aria-hidden="true" />
              </span>
            </Listbox.Button>
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
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={clsx(
                    'absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-50/20  bg-primary-900 py-1 text-sm shadow-lg focus:outline-none dark:bg-gray-900',
                    placement === 'top' && 'translate-y-[calc((100%_+_0.5rem)*-1)]',
                    optionClassName,
                  )}
                >
                  {options.map((option) => (
                    <Listbox.Option
                      aria-label={`option-${option.key}`}
                      disabled={option.disabled}
                      key={option.key}
                      className={({ active }) =>
                        clsx(
                          active ? 'bg-primary-700 text-green-50 dark:bg-cyan-500' : 'text-gray-50',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        )
                      }
                      value={option}
                    >
                      {({ selected, active, disabled }) => (
                        <>
                          <Ellipsis
                            label={option.value}
                            className={clsx(selected ? 'font-semibold' : 'font-normal', disabled && 'opacity-50')}
                          />
                          {selected ? (
                            <span
                              className={clsx(
                                active ? 'text-gray-50' : 'text-primary-400 dark:text-cyan-400',
                                'absolute inset-y-0 right-0 flex items-center pr-2',
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                  {options.length === 0 && (
                    <Listbox.Option
                      disabled
                      className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-50"
                      value=""
                    >
                      <Ellipsis label="No Options" className="opacity-50" />
                    </Listbox.Option>
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        </>
      )}
    </Listbox>
  );
}
