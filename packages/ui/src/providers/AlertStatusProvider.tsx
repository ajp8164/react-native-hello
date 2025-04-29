import React, { createContext, useRef } from 'react';

type ContextType = {
  alertInProgress: boolean;
};

export const AlertStatusContext = createContext<ContextType>({
  alertInProgress: false,
});

export function AlertStatusProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const alertInProgress = useRef(false).current;

  return (
    <AlertStatusContext.Provider
      value={{
        alertInProgress,
      }}>
      {children}
    </AlertStatusContext.Provider>
  );
}
