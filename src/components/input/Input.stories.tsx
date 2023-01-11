import React, { useRef } from 'react';

import Input from './Input';

import type { ComponentStory, ComponentMeta } from '@storybook/react';
import type { CompositionEvent } from 'react';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    variant: {
      options: ['default', 'unstyled'],
      control: { type: 'radio' },
    },
    inputSize: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({ onChange, ...args }) => {
  const inputRef = useRef<unknown | null>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    inputRef.current = event.target.value;
    console.log('onChange', inputRef.current);
  };

  const handleOnComposition = (event: CompositionEvent) => {
    console.log('onCompositionend', event.data);
  };

  return <Input {...args} onChange={handleOnChange} onComposition={handleOnComposition} ref={inputRef} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Input',
  className: 'min-w-24',
  defaultValue: 'test default',
  required: true,
};

export const Unstyled = Template.bind({});
Unstyled.args = {
  label: 'Input',
  className: 'min-w-24',
  defaultValue: 'test default',
  variant: 'unstyled',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Input',
  placeholder: 'enter',
  disabled: true,
};

export const Large = Template.bind({});
Large.args = {
  label: 'Input',
  placeholder: 'enter',
  inputSize: 'large',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Input',
  placeholder: 'enter',
  inputSize: 'small',
};
