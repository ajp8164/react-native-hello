import { type ToastShowParams } from 'react-native-toast-message';
import { useTheme } from '../theme';

export const useToastProps = () => {
  const theme = useTheme();

  return {
    noNetworkConnection: {
      type: 'networkConnection',
      text1: 'No Internet Connection',
      position: 'bottom',
      autoHide: true,
      visibilityTime: 3000,
      bottomOffset: (theme.styles.navigationBottomTabBar.height as number) + 15,
    } as ToastShowParams,
  };
};
