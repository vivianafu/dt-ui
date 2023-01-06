import { cloneElement, Fragment, isValidElement, useMemo, useRef, useState } from 'react';

import {
  offset,
  shift,
  arrow,
  autoUpdate,
  autoPlacement,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
  FloatingPortal,
  safePolygon,
} from '@floating-ui/react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { useMergeRefs } from '@floating-ui/react';

import { ReferenceType } from '@floating-ui/react';
import type { Strategy, Placement } from '@floating-ui/react-dom';
import type { ReactNode } from 'react';
import { Side } from '@floating-ui/react/src';

const FLIP_SIDES: { [k in Side]: string } = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};

type Props = {
  children?: ReactNode;
  label?: ReactNode | string;
  className?: string;
  arrowClassName?: string;
  portalClassName?: string;
  strategy?: Strategy;
  placement?: Placement | 'auto';
  show?: boolean;
  interactive?: boolean;
};

export default function Tooltip({
  children,
  label,
  className = '',
  arrowClassName = '',
  portalClassName = '',
  strategy = 'fixed',
  placement = 'auto',
  show = true,
  interactive = false,
}: Props) {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);
  const {
    x,
    y,
    reference,
    floating,
    context,
    middlewareData,
    strategy: _strategy,
    placement: _placement,
  } = useFloating({
    open,
    strategy,
    onOpenChange: setOpen,
    middleware: [
      offset(8),
      shift({ padding: 8 }),
      ...(placement === 'auto' ? [autoPlacement()] : []),
      ...(arrowRef.current ? [arrow({ element: arrowRef.current })] : []),
    ],
    ...(placement !== 'auto' && { placement }),
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: 50,
      ...(interactive && { handleClose: safePolygon({ blockPointerEvents: false, restMs: 50 }) }),
    }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  const ref = useMemo(() => children && useMergeRefs([reference, (children as any).ref]), [reference, children]);

  return (
    <>
      {isValidElement(children) && cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      <FloatingPortal>
        <Transition appear show={show && open && !!label}>
          <div
            {...getFloatingProps({
              ref: floating,
              className: clsx('z-tooltip', portalClassName),
              style: {
                position: _strategy,
                top: y ?? '',
                left: x ?? '',
              },
            })}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-in-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className={clsx('whitespace-nowrap rounded bg-gray-800 py-1 px-2 text-base shadow', className)}>
                {label}
                <div
                  className={clsx('absolute -z-1 h-3 w-3 rotate-45 bg-gray-800', arrowClassName)}
                  ref={arrowRef}
                  style={{
                    top: middlewareData?.arrow?.y ? middlewareData?.arrow?.y + middlewareData?.arrow?.centerOffset : '',
                    left: middlewareData?.arrow?.x
                      ? middlewareData?.arrow?.x + middlewareData?.arrow?.centerOffset
                      : '',
                    [FLIP_SIDES[_placement.split('-')[0] as Side]]: '-0.375rem',
                  }}
                />
              </div>
            </Transition.Child>
          </div>
        </Transition>
      </FloatingPortal>
    </>
  );
}
