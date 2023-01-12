import React, { useRef } from 'react';

import Checkbox from './Checkbox';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {
    variant: {
      options: ['default', 'unstyled'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = ({ onChange, ...args }) => {
  const inputRef = useRef<unknown | null>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current = event.target.checked;
    console.log(inputRef.current ? 'checked' : 'unchecked');
  };

  return <Checkbox {...args} onChange={handleOnChange} ref={inputRef} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox',
};

export const unstyled = Template.bind({});
unstyled.args = {
  label: 'Checkbox',
  variant: 'unstyled',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Checkbox',
  disabled: true,
};
