import Popover from './Popover';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  argTypes: {},
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Popover>;
export const Default: Story = { render: () => <Popover render={<>hello</>}>Trigger</Popover> };

export const PlacementTop: Story = {
  render: () => (
    <Popover render={<>hello</>} placement="top">
      PlacementTop
    </Popover>
  ),
};
