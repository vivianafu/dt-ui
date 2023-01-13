import Button from '../button/index';

import Modal from './Modal';

import type { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    variant: {
      options: ['default', 'unstyled'],
      defaultValue: 'default',
      control: { type: 'radio' },
    },
    verticalAlign: {
      options: ['top', 'center'],
      defaultValue: 'center',
      control: { type: 'radio' },
    },
    size: {
      options: ['default', 'small', 'medium', 'large', 'full'],
      defaultValue: 'default',
      control: { type: 'select' },
    },
    open: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
  },
} as ComponentMeta<typeof Modal>;

const Content = ({ close, open }: { close: () => void; open: boolean }) => {
  console.log(open ? 'The Modal is opened' : 'The Modal is closed');

  return (
    <div className="flex h-[calc(100%_-_3rem)] flex-col space-y-8 p-4">
      <div className="grow">
        Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam
        incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse
        quis. Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit magna aute tempor cupidatat consequat
        elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit officia eiusmod
        Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur
        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
      </div>
      <div className="flex w-full items-end justify-end space-x-4">
        <Button variant="primary" onClick={close}>
          Close
        </Button>
        <Button>Secondary Action</Button>
      </div>
    </div>
  );
};

const Template: ComponentStory<typeof Modal> = ({ ...args }) => {
  return (
    <Modal {...args} render={({ close, open }) => <Content close={close} open={open} />}>
      <Button variant="primary">Trigger</Button>
    </Modal>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Modal Title',
  disableClose: true,
  size: 'default',
};

export const Small = Template.bind({});
Small.args = {
  title: 'Modal Title',
  className: '',
  size: 'small',
};

export const Medium = Template.bind({});
Medium.args = {
  title: 'Modal Title',
  size: 'medium',
};

export const Large = Template.bind({});
Large.args = {
  title: 'Modal Title',
  className: '',
  size: 'large',
};

export const Full = Template.bind({});
Full.args = {
  title: 'Modal Title',
  className: '',
  size: 'full',
};

export const AlignTop = Template.bind({});
AlignTop.args = {
  title: 'Modal Title',
  verticalAlign: 'top',
};

export const Unstyled = Template.bind({});
Unstyled.args = {
  title: 'Modal Title',
  variant: 'unstyled',
};
