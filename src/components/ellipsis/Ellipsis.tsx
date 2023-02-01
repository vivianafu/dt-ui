import { useEffect, useState, useRef } from 'react';

import clsx from 'clsx';
import { useWindowSize } from 'react-use';

import Tooltip from '../tooltip/Tooltip';

import type { Placement } from '@floating-ui/react';
import type { MouseEventHandler } from 'react';

type Props = {
  label: string;
  className?: string;
  placement?: Placement;
  onClick?: MouseEventHandler;
};

export default function Ellipsis({ label, className = '', placement, onClick = (): void => {} }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const { width } = useWindowSize();
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    ref.current && setIsTruncated(ref.current?.offsetWidth < ref.current?.scrollWidth);
  }, [label, width]);

  return (
    <Tooltip label={label} placement={placement} show={isTruncated} onClick={onClick}>
      <span className="block truncate">
        <span
          ref={(node) => {
            if (ref) ref.current = node;
            node && setIsTruncated(node.offsetWidth < node.scrollWidth);
          }}
          className={clsx('block truncate', className)}
        >
          {label}
        </span>
      </span>
    </Tooltip>
  );
}
