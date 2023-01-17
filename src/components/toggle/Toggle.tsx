import { useState, useLayoutEffect, useId } from 'react';

import { Switch } from '@headlessui/react';
import clsx from 'clsx';

import type { Sizes } from './types';

type Props = {
  defaultEnabled?: boolean;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  size?: Sizes;
  onChange?(checked: boolean): void;
};

const sizeStyles: { [K in Sizes]: { circle: string; background: string } } = {
  small: {
    circle: 'h-4 w-4',
    background: 'h-5 w-9',
  },
  medium: {
    circle: 'h-5 w-5',
    background: 'h-6 w-11',
  },
  large: {
    circle: 'h-6 w-6',
    background: 'h-7 w-[3.25rem]',
  },
};

const translateXConfig: { [K in Sizes]: string } = {
  small: 'translate-x-4',
  medium: 'translate-x-5',
  large: 'translate-x-6',
};

const labelFontConfig: { [K in Sizes]: string } = {
  small: 'text-sm',
  medium: '',
  large: 'text-xl',
};

const Toggle = ({
  checked,
  defaultEnabled = false,
  label = '',
  className = '',
  containerClassName = '',
  labelClassName = '',
  onChange,
  disabled = false,
  size = 'medium',
}: Props) => {
  const [enabled, setEnabled] = useState(defaultEnabled);

  const id = useId();

  const handleOnchange = (isChecked: boolean) => {
    setEnabled(isChecked);
    if (onChange) onChange(isChecked);
  };

  useLayoutEffect(() => {
    if (typeof checked === 'boolean') setEnabled(checked);
  }, [checked]);

  return (
    <div className={clsx('inline-flex items-center', containerClassName)}>
      <Switch
        checked={enabled}
        onChange={handleOnchange}
        className={clsx(
          'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-primary-900',
          sizeStyles[size].background,
          disabled ? 'pointer-events-none !bg-opacity-40' : '',
          className,
          enabled ? 'bg-primary-600 dark:bg-cyan-500' : '!bg-gray-200',
        )}
        disabled={disabled}
        id={id}
      >
        <span
          className={clsx(
            'pointer-events-none inline-block rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            sizeStyles[size].circle,
            enabled ? translateXConfig[size] : 'translate-x-0',
            disabled ? 'bg-opacity-50' : '',
          )}
        />
      </Switch>
      {label && (
        <label
          htmlFor={id}
          className={clsx('ml-1.5 inline-flex whitespace-nowrap text-gray-50', labelFontConfig[size], labelClassName)}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Toggle;
