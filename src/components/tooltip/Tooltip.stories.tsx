import { useRef } from 'react';

import Tooltip from './Tooltip';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {},
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof Tooltip>;

const Label = ({ open }: { open: boolean }) => {
  console.log(open ? 'opened' : 'dismissed');
  return <div>label</div>;
};

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args}>
    <span className="text-gray-50">Trigger</span>
  </Tooltip>
);

export const Default = Template.bind({});
Default.args = {
  label: 'label',
  className: 'text-gray-50',
  arrowClassName: '',
};

export const PlacementTop = Template.bind({});
PlacementTop.args = {
  label: ({ open }) => <Label open={open} />,
  className: 'text-gray-50',
  arrowClassName: '',
  placement: 'top',
};

export const HideArrow = Template.bind({});
HideArrow.args = {
  label: <div>arrow hidden label</div>,
  className: 'text-gray-50',
  hasArrow: false,
  placement: 'bottom-start',
};

//---------------- ButtonRef Example----------------//
/*
  This example shows how to use the mergeChildrenRef prop to merge the ref of the children with the ref of the reference element.
  If you don't merge the ref, the reference element will not be focused when hovering over the children.
  Update the mergeChildrenRef prop to see the difference.
*/

const ButtonRefTemplate: ComponentStory<typeof Tooltip> = (args) => {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <Tooltip {...args}>
      <button
        ref={ref}
        className="text-gray-50 focus:border-2 focus:border-red-500 focus:outline-none"
        onMouseEnter={() => ref.current?.focus()}
        onMouseLeave={() => ref.current?.blur()}
      >
        {args.mergeChildrenRef ? 'Hover to focus will work' : 'Hover to focus will not work'}
      </button>
    </Tooltip>
  );
};

export const ButtonRefWorks = ButtonRefTemplate.bind({});
ButtonRefWorks.args = {
  label: <div>It works!</div>,
  className: 'text-gray-50',
  mergeChildrenRef: true,
};

export const ButtonRefNotWorking = ButtonRefTemplate.bind({});
ButtonRefNotWorking.args = {
  label: <div>Wont work!</div>,
  className: 'text-gray-50',
  mergeChildrenRef: false,
};
