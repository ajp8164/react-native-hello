import { useContext, useEffect } from 'react';

import Toast, { type ToastShowParams } from 'react-native-toast-message';
import { NetworkContext } from '@react-native-hello/core';

interface NetworkConnectionBar {
  toastProps?: ToastShowParams;
}

const NetworkConnectionBar = ({ toastProps }: NetworkConnectionBar) => {
  const network = useContext(NetworkContext);

  useEffect(() => {
    if (!network.state?.isConnected) {
      Toast.show({
        type: 'networkConnection',
        text1: 'No internet connection',
        text2: 'Check your internet connection and try again.',
        position: 'top',
        visibilityTime: 5000,
        autoHide: false,
        topOffset: 70,
        ...toastProps,
      });
    } else {
      Toast.hide();
    }
  }, [network.state?.isConnected]);

  return null;
};

export { NetworkConnectionBar };
