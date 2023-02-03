import { useState } from 'react';

import Monthpicker from './Monthpicker';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Monthpicker',
  component: Monthpicker,
  argTypes: {},
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof Monthpicker>;

const Template: ComponentStory<typeof Monthpicker> = (args) => {
  const [_selected, setSelected] = useState<Date | null | undefined>(new Date());

  return <Monthpicker {...args} selected={_selected} onChange={(date) => setSelected(date)} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Monthpicker',
};
