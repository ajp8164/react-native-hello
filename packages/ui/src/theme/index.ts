import {
  type Colors,
  type Theme,
  useTheme as useRNETheme,
} from '@rn-vui/themed';
import {
  type EdgeInsets,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { ReactNativeHello } from '@react-native-hello/core';
import type { Styles } from './types/Styles';
import { useStyles } from './styles';

export type { ColorSet } from './types/Colors';
export type { Styles } from './types/Styles';

export * from './svg';
export {
  fontSizes,
  fontFamily,
  fontFamilyBold,
  fontFamilyLight,
  viewport,
} from './styles';

export { theme } from './theme';
export { useStyles } from './styles';

export const useTheme = () => {
  const { theme } = useRNETheme();
  const themeUsersConfig = ReactNativeHello.get('theme') as AppTheme;
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  return {
    ...{
      ...theme,
      styles,
      insets,
    },
    ...themeUsersConfig,
  } as AppTheme;
};

export interface AppTheme extends Theme {
  colors: Colors;
  styles: Styles;
  insets: EdgeInsets;
}
