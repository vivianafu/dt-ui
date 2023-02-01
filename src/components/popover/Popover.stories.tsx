import Popover from './Popover';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Popover',
  component: Popover,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover>
    <Popover.trigger>Trigger</Popover.trigger>
    <Popover.content>
      <Popover.description>description</Popover.description>
    </Popover.content>
  </Popover>
);

export const Default = Template.bind({});
Default.args = {};
