import { ThemeManager, useDevice } from '../theme';
import {
  type LayoutChangeEvent,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import { BlurBackground } from '../BlurBackground';
import React, { type ReactElement } from 'react';
import { Button } from '..';

interface ModalHeaderInterface {
  blurBackground?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  leftButtonBusy?: boolean;
  leftButtonDisabled?: boolean;
  leftButtonText?: string;
  leftButtonTextStyle?: TextStyle | TextStyle[];
  leftButtonIcon?: ReactElement;
  onLayout?: (event: LayoutChangeEvent) => void;
  onLeftButtonPress?: () => void;
  onRightButtonPress?: () => void;
  rightButtonBusy?: boolean;
  rightButtonDisabled?: boolean;
  rightButtonText?: string;
  rightButtonTextStyle?: TextStyle | TextStyle[];
  rightButtonIcon?: ReactElement;
  size?: 'small' | 'large';
  title?: string;
}

const ModalHeader = ({
  blurBackground,
  containerStyle,
  leftButtonBusy,
  leftButtonDisabled,
  leftButtonText,
  leftButtonTextStyle,
  leftButtonIcon,
  onLayout,
  onLeftButtonPress,
  onRightButtonPress,
  rightButtonBusy,
  rightButtonDisabled,
  rightButtonText,
  rightButtonTextStyle,
  rightButtonIcon,
  size = 'large',
  title,
}: ModalHeaderInterface) => {
  const s = useStyles();
  const device = useDevice();

  const onHeaderLayout = (event: LayoutChangeEvent) => {
    if (onLayout) onLayout(event);
  };

  return (
    <>
      {blurBackground && (
        <BlurBackground
          style={{
            height:
              size === 'large'
                ? device.insets.top + Number(device.headerBarLarge.height)
                : device.insets.top + Number(device.headerBar.height),
          }}
        />
      )}
      <View
        style={[size === 'large' ? s.viewLarge : s.viewSmall, containerStyle]}
        onLayout={onHeaderLayout}>
        <Text style={size === 'large' ? s.titleLarge : s.titleSmall}>
          {title}
        </Text>
        <Button
          type={'clear'}
          containerStyle={
            size === 'large' ? s.containerLeftLarge : s.containerLeftSmall
          }
          buttonStyle={size === 'large' ? s.buttonLarge : s.buttonSmall}
          title={leftButtonText}
          titleStyle={[s.buttonText, leftButtonTextStyle]}
          loading={leftButtonBusy}
          icon={leftButtonIcon ? leftButtonIcon : undefined}
          disabled={leftButtonDisabled}
          onPress={onLeftButtonPress}
        />
        <Button
          type={'clear'}
          containerStyle={
            size === 'large' ? s.containerRightLarge : s.containerRightSmall
          }
          buttonStyle={size === 'large' ? s.buttonLarge : s.buttonSmall}
          title={rightButtonText}
          titleStyle={[s.buttonText, rightButtonTextStyle]}
          loading={rightButtonBusy}
          icon={rightButtonIcon ? rightButtonIcon : undefined}
          disabled={rightButtonDisabled}
          onPress={onRightButtonPress}
        />
      </View>
    </>
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  viewLarge: {
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
  viewSmall: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLeftLarge: {
    position: 'absolute',
    left: 5,
  },
  containerLeftSmall: {
    position: 'absolute',
    left: 5,
  },
  containerRightLarge: {
    position: 'absolute',
    right: 10,
  },
  containerRightSmall: {
    position: 'absolute',
    right: 10,
  },
  buttonLarge: {},
  buttonSmall: {},
  buttonText: {
    ...theme.text.normal,
    color: theme.colors.screenHeaderButtonText,
  },
  titleLarge: {
    ...theme.text.h1,
    fontSize: 34.5,
    letterSpacing: -1.7,
    marginTop: 45,
  },
  titleSmall: {
    ...theme.text.large,
    fontFamily: theme.fonts.bold,
    marginVertical: 8,
  },
}));

export { ModalHeader };
