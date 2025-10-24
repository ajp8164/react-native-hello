import React, { useCallback, forwardRef, useImperativeHandle } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import type {
  BackdropPressBehavior,
  BottomSheetDefaultBackdropProps,
} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import type { BottomSheetProps as RNBottomSheetProps } from '@gorhom/bottom-sheet';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { PortalProvider } from '@gorhom/portal';
import { ConditionalWrapper } from './ConditionalWrapper';

interface BottomSheetProps extends RNBottomSheetProps {
  innerRef?: React.RefObject<BottomSheetModalMethods>;
  modalParent?: boolean;
  onDismiss?: () => void;
  touchBackdropBehavior?: BackdropPressBehavior;
}

const BottomSheet = forwardRef<BottomSheetModalMethods, BottomSheetProps>(
  (
    {
      children,
      innerRef,
      modalParent,
      onDismiss,
      touchBackdropBehavior = 'close',
      ...bottomSheetModalProps
    },
    ref,
  ) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          pressBehavior={touchBackdropBehavior}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      ),
      [touchBackdropBehavior],
    );

    // Forward the real modal ref directly (Fabric safe)
    useImperativeHandle(
      ref,
      () => innerRef?.current as BottomSheetModalMethods,
      [innerRef?.current],
    );

    const modal = (
      <BottomSheetModal
        ref={innerRef}
        index={0}
        backdropComponent={renderBackdrop}
        stackBehavior="push"
        onDismiss={onDismiss}
        {...bottomSheetModalProps}>
        {children}
      </BottomSheetModal>
    );

    return (
      <ConditionalWrapper
        condition={modalParent || false}
        wrapper={child => (
          <BottomSheetModalProvider>
            <PortalProvider>{child}</PortalProvider>
          </BottomSheetModalProvider>
        )}>
        {modal}
      </ConditionalWrapper>
    );
  },
);

export { BottomSheet };
