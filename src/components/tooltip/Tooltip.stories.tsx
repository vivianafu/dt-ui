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

const Template: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <Tooltip {...args}>
      <div className="rounded py-1 px-2 text-gray-50 focus:border-2 focus:border-gray-400 focus:outline-none">
        Trigger
      </div>
    </Tooltip>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'label',
};

export const PlacementTop = Template.bind({});
PlacementTop.args = {
  label: ({ open }) => <Label open={open} />,
  placement: 'top',
};

export const HideArrow = Template.bind({});
HideArrow.args = {
  label: <div>arrow hidden label</div>,
  hasArrow: false,
  placement: 'bottom-start',
};
