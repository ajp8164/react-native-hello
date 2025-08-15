import { type ToastShowParams } from 'react-native-toast-message';
import { useDevice } from '../theme';

export const useToastProps = () => {
  const device = useDevice();

  return {
    noNetworkConnection: {
      type: 'networkConnection',
      text1: 'No Internet Connection',
      position: 'bottom',
      autoHide: true,
      visibilityTime: 3000,
      bottomOffset: device.bottomTabBarHeight + 15,
    } as ToastShowParams,
  };
};
