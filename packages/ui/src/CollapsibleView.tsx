import { type AppTheme, useTheme } from './theme';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  I18nManager,
  Animated,
  Easing,
  type StyleProp,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import type { CollapsibleProps } from 'react-native-collapsible';
import { makeStyles } from '@rn-vui/themed';

export type MakePropsOptional<T> = {
  [K in keyof T]?: T[K];
};

interface CollapsibleView {
  children: React.ReactNode;
  title?: string | React.ReactNode;
  initExpanded?: boolean;
  expanded?: boolean | null;
  unmountOnCollapse?: boolean;
  isRTL?: boolean | 'auto';
  duration?: number;
  collapsibleProps?: MakePropsOptional<CollapsibleProps>;
  collapsibleContainerStyle?: ViewStyle;
  IconContent?: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  activeOpacityFeedback?: number; // 0-1
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TouchableComponent?: React.ComponentType<any>;
  titleProps?: ViewProps;
  titleStyle?: ViewStyle;
  touchableWrapperStyle?: StyleProp<ViewStyle>;
  touchableWrapperProps?: ViewProps;
}

const CollapsibleView = ({
  children,
  title = '',
  initExpanded = false,
  expanded = null,
  unmountOnCollapse = false,
  isRTL = 'auto',
  duration = 300,
  collapsibleProps = {},
  collapsibleContainerStyle = {},
  IconContent,
  style = {},
  activeOpacityFeedback = 0.3,
  TouchableComponent = TouchableOpacity,
  titleProps = {},
  titleStyle = {},
  touchableWrapperStyle = {},
  touchableWrapperProps = {},
}: CollapsibleView) => {
  const theme = useTheme();
  const s = useStyles(theme);

  const controlled = expanded !== null;
  const [show, setShow] = useState<boolean | null>(initExpanded);
  const [mounted, setMounted] = useState(initExpanded);

  const rotateAnim = useRef(new Animated.Value(0)).current;

  if (controlled) {
    if (!mounted && expanded) setMounted(true);
  }

  const handleIconRotate = (open: boolean | null = null) => {
    const _open = open === null ? show : open;
    if (!_open)
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    else {
      Animated.timing(rotateAnim, {
        toValue: rotateAngle,
        duration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleAnimationEnd = () => {
    if (unmountOnCollapse && !show) setMounted(false);
  };

  const handleToggleShow = () => {
    if (!controlled)
      if (!mounted) {
        if (!show) setMounted(true);
      } else {
        setShow(!show);
      }
  };

  // Place the icon on the left or the right based on the device direction and isRTL property
  let rowDir: 'row-reverse' | 'row' = 'row' as const;
  if (isRTL === 'auto') isRTL = I18nManager.isRTL;
  else if (isRTL !== I18nManager.isRTL) rowDir = 'row-reverse';

  const rotateAngle = isRTL ? 90 : -90;
  const rotateAnimDeg = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    // This part is to trigger collapsible animation only after he has been fully mounted so animation would
    // not be interrupted.
    if (mounted) {
      setShow(true);
    }
  }, [mounted]);

  useEffect(() => {
    // On mounting set the rotation angle
    rotateAnim.setValue(show ? 0 : rotateAngle);
  }, []);

  useEffect(() => {
    if (mounted) handleIconRotate(!show);
    if (controlled && show != expanded) setShow(expanded);
  });

  return (
    <TouchableComponent
      style={[s.container, style, touchableWrapperStyle]}
      onPress={handleToggleShow}
      activeOpacity={activeOpacityFeedback}
      {...touchableWrapperProps}>
      <View
        style={{
          flexDirection: rowDir,
          alignItems: 'center',
          ...s.title,
          ...titleStyle,
        }}
        {...titleProps}>
        {IconContent ? (
          <Animated.View style={{ transform: [{ rotate: rotateAnimDeg }] }}>
            {IconContent}
          </Animated.View>
        ) : null}
        {typeof title === 'string' ? (
          <Text style={s.titleText}>{title}</Text>
        ) : (
          title
        )}
      </View>
      {mounted ? (
        <View style={{ width: '100%', ...collapsibleContainerStyle }}>
          <Collapsible
            onAnimationEnd={handleAnimationEnd}
            collapsed={!show}
            {...{ duration, ...collapsibleProps }}>
            {children}
          </Collapsible>
        </View>
      ) : null}
    </TouchableComponent>
  );
};

const useStyles = makeStyles((_theme, __theme: AppTheme) => ({
  container: {
    alignItems: 'center',
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    borderWidth: 0,
    overflow: 'hidden',
  },
  title: {
    height: 0,
  },
  titleText: {
    color: '#3385ff',
    fontSize: 16,
    padding: 5,
  },
}));

export { CollapsibleView };
