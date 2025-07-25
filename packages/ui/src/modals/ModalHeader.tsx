import { type AppTheme, useTheme } from '../theme';
import { Button, Icon } from '@rn-vui/base';
import {
  type LayoutChangeEvent,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import { BlurBackground } from '../BlurBackground';
import React from 'react';
import { makeStyles } from '@rn-vui/themed';

interface ModalHeaderInterface {
  blurBackground?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  leftButtonBusy?: boolean;
  leftButtonDisabled?: boolean;
  leftButtonText?: string;
  leftButtonTextStyle?: TextStyle | TextStyle[];
  leftButtonIcon?: string;
  leftButtonIconColor?: string;
  leftButtonIconSize?: number;
  leftButtonIconType?: string;
  onLayout?: (event: LayoutChangeEvent) => void;
  onLeftButtonPress?: () => void;
  onRightButtonPress?: () => void;
  rightButtonBusy?: boolean;
  rightButtonDisabled?: boolean;
  rightButtonText?: string;
  rightButtonTextStyle?: TextStyle | TextStyle[];
  rightButtonIcon?: string;
  rightButtonIconColor?: string;
  rightButtonIconSize?: number;
  rightButtonIconType?: string;
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
  leftButtonIconColor,
  leftButtonIconSize = 28,
  leftButtonIconType = 'material-community',
  onLayout,
  onLeftButtonPress,
  onRightButtonPress,
  rightButtonBusy,
  rightButtonDisabled,
  rightButtonText,
  rightButtonTextStyle,
  rightButtonIcon,
  rightButtonIconColor,
  rightButtonIconSize = 28,
  rightButtonIconType = 'material-community',
  size = 'large',
  title,
}: ModalHeaderInterface) => {
  const theme = useTheme();
  const s = useStyles(theme);

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
                ? theme.insets.top + Number(theme.styles.headerBarLarge.height)
                : theme.insets.top + Number(theme.styles.headerBar.height),
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
          icon={
            leftButtonIcon ? (
              <Icon
                name={leftButtonIcon}
                type={leftButtonIconType}
                color={leftButtonIconColor}
                size={leftButtonIconSize}
              />
            ) : undefined
          }
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
          icon={
            rightButtonIcon ? (
              <Icon
                name={rightButtonIcon}
                type={rightButtonIconType}
                color={rightButtonIconColor}
                size={rightButtonIconSize}
              />
            ) : undefined
          }
          disabled={rightButtonDisabled}
          onPress={onRightButtonPress}
        />
      </View>
    </>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
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
    ...theme.styles.textNormal,
    color: theme.colors.screenHeaderButtonText,
  },
  titleLarge: {
    ...theme.styles.textHeading1,
    fontSize: 34.5,
    letterSpacing: -1.7,
    marginTop: 45,
  },
  titleSmall: {
    ...theme.styles.textLarge,
    ...theme.styles.textBold,
    marginVertical: 8,
  },
}));

export { ModalHeader };
