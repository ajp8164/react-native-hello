import React from 'react';
import {
  CameraModal,
  type CameraModalMethods,
  type PresentInterface,
} from '../modals/CameraModal';

import { createContext, useRef, type ReactNode } from 'react';

export type CameraContext = {
  dismissCameraModal: () => void;
  presentCameraModal: (args: PresentInterface) => void;
};

export const CameraContext = createContext<CameraContext>({
  dismissCameraModal: () => {
    return;
  },
  presentCameraModal: () => {
    return;
  },
});

export const CameraProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  const cameraModalRef = useRef<CameraModalMethods>(null);

  const dismiss = () => {
    cameraModalRef.current?.dismiss();
  };

  const present = (args: PresentInterface) => {
    cameraModalRef.current?.present(args);
  };

  return (
    <CameraContext.Provider
      value={{
        dismissCameraModal: dismiss,
        presentCameraModal: present,
      }}>
      <>
        {children}
        <CameraModal ref={cameraModalRef} />
      </>
    </CameraContext.Provider>
  );
};
