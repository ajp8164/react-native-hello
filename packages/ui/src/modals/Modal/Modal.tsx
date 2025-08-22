import { ThemeManager, useTheme } from '../../theme';
import type { ModalMethods, ModalProps } from './types';
import React, {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { BottomSheet } from '../../BottomSheet';
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

type Modal = ModalMethods;

const Modal = React.forwardRef<Modal, ModalProps>((props, ref) => {
  const {
    backgroundStyle,
    children,
    background = 'normal',
    bottomInset,
    detached,
    enableDynamicSizing,
    enableGestureBehavior = true,
    handleComponent,
    handleIndicatorStyle,
    keyboardBehavior,
    modalParent = false,
    scrollContainerStyle,
    scrollEnabled = true,
    snapPoints = useMemo(() => ['92%'], []),
    style,
    onClose = useCallback(() => {
      return;
    }, []),
    onDismiss = useCallback(() => {
      return;
    }, []),
  } = props;

  const theme = useTheme();
  const s = useStyles();

  const innerRef = useRef<BottomSheetModalMethods>(null);

  const enablePanDownToClose = enableGestureBehavior;
  const enableHandlePanningGesture = enableGestureBehavior;
  const touchBackdropBehavior = enableGestureBehavior ? 'close' : 'none';

  const backgroundColor = useMemo(() => {
    return background === 'normal'
      ? theme.colors.viewAltBackground
      : theme.colors.viewInvBackground;
  }, []);

  const handleIndicator = useMemo(() => {
    return background === 'normal'
      ? theme.colors.black
      : theme.colors.stickyWhite;
  }, []);

  useImperativeHandle(ref, () => ({
    //  These functions exposed to the parent component through the ref.
    close,
    dismiss,
    present,
  }));

  const close = () => {
    innerRef.current?.close();
  };

  const dismiss = () => {
    innerRef.current?.dismiss();
  };

  const present = () => {
    innerRef.current?.present();
  };

  return (
    <BottomSheet
      innerRef={innerRef}
      modalParent={modalParent}
      snapPoints={snapPoints}
      activeOffsetX={[-50, 50]} // See https://github.com/gorhom/react-native-bottom-sheet/issues/770
      activeOffsetY={[-5, 5]}
      enablePanDownToClose={enablePanDownToClose}
      enableHandlePanningGesture={enableHandlePanningGesture}
      enableDynamicSizing={enableDynamicSizing}
      keyboardBehavior={keyboardBehavior}
      touchBackdropBehavior={touchBackdropBehavior}
      backgroundStyle={[{ backgroundColor }, backgroundStyle]}
      style={style}
      detached={detached}
      bottomInset={bottomInset}
      handleComponent={handleComponent}
      handleIndicatorStyle={[
        { backgroundColor: handleIndicator },
        handleIndicatorStyle,
      ]}
      onClose={onClose}
      onDismiss={onDismiss}>
      {scrollEnabled ? (
        <BottomSheetScrollView
          scrollEnabled={scrollEnabled}
          contentContainerStyle={[s.container, scrollContainerStyle]}
          showsVerticalScrollIndicator={false}>
          {children}
        </BottomSheetScrollView>
      ) : (
        children
      )}
    </BottomSheet>
  );
});

const useStyles = ThemeManager.createStyleSheet(() => ({
  container: {
    height: '100%',
  },
}));

export { Modal };
