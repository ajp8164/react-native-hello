import { useTheme } from './theme';
import {
  type GestureResponderEvent,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import React from 'react';
import { ButtonBase } from './ButtonBase';

interface Button
  extends Omit<ButtonBase, 'buttonStyle' | 'disabledStyle' | 'titleStyle'> {
  buttonStyle?: ViewStyle;
  clear?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  disabledStyle?: ViewStyle | ViewStyle[];
  loading?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  outline?: boolean;
  small?: boolean;
  title?: string;
  titleStyle?: TextStyle;
}

const Button = (props: Button) => {
  const {
    buttonStyle,
    containerStyle,
    disabled,
    disabledStyle,
    loading,
    onPress,
    outline,
    small,
    title,
    titleStyle,
    ...rest
  } = props;

  const theme = useTheme();

  return (
    <ButtonBase
      title={title}
      titleStyle={[
        theme.styles.buttonTitle,
        outline ? theme.styles.buttonOutlineTitle : {},
        small
          ? outline
            ? [theme.styles.buttonSmallTitle, { color: theme.colors.button }]
            : theme.styles.buttonSmallTitle
          : {},
        titleStyle,
      ]}
      buttonStyle={[
        theme.styles.button,
        outline ? theme.styles.buttonOutline : {},
        small ? theme.styles.buttonSmall : {},
        buttonStyle,
      ]}
      disabledTitleStyle={[
        theme.styles.buttonTitle,
        outline ? theme.styles.buttonOutlineTitle : {},
        titleStyle,
      ]}
      disabledStyle={[
        theme.styles.button,
        outline ? theme.styles.buttonOutline : {},
        theme.styles.buttonDisabled,
        disabledStyle,
      ]}
      containerStyle={[
        small ? theme.styles.buttonSmallContainer : {},
        containerStyle,
      ]}
      disabled={disabled}
      loadingProps={{
        color: outline ? theme.colors.button : theme.colors.stickyWhite,
      }}
      loading={loading}
      onPress={onPress}
      {...rest}
    />
  );
};

export { Button };
