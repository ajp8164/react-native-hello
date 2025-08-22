import React, { type ReactNode } from 'react';

import { SharedValue } from 'react-native-reanimated';
import { ViewStyle } from 'react-native';

export declare type Modal = ModalMethods;

declare const Modal: React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    ModalProps & React.RefAttributes<ModalMethods>
  >
>;

export interface ModalProps {
  backgroundStyle?: ViewStyle;
  children: ReactNode;
  background?: 'normal' | 'inverse';
  bottomInset?: number;
  detached?: boolean;
  enableDynamicSizing?: boolean;
  enableGestureBehavior?: boolean;
  handleComponent?: React.FC<BottomSheetHandleProps> | null | undefined;
  handleIndicatorStyle?: ViewStyle;
  keyboardBehavior?: 'interactive' | 'extend' | 'fillParent';
  modalParent?: boolean;
  onClose?: () => void; // Close only
  onDismiss?: () => void; // Close and unmount
  scrollContainerStyle?: ViewStyle;
  scrollEnabled?: boolean;
  snapPoints?: Array<string | number> | SharedValue<Array<string | number>>;
  style?: ViewStyle | ViewStyle[];
}

export interface ModalMethods {
  close: () => void;
  dismiss: () => void;
  present: () => void;
}
