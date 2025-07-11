import type {
  BackdropPressBehavior,
  BottomSheetDefaultBackdropProps,
} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  type BottomSheetProps as RNBottomSheetProps,
} from '@gorhom/bottom-sheet';
import React, { useCallback, type JSX } from 'react';

import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { ConditionalWrapper } from './ConditionalWrapper';
import { PortalProvider } from '@gorhom/portal';

interface BottomSheet extends RNBottomSheetProps {
  innerRef: React.RefObject<BottomSheetModalMethods | null>;
  modalParent?: boolean;
  onDismiss?: () => void;
  touchBackdropBehavior?: BackdropPressBehavior;
}

const BottomSheet = ({
  children,
  innerRef,
  modalParent,
  onDismiss,
  touchBackdropBehavior = 'close',
  ...bottomSheetModalProps
}: BottomSheet) => {
  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        pressBehavior={touchBackdropBehavior}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        {...props}
      />
    ),
    [],
  );

  // See https://github.com/gorhom/react-native-bottom-sheet/issues/832
  // for using <BottomSheetModalProvider><PortalProvider>
  return (
    <ConditionalWrapper
      condition={modalParent || false}
      wrapper={children => (
        <BottomSheetModalProvider>
          <PortalProvider>{children}</PortalProvider>
        </BottomSheetModalProvider>
      )}>
      <BottomSheetModal
        ref={innerRef}
        index={0}
        backdropComponent={renderBackdrop}
        stackBehavior={'push'}
        onDismiss={onDismiss}
        {...bottomSheetModalProps}>
        {children}
      </BottomSheetModal>
    </ConditionalWrapper>
  );
};

export { BottomSheet };
