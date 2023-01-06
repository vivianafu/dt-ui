import '../src/index.css';
import { addons } from '@storybook/addons';
import { UPDATE_GLOBALS } from '@storybook/core-events';

const backgroundColorOptions = [
  { name: 'default', value: '#1B1D1F' },
  { name: 'light', value: '#ffffff' },
  { name: 'dark', value: '#000000' },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(theme|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'default',
    values: backgroundColorOptions,
  },
};

let channel = addons.getChannel();

const storyListener = (args) => {
  if (!args.globals) return;
  const backgroundValue = args.globals.backgrounds;

  if (backgroundValue) {
    const colorTheme = backgroundColorOptions.find(({ value }) => value === backgroundValue?.value).name;

    if (colorTheme === 'dark') document.documentElement.classList.add('dark');
    if (colorTheme !== 'dark') document.documentElement.classList.remove('dark');
  }
};

channel.addListener(UPDATE_GLOBALS, storyListener);
