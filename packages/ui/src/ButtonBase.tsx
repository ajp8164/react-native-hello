import { makeStyles } from '@rn-vui/themed';
import React, {
  type ReactElement,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  ActivityIndicator,
  type ActivityIndicatorProps,
  Platform,
  type StyleProp,
  StyleSheet,
  Text,
  type TextProps,
  type TextStyle,
  TouchableNativeFeedback,
  type TouchableNativeFeedbackProps,
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
  type ViewStyle,
} from 'react-native';
import { type AppTheme, useTheme } from './theme';

const defaultLoadingProps = (
  type: 'solid' | 'clear' | 'outline',
  theme: AppTheme,
): ActivityIndicatorProps => ({
  color: type === 'solid' ? theme.colors.white : theme.colors.buttonText,
  size: 'small',
});

const positionStyle = {
  top: 'column',
  bottom: 'column-reverse',
  left: 'row',
  right: 'row-reverse',
};

export interface ButtonBase
  extends TouchableOpacityProps,
    TouchableNativeFeedbackProps {
  buttonStyle?: StyleProp<ViewStyle>;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  disabledStyle?: StyleProp<ViewStyle>;
  disabledTitleStyle?: StyleProp<TextStyle>;
  icon?: ReactElement;
  iconContainerStyle?: StyleProp<ViewStyle>;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  iconRight?: boolean;
  linearGradientProps?: object;
  loading?: boolean;
  loadingStyle?: StyleProp<ViewStyle>;
  loadingProps?: ActivityIndicatorProps;
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  raised?: boolean;
  title?: string | React.ReactElement;
  titleStyle?: StyleProp<TextStyle>;
  titleProps?: TextProps;
  type?: 'solid' | 'clear' | 'outline';
  TouchableComponent?: typeof React.Component;
  uppercase?: boolean;
  ViewComponent?: typeof React.Component;
}

const ButtonBase = (props: ButtonBase) => {
  const {
    buttonStyle,
    color: buttonColor = 'primary',
    containerStyle,
    disabled = false,
    disabledStyle,
    disabledTitleStyle,
    icon,
    iconContainerStyle,
    iconPosition = 'left',
    iconRight = false,
    linearGradientProps,
    loading = false,
    loadingStyle,
    loadingProps: passedLoadingProps,
    onPress = () => {},
    radius,
    raised = false,
    size = 'md',
    title = '',
    titleProps,
    titleStyle: passedTitleStyle,
    type = 'solid',
    TouchableComponent,
    uppercase = false,
    ViewComponent = View,
    children = title,
    ...rest
  } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  useEffect(() => {
    if (linearGradientProps && !ViewComponent) {
      console.warn(
        "You need to pass a ViewComponent to use linearGradientProps !\nExample: ViewComponent={require('react-native-linear-gradient')}",
      );
    }
  });

  const handleOnPress = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (evt: any) => {
      if (!loading && !disabled) {
        onPress(evt);
      }
    },
    [loading, onPress, disabled],
  );

  // TODO: Refactor to Pressable
  const TouchableComponentInternal =
    TouchableComponent ||
    Platform.select({
      android: linearGradientProps ? TouchableOpacity : TouchableNativeFeedback,
      default: TouchableOpacity,
    });

  const titleStyle: StyleProp<TextStyle> = useMemo(
    () =>
      StyleSheet.flatten([
        {
          color:
            type === 'solid' ? theme.colors.white : theme.colors.buttonText,
        },
        uppercase && { textTransform: 'uppercase' },
        s.title,
        passedTitleStyle,
        disabled && {
          color: theme.colors.disabled,
        },
        disabled && disabledTitleStyle,
      ]),
    [
      disabled,
      disabledTitleStyle,
      passedTitleStyle,
      theme?.colors?.disabled,
      theme?.colors?.primary,
      type,
      uppercase,
    ],
  );

  const background =
    Platform.OS === 'android' && Platform.Version >= 21
      ? TouchableNativeFeedback.Ripple(
          titleStyle.color || theme.colors.buttonText,
          false,
        )
      : undefined;

  const loadingProps: ActivityIndicatorProps = useMemo(
    () => ({
      ...defaultLoadingProps(type, theme),
      ...passedLoadingProps,
    }),
    [passedLoadingProps, theme, type],
  );

  return (
    <View
      style={[
        s.container,
        s.border,
        radius ? { borderRadius: radius } : {},
        containerStyle,
        raised && !disabled && type !== 'clear' && s.raised,
      ]}>
      <TouchableComponentInternal
        onPress={handleOnPress}
        delayPressIn={0}
        activeOpacity={0.3}
        disabled={disabled}
        background={background}
        {...rest}>
        <ViewComponent
          {...linearGradientProps}
          style={StyleSheet.flatten([
            s.button,
            s.border,
            radius ? { borderRadius: radius } : {},
            {
              padding: theme.spacing[size],
              paddingHorizontal: theme.spacing[size] + 2,
              // Flex direction based on iconPosition. If iconRight is true, default to right.
              flexDirection:
                positionStyle[iconRight ? 'right' : iconPosition] || 'row',
              backgroundColor:
                type === 'solid'
                  ? theme.colors.button || buttonColor || theme?.colors?.primary
                  : 'transparent',
              borderColor: theme?.colors?.primary,
              borderWidth: type === 'outline' ? StyleSheet.hairlineWidth : 0,
            },
            buttonStyle,
            disabled &&
              type === 'solid' && {
                backgroundColor: theme?.colors?.disabled,
              },
            disabled &&
              type === 'outline' && {
                borderColor: theme.colors.disabled,
              },
            disabled && disabledStyle,
          ])}>
          {/* Activity Indicator on loading */}
          {loading && (
            <ActivityIndicator
              style={StyleSheet.flatten([s.loading, loadingStyle])}
              color={loadingProps.color}
              size={loadingProps.size}
              {...loadingProps}
            />
          )}
          {/* Button Icon, hide Icon while loading */}
          {!loading &&
            // icon &&
            icon && (
              <View style={[s.iconContainer, iconContainerStyle]}>{icon}</View>
            )}
          {/* Title for Button, hide while loading */}
          {!loading &&
            React.Children.toArray(children).map((child, index) => (
              <React.Fragment key={index}>
                {typeof child === 'string' ? (
                  <Text style={titleStyle} {...titleProps}>
                    {child}
                  </Text>
                ) : (
                  child
                )}
              </React.Fragment>
            ))}
        </ViewComponent>
      </TouchableComponentInternal>
    </View>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  border: {
    borderRadius: 10,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 15,
  },
  container: {
    overflow: 'hidden',
  },
  iconContainer: {
    marginHorizontal: 5,
  },
  loading: {
    marginVertical: 2,
  },
  raised: {
    backgroundColor: theme.colors.white,
    overflow: 'visible',
    ...theme.styles.shadow,
  },
  title: {
    ...theme.styles.textNormal,
    textAlign: 'center',
    paddingVertical: 1,
  },
}));

export { ButtonBase };
