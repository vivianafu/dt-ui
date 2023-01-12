import React, { useRef } from 'react';

import Toggle from './Toggle';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  argTypes: {
    variant: {
      options: ['default', 'unstyled'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Toggle>;

const Template: ComponentStory<typeof Toggle> = ({ onChange, ...args }) => {
  const inputRef = useRef<unknown | null>(null);

  const handleOnChange = (isEnabled: boolean) => {
    inputRef.current = isEnabled;
    console.log(isEnabled ? 'enabled' : 'disabled');
  };

  return <Toggle {...args} onChange={handleOnChange} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Toggle',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Toggle',
  size: 'small',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Toggle',
  size: 'large',
};

export const NoLabel = Template.bind({});
NoLabel.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Toggle',
  disabled: true,
  defaultEnabled: true,
};

export const Red = Template.bind({});
Red.args = {
  label: 'Toggle',
  defaultEnabled: true,
  className: '!bg-red-600 focus:ring-red-500',
};
