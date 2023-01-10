import clsx from 'clsx';

import type { Variants, Sizes, BorderRadius } from './types';

const defaultStyle =
  'inline-flex items-center border shadow-sm text-gray-300 font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none';

const variantStyles: { [K in Variants]: string } = {
  default:
    'border-gray-300 bg-transparent hover:border-gray-100 hover:text-gray-100 focus:ring-offset-gray-800 focus:ring-gray-300',
  primary:
    'border-transparent !text-gray-50 bg-primary-500 hover:bg-primary-600 focus:ring-offset-primary-700 focus:ring-primary-500',
  secondary:
    'border-transparent !text-gray-50 bg-_sky-400 hover:bg-_sky-500 focus:ring-offset-sky-700 focus:ring-sky-500',
  orange:
    'border-transparent !text-gray-50 bg-_orange-400 hover:bg-_orange-500 focus:ring-offset-orange-800 focus:ring-_orange-450',
  green:
    'border-transparent !text-gray-50 bg-_lime-400 hover:bg-_lime-500 focus:ring-offset-lime-700 focus:ring-_lime-450',
  cancel:
    'border-transparent bg-gray-700 !text-gray-50 hover:bg-gray-750 focus:ring-offset-gray-800 focus:ring-gray-750',
  danger:
    'border-transparent !text-gray-50 bg-_red-500 hover:bg-red-600 focus:ring-offset-primary-900 focus:ring-_red-500',
};

const sizeStyles: { [K in Sizes]: string } = {
  small: 'px-2 py-0.5 text-sm',
  medium: 'px-4 py-1 text-base',
  large: 'px-6 py-2 text-xl',
};

const borderRadiusStyles: { [K in BorderRadius]: string } = {
  default: 'rounded',
  full: 'rounded-full',
  none: 'rounded-none',
};

type Props = {
  children?: React.ReactNode;
  className?: string;
  size?: Sizes;
  variant?: Variants;
  borderRadius?: BorderRadius;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children = <>Button</>,
  className = '',
  variant = 'default',
  size = 'medium',
  borderRadius = 'default',
  onClick = (): void => {},
  ...props
}: Props) {
  return (
    <button
      type="button"
      className={clsx(
        defaultStyle,
        variant ? variantStyles?.[variant] : '',
        size ? sizeStyles?.[size] : '',
        borderRadius ? borderRadiusStyles?.[borderRadius] : '',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
