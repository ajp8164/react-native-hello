import {
  type Theme,
  DefaultTheme as RNDefaultTheme,
} from '@react-navigation/native';
import { useTheme } from '../theme';

export const useNavigationTheme = (): Theme => {
  const theme = useTheme();

  return {
    ...RNDefaultTheme,
    colors: {
      ...RNDefaultTheme.colors,
      background: theme.colors.viewBackground as string,
    },
  };
};
