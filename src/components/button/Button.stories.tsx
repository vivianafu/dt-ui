import Button from './Button';
import { BorderRadius, Sizes } from './types';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
    borderRadius: {
      options: ['default', 'full', 'none'],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Orange = Template.bind({});
Orange.args = {
  variant: 'orange',
};

export const Green = Template.bind({});
Green.args = {
  variant: 'green',
};

export const Cancel = Template.bind({});
Cancel.args = {
  variant: 'cancel',
};

export const Danger = Template.bind({});
Danger.args = {
  variant: 'danger',
};
