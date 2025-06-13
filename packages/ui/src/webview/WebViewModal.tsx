import { type AppTheme, useTheme } from '../theme';
import React, { useImperativeHandle, useRef, useState } from 'react';

import { type BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Modal } from '..';
import { makeStyles } from '@rn-vui/themed';
import { type WebViewModalMethods, type WebViewModalProps } from './types';
import WebView from './WebView';

type WebViewModal = WebViewModalMethods;

const WebViewModal = React.forwardRef<WebViewModal, WebViewModalProps>((props, ref) => {
  const { snapPoints = ['92%'] } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const [url, setUrl] = useState('');
  const innerRef = useRef<BottomSheetModalMethods>(null);

  useImperativeHandle(ref, () => ({
    // These functions exposed to the parent component through the ref.
    present,
  }));

  const present = (url: string) => {
    setUrl(url);
    innerRef.current?.present();
  };

  return (
    <Modal
      ref={innerRef}
      snapPoints={snapPoints}
      backgroundStyle={s.modalBackground}
      enableDynamicSizing={false}
      handleIndicatorStyle={s.handleIndicator}>
      <WebView url={url} navBarStyle={s.navBar} />
    </Modal>
  );
});

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  modalBackground: {
    backgroundColor: theme.colors.stickyWhite,
  },
  handleIndicator: {
    backgroundColor: theme.colors.stickyBlack,
  },
  navBar: {
    paddingBottom: 45,
  },
}));

export { WebViewModal };
