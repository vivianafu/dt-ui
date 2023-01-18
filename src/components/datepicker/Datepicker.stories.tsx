import { useState } from 'react';

import Datepicker from './Datepicker';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Datepicker',
  component: Datepicker,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof Datepicker>;

const Template: ComponentStory<typeof Datepicker> = ({ onChange, selected, ...args }) => {
  const [_selected, setSelected] = useState(selected);

  return <Datepicker {...args} selected={selected} onChange={setSelected} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Datepicker',
  className: '',
};
