import { useNetwork } from '@react-native-hello/core';
import Toast from 'react-native-toast-message';
import { useToastProps } from '.';

export const useEnsureNetwork = () => {
  const network = useNetwork();
  const appToastProps = useToastProps();

  const ensureNetwork = <T>(callback: () => T) => {
    // Check for boolean value, ignore while state is undefined.
    if (network.state?.isInternetReachable === true) {
      return callback();
    } else if (network.state?.isInternetReachable === false) {
      return Toast.show(appToastProps.noNetworkConnection);
    }
  };

  return {
    ensureNetwork,
    isInternetReachable: network.state?.isInternetReachable,
  };
};
