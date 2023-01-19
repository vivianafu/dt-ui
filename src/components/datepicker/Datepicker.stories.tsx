import { useState } from 'react';

import Datepicker from './Datepicker';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Datepicker',
  component: Datepicker,
  parameters: { layout: 'centered' },
} as ComponentMeta<typeof Datepicker>;

const Template: ComponentStory<typeof Datepicker> = ({ onChange, selected, ...args }) => {
  const [_selected, setSelected] = useState<Date | null | undefined>();

  return <Datepicker {...args} selected={selected} onChange={(date) => setSelected(date)} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Datepicker',
  selected: null,
  maxDate: null,
  minDate: null,
};
