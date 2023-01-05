import '../src/index.css';

import { colors } from '../src/styles';

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
