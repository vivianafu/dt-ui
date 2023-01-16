import { useId, forwardRef } from 'react'

import clsx from 'clsx'

import type { Variants } from './types'
import type { ChangeEventHandler } from 'react'

type Props = {
  label?: string
  splitter?: string
  disabled?: boolean
  defaultChecked?: boolean
  className?: string
  inputClassName?: string
  labelClassName?: string
  variant?: Variants
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const variantStyles: { [K in Variants]: string } = {
  default:
    'rounded border-gray-50 bg-transparent text-primary-500 focus:ring-primary-600 focus:ring-offset-primary-900 dark:text-cyan-500 dark:focus:ring-cyan-600 dark:focus:ring-offset-cyan-900',
  unstyled: '',
}

const Checkbox = forwardRef(
  (
    {
      disabled = false,
      onChange,
      defaultChecked,
      label = '',
      variant = 'default',
      className = '',
      inputClassName = '',
      labelClassName = '',
    }: Props,
    ref,
  ) => {
    const id = useId()

    return (
      <div className={clsx(label ? 'inline-flex items-center' : '', className)}>
        <input
          ref={() => ref && (ref as React.MutableRefObject<unknown>).current}
          type="checkbox"
          id={id}
          className={clsx(
            variant ? variantStyles[variant] : '',
            disabled ? 'pointer-events-none !border-opacity-50 text-gray-600' : '',
            inputClassName,
          )}
          disabled={disabled}
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        {label && (
          <label htmlFor={id} className={clsx('ml-1.5 inline-flex whitespace-nowrap text-gray-50', labelClassName)}>
            {label}
          </label>
        )}
      </div>
    )
  },
)

export default Checkbox
