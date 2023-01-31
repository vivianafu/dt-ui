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

  console.log('_selected', _selected);

  return <Datepicker {...args} selected={selected} onChange={(date) => setSelected(date)} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Datepicker',
  selected: new Date(),
};

export const hasMaxDate = Template.bind({});
hasMaxDate.args = {
  label: 'Datepicker',
  selected: null,
  maxDate: new Date('2023-02-01'),
};

export const hasMinDate = Template.bind({});
hasMinDate.args = {
  label: 'Datepicker',
  selected: null,
  minDate: new Date(),
};

export const customDateFormat = Template.bind({});
customDateFormat.args = {
  label: 'Datepicker',
  dateFormat: 'MMddyyyy',
};
