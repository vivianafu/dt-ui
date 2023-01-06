import { addons } from '@storybook/addons';
import { UPDATE_GLOBALS } from '@storybook/core-events';

import { colors } from '../src/styles';

import '../src/index.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'dt-background',
    values: [
      {
        name: 'dt-background',
        value: colors.primary['900'],
      },
      {
        name: 'light',
        value: '#ffffff',
      },
      {
        name: 'dark',
        value: '#000000',
      },
    ],
  },
};

let channel = addons.getChannel();

const storyListener = (args) => {
  if (!args.globals.backgrounds) {
    return;
  }

  if (args.globals.backgrounds.value === '#000000') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

channel.addListener(UPDATE_GLOBALS, storyListener);
