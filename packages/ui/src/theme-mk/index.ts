import { darkTheme } from './dark-theme';
import { lightTheme } from './light-theme';
import { ThemeManager as ThemeManagerCreator } from 'react-native-theme-mk';

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

export const {
  ThemeProvider: MkThemeProvider,
  useTheme: useMkTheme,
  useDevice: useMkDevice,
  useScale: useMkScale,
} = ThemeManager;
