import React, { useId, forwardRef, useState } from 'react';

import clsx from 'clsx';
import { isNil } from 'lodash';

import type { Variants, Sizes } from './types';
import type {
  ChangeEventHandler,
  DetailedHTMLProps,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  CompositionEventHandler,
  ChangeEvent,
} from 'react';

const variantStyles: { [K in Variants]: string } = {
  default:
    'rounded border border-gray-500/50 bg-transparent py-1 px-2 text-left text-gray-50 shadow-sm outline-none hover:border-primary-500 focus:border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500 dark:hover:border-cyan-600 dark:hover:ring-cyan-600 dark:focus:border-cyan-600',
  unstyled: '',
};

const sizeStyles: { [K in Sizes]: string } = {
  small: 'px-1 py-0.5 text-sm',
  medium: 'px-2 py-1 text-base',
  large: 'px-4 py-2 text-xl',
};

type Props = {
  variant?: Variants;
  inputSize?: Sizes;
  type?: HTMLInputTypeAttribute;
  name?: string;
  label?: string;
  splitter?: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onComposition?: CompositionEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef(
  (
    {
      name,
      type = 'text',
      label = '',
      splitter = ':',
      onChange,
      onBlur,
      onComposition,
      placeholder = '',
      defaultValue = '',
      className = '',
      disabled = false,
      required = false,
      variant = 'default',
      inputSize = 'medium',
      autoComplete = 'off',
      readOnly = false,
      ...props
    }: Props,
    ref
  ) => {
    const [isOnComposition, setIsOnComposition] = useState<boolean>(false);
    const id = useId();

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target instanceof HTMLInputElement && !isOnComposition) {
        if (onChange) onChange(event);
      }
    };

    const handleComposition = (event: React.CompositionEvent<HTMLInputElement>) => {
      if (event.type === 'compositionend') {
        if (onComposition && event.data) onComposition(event);
        setIsOnComposition(false);
      } else setIsOnComposition(true);
    };

    return (
      <>
        {label && (
          <label
            htmlFor={id}
            className={clsx(
              'mr-1 inline-flex whitespace-nowrap text-gray-50',
              inputSize === 'large' ? 'text-xl' : '',
              inputSize === 'small' ? 'text-sm' : '',
              disabled ? 'pointer-events-none' : ''
            )}
          >
            {label} {splitter}
          </label>
        )}
        <input
          ref={() => ref && (ref as React.MutableRefObject<unknown>).current}
          id={id}
          name={name || id}
          onChange={handleOnChange}
          onCompositionStart={handleComposition}
          onCompositionUpdate={handleComposition}
          onCompositionEnd={handleComposition}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            variant ? variantStyles?.[variant] : '',
            inputSize ? sizeStyles?.[inputSize] : '',
            disabled ? 'pointer-events-none !bg-opacity-50 text-gray-600' : '',
            className
          )}
          required={required}
          autoComplete={autoComplete}
          tabIndex={readOnly ? -1 : undefined}
          {...(isNil(props.value) && { defaultValue: isNil(defaultValue) ? '' : defaultValue })}
          {...props}
        />
      </>
    );
  }
);

export default Input;
