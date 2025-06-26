import { type AppTheme, useTheme } from '../theme';

import React, { useRef, useState } from 'react';
import { WebView as RNWebView } from 'react-native-webview';
import { makeStyles } from '@rn-vui/themed';
import { Pressable, View, type ViewStyle } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';

interface WebView {
  navBarStyle?: ViewStyle | ViewStyle[];
  url: string;
}

const WebView = ({ navBarStyle, url }: WebView) => {
  const theme = useTheme();
  const s = useStyles(theme);

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const webviewRef = useRef<RNWebView>(null);

  const backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack();
  };

  const forwardButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward();
  };

  return (
    <>
      {url && (
        <>
          <RNWebView
            ref={webviewRef}
            source={{ uri: url }}
            originWhitelist={['*']}
            onNavigationStateChange={navState => {
              setCanGoBack(navState.canGoBack);
              setCanGoForward(navState.canGoForward);
            }}
          />
          <View style={[s.navBarContainer, navBarStyle]}>
            <Pressable onPress={backButtonHandler} style={s.navButton}>
              <ChevronLeft
                color={theme.colors.button}
                size={30}
                style={canGoBack ? {} : s.disabled}
                disabled={!canGoBack}
              />
            </Pressable>
            <Pressable onPress={forwardButtonHandler} style={s.navButton}>
              <ChevronRight
                color={theme.colors.button}
                size={30}
                style={canGoForward ? {} : s.disabled}
                disabled={!canGoForward}
              />
            </Pressable>
          </View>
        </>
      )}
    </>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  navBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: theme.colors.whiteTransparentDarker,
    borderTopColor: theme.colors.listItemBorder,
    borderTopWidth: 1,
  },
  navButton: {
    width: '50%',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.3,
  },
}));

export { WebView };
