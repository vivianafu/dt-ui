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
