import React, { Fragment, useLayoutEffect, useState } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

import type { Sizes, Variants, VerticalAlignTypes } from './types';

type Props = {
  children: React.ReactNode | ((props: { open: boolean; close: () => void }) => React.ReactNode);
  className?: string;
  title?: string | React.ReactNode;
  titleClassName?: string;
  overlayClassName?: string;
  contentClassName?: string;
  defaultOpen?: boolean;
  disableClose?: boolean;
  disabled?: boolean;
  render: React.ReactNode | ((props: { open: boolean; close: () => void }) => React.ReactNode);
  afterClose?: () => void;
  variant?: Variants;
  size?: Sizes;
  verticalAlign?: VerticalAlignTypes;
};

const sizeStyles = {
  default: '',
  small: '!max-w-[40%]',
  medium: '!max-w-[80%]',
  large: 'w-screen',
  full: '!max-w-full h-screen',
};

const variantStyles: { [K in Variants]: { title: string; body: string } } = {
  default: {
    title: 'bg-primary-700 px-4 py-2 text-gray-50 rounded-t',
    body: 'bg-primary-900 max-w-[80%] max-h-[80%] text-gray-500',
  },
  unstyled: {
    title: '',
    body: 'bg-gray-50',
  },
};

const alignStyles = {
  top: 'items-start pt-16',
  center: 'items-center',
};

export default function Modal({
  children,
  className,
  title,
  titleClassName,
  overlayClassName,
  render,
  defaultOpen = false,
  disableClose = false,
  disabled = false,
  afterClose = () => {},
  variant = 'default',
  size = 'default',
  verticalAlign = 'center',
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  return (
    <>
      <div
        className={clsx('relative inline-flex', disabled && 'pointer-events-none')}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen(true);
        }}
      >
        {typeof children === 'function' ? children({ open: isOpen, close: () => setIsOpen(false) }) : children}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          onClose={() => {
            if (!disableClose) {
              setIsOpen(false);
              afterClose();
            }
          }}
          className={clsx('relative z-dialog', !isOpen && 'pointer-events-none')}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/50" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className={clsx('fixed inset-0 flex items-center justify-center', size === 'full' ? '' : 'p-4')}>
              <div className={clsx('flex min-h-full justify-center', alignStyles[verticalAlign], overlayClassName)}>
                <Dialog.Panel
                  className={clsx('max-w-7xl rounded shadow', sizeStyles[size], variantStyles[variant].body, className)}
                >
                  {title && (
                    <div
                      className={clsx(
                        'flex justify-between last:justify-between',
                        variantStyles[variant].title,
                        titleClassName
                      )}
                    >
                      <div className="text-lg font-medium">{title}</div>
                      <button
                        className="text-gray-300 hover:text-gray-50 focus:outline-none"
                        onClick={() => {
                          setIsOpen(false);
                          afterClose();
                        }}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                  {typeof render === 'function' ? (
                    render({
                      open: isOpen,
                      close: () => {
                        setIsOpen(false);
                        afterClose();
                      },
                    })
                  ) : (
                    <div className={clsx(size === 'full' ? 'w-screen' : '')}>{render}</div>
                  )}
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
