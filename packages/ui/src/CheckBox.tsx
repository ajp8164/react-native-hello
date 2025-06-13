import { type AppTheme, useTheme } from './theme';
import { makeStyles } from '@rn-vui/themed';
import { type GestureResponderEvent, type ViewStyle } from 'react-native';
import React from 'react';
import { CheckBox as RNECheckBox, type CheckBoxProps as RNECheckBoxProps } from '@rn-vui/base';
import { Square, SquareCheckBig } from 'lucide-react-native';

export interface CheckBoxProps extends Omit<RNECheckBoxProps, 'children'> {
  checked: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  onPress: (event: GestureResponderEvent) => void;
}

const CheckBox = ({ checked, containerStyle, onPress, ...rest }: CheckBoxProps) => {
  const theme = useTheme();
  const s = useStyles(theme);

  return (
    <RNECheckBox
      center
      checked={checked}
      checkedIcon={<SquareCheckBig color={theme.colors.listItemIcon} />}
      uncheckedIcon={<Square color={theme.colors.listItemIcon} />}
      checkedColor={theme.colors.checkboxActive}
      uncheckedColor={theme.colors.checkboxInactive}
      containerStyle={[s.checkbox, containerStyle]}
      onPress={onPress}
      {...rest}
    />
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  check: {
    top: 3,
    textAlign: 'center',
    height: 24,
  },
  checkbox: {
    padding: 0,
    margin: 0,
    marginLeft: 0,
    backgroundColor: theme.colors.transparent,
  },
  checked: {
    borderRadius: 6,
    backgroundColor: theme.colors.checkboxActive,
    width: 24,
    height: 24,
  },
  unchecked: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: theme.colors.checkboxInactive,
    width: 24,
    height: 24,
  },
}));

export default CheckBox;
