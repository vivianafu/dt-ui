import { useState } from 'react';

import Select from './Select';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Select',
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = ({ selected, onChange, ...args }) => {
  const [_selected, setSelected] = useState(selected);

  return <Select {...args} selected={_selected} onChange={setSelected} />;
};

export const Default = Template.bind({});
Default.args = {
  label: '',
  className: 'min-w-48',
  options: Array.from({ length: 12 }, (_, i) => ({ key: i.toString(), value: `Option ${i}` })),
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: '',
  className: 'min-w-48',
  options: Array.from({ length: 12 }, (_, i) => ({ key: i.toString(), value: `Option ${i}` })),
  disabled: true,
};

export const Empty = Template.bind({});
Empty.args = {
  label: '',
  className: 'min-w-48',
  options: [],
};
