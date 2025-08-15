import { darkTheme } from './dark-theme';
import { lightTheme } from './light-theme';
import { ThemeManager as ThemeManagerCreator } from 'react-native-theme-mk';

export * from './types';
export { darkTheme } from './dark-theme';
export { lightTheme } from './light-theme';

export const ThemeManager = new ThemeManagerCreator(
  'light',
  {
    light: lightTheme,
    dark: darkTheme,
  },
  {
    autoScale: true,
  },
);
