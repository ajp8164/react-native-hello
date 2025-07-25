import {
  type PhotoFile,
  type VideoFile as VCVideoFile,
} from 'react-native-vision-camera';

import React from 'react';

export declare type CameraView = CameraViewMethods;

declare const CameraView: React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    CameraViewProps & React.RefAttributes<CameraViewMethods>
  >
>;

export interface CameraViewProps {
  onMediaCaptured: (media: PhotoFile | VideoFile, type: MediaType) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CameraViewMethods {}

export type MediaType = 'photo' | 'video' | 'auto';
export { PhotoFile } from 'react-native-vision-camera';
export type VideoFile = VCVideoFile & { width: number; height: number };

export type RawMediaCapture = {
  media: PhotoFile | VideoFile;
  type: MediaType;
};
