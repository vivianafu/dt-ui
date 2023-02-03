import * as React from 'react';

import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useMergeRefs,
  FloatingPortal,
  FloatingFocusManager,
  autoPlacement,
} from '@floating-ui/react';
import clsx from 'clsx';
import { isNil } from 'lodash';

import type { Placement, Strategy } from '@floating-ui/react';

interface PopoverOptions {
  initialOpen?: boolean;
  placement?: Placement;
  strategy?: Strategy;
  modal?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function usePopover({
  initialOpen = false,
  strategy = 'fixed',
  placement = 'bottom',
  modal,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(initialOpen);
  const [labelId, setLabelId] = React.useState<string | undefined>();
  const [descriptionId, setDescriptionId] = React.useState<string | undefined>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = setControlledOpen ?? setUncontrolledOpen;

  const data = useFloating({
    open,
    strategy,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift({ padding: 4 }), ...(placement ? [] : [autoPlacement()])],
    ...{ placement: placement },
  });

  const context = data.context;

  const interactions = useInteractions([
    useClick(context, {
      enabled: isNil(controlledOpen),
    }),
    useDismiss(context),
    useRole(context),
  ]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
      modal,
      labelId,
      descriptionId,
      setLabelId,
      setDescriptionId,
    }),
    [open, setOpen, interactions, data, modal, labelId, descriptionId],
  );
}

type ContextType =
  | (ReturnType<typeof usePopover> & {
      setLabelId: React.Dispatch<React.SetStateAction<string | undefined>>;
      setDescriptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
    })
  | null;

const PopoverContext = React.createContext<ContextType>(null);

export const usePopoverContext = () => {
  const context = React.useContext(PopoverContext);

  if (context === null) {
    throw new Error('Popover components must be wrapped in <Popover />');
  }

  return context;
};

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const PopoverTrigger = React.forwardRef<HTMLElement, React.HTMLProps<HTMLElement> & PopoverTriggerProps>(
  ({ children, asChild = false, className, ...props }, propRef) => {
    const context = usePopoverContext();

    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.reference, propRef, childrenRef]);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(
        children,
        context.getReferenceProps({
          ref,
          ...props,
          ...children.props,
          'data-state': context.open ? 'open' : 'closed',
        }),
      );
    }

    return (
      <button
        ref={ref}
        data-state={context.open ? 'open' : 'closed'}
        className={clsx('text-gray-50', className)}
        {...context.getReferenceProps(props)}
      >
        {children}
      </button>
    );
  },
);

const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ children, className, style, ...props }, propRef) => {
    const { context: floatingContext, ...context } = usePopoverContext();
    const ref = useMergeRefs([context.floating, propRef]);

    return (
      <FloatingPortal>
        {context.open && (
          <FloatingFocusManager context={floatingContext} order={['reference', 'content']}>
            <div
              className={clsx(
                '-mt-0.5 rounded border border-gray-50/20 bg-primary-900 py-1 px-2 text-sm text-gray-50 shadow-lg dark:bg-gray-900',
                className,
                context.placement.includes('top') && 'translate-y-[0.25rem]',
              )}
              ref={ref}
              style={{
                position: context.strategy,
                top: context.y ?? 0,
                left: context.x ?? 0,
                width: 'max-content',
                ...style,
              }}
              aria-labelledby={context.labelId}
              aria-describedby={context.descriptionId}
              {...context.getFloatingProps(props)}
            >
              {children}
            </div>
          </FloatingFocusManager>
        )}
      </FloatingPortal>
    );
  },
);

const Popover = ({
  children,
  render,
  modal = false,
  triggerClassName,
  contentClassName,
  ...props
}: {
  children: React.ReactNode | ((props: PopoverOptions) => React.ReactNode);
  render: React.ReactNode | ((props: PopoverOptions) => React.ReactNode);
  triggerClassName?: string;
  contentClassName?: string;
} & PopoverOptions) => {
  const popover = usePopover({ modal, ...props });

  return (
    <PopoverContext.Provider value={popover}>
      <PopoverTrigger className={triggerClassName}>
        {typeof children === 'function' ? children(popover) : children}
      </PopoverTrigger>
      <PopoverContent className={contentClassName}>
        {typeof render === 'function' ? render(popover) : render}
      </PopoverContent>
    </PopoverContext.Provider>
  );
};

export default Popover;
