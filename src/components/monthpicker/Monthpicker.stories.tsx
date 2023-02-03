import Monthpicker from './Monthpicker';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Monthpicker',
  component: Monthpicker,
  argTypes: {},
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof Monthpicker>;

const Template: ComponentStory<typeof Monthpicker> = (args) => <Monthpicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'monthpicker',
};
