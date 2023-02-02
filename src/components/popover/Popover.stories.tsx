import Popover from './Popover';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Popover> = { title: 'Components/Popover', component: Popover, argTypes: {} };
export default meta;

type Story = StoryObj<typeof Popover>;
export const Basic: Story = { render: () => <Popover render={<>hello</>}>Trigger</Popover> };
