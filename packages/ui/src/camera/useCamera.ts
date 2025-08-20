import { useContext } from 'react';
import { CameraContext } from './CameraProvider';

export const useCamera = (): CameraContext => {
  return useContext(CameraContext);
};
