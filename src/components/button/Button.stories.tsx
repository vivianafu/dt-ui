import Button from './Button';
import { BorderRadius, Sizes, Variants } from './types';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    size: {
      options: Object.values(Sizes),
      control: { type: 'radio' },
    },
    borderRadius: {
      options: Object.values(BorderRadius),
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: Variants.DEFAULT,
};

export const Primary = Template.bind({});
Primary.args = {
  variant: Variants.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: Variants.SECONDARY,
};

export const Orange = Template.bind({});
Orange.args = {
  variant: Variants.ORANGE,
};

export const Green = Template.bind({});
Green.args = {
  variant: Variants.GREEN,
};

export const Cancel = Template.bind({});
Cancel.args = {
  variant: Variants.CANCEL,
};

export const Danger = Template.bind({});
Danger.args = {
  variant: Variants.DANGER,
};
