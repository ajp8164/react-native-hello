import React, {
  type ReactNode,
  createContext,
  useEffect,
  useState,
} from 'react';

import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';

export type NetworkContext = {
  state: NetInfoState | undefined;
};

export const NetworkContext = createContext<NetworkContext>({
  state: undefined,
});

export const NetworkProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const [state, setState] = useState<NetInfoState>();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(changedState => {
      setState(prev => {
        if (changedState.isInternetReachable !== prev?.isInternetReachable) {
          return changedState;
        }
        return prev;
      });
    });

    return unsubscribe;
  }, []);

  return (
    <NetworkContext.Provider value={{ state }}>
      {children}
    </NetworkContext.Provider>
  );
};
