import { cloneElement, Fragment, isValidElement, useRef, useState } from 'react';

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
  useMergeRefs,
} from '@floating-ui/react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';

import type { Strategy, Placement, Side } from '@floating-ui/react';
import type { ReactNode, RefObject } from 'react';

const FLIP_SIDES: { [k in Side]: string } = {
  left: 'right',
  right: 'left',
  top: 'bottom',
  bottom: 'top',
};

type Props = {
  children?: (ReactNode & { ref?: RefObject<unknown> }) | string;
  label?: ReactNode | string | ((props: { open: boolean }) => React.ReactNode);
  className?: string;
  containerClassName?: string;
  arrowClassName?: string;
  portalClassName?: string;
  strategy?: Strategy;
  placement?: Placement;
  show?: boolean;
  interactive?: boolean;
  hasArrow?: boolean;
};

export default function Tooltip({
  children,
  label,
  className = '',
  containerClassName = '',
  arrowClassName = '',
  portalClassName = '',
  strategy = 'fixed',
  placement = 'bottom',
  show = true,
  interactive = false,
  hasArrow = true,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const arrowRef = useRef<HTMLDivElement>(null);

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
      ...(placement ? [] : [autoPlacement()]),
      ...(arrowRef.current ? [arrow({ element: arrowRef.current })] : []),
    ],
    ...{ placement: placement },
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

  const ref = useMergeRefs([reference, ...(isValidElement(children) && children?.ref ? [children.ref] : [])]);

  return (
    <div className={containerClassName}>
      {isValidElement(children) && cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      {!isValidElement(children) && typeof children === 'string'
        ? cloneElement(<div className=" text-gray-50">{children}</div>, getReferenceProps({ ref }))
        : null}
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
              <div>
                <div
                  className={clsx(
                    'relative rounded bg-gray-800 py-1 px-2 text-base text-gray-50 shadow marker:whitespace-nowrap',
                    className,
                  )}
                >
                  {typeof label === 'function' ? label({ open: open }) : label}
                </div>
                {hasArrow && (
                  <div
                    className={clsx('absolute -z-1 h-3 w-3 rotate-45 bg-gray-800', arrowClassName)}
                    ref={arrowRef}
                    style={{
                      top: middlewareData?.arrow?.y
                        ? middlewareData?.arrow?.y + middlewareData?.arrow?.centerOffset
                        : '',
                      left: middlewareData?.arrow?.x
                        ? middlewareData?.arrow?.x + middlewareData?.arrow?.centerOffset
                        : '',
                      [FLIP_SIDES[_placement.split('-')[0] as Side]]: '-0.375rem',
                    }}
                  />
                )}
              </div>
            </Transition.Child>
          </div>
        </Transition>
      </FloatingPortal>
    </div>
  );
}
