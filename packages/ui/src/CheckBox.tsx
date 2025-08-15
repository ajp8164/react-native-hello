import { ThemeManager, useTheme } from './theme';
import { type GestureResponderEvent, type ViewStyle } from 'react-native';
import React from 'react';
import {
  CheckBox as RNECheckBox,
  type CheckBoxProps as RNECheckBoxProps,
} from '@rn-vui/base';
import { Square, SquareCheckBig } from 'lucide-react-native';

interface CheckBox extends Omit<RNECheckBoxProps, 'children'> {
  checked: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  onPress: (event: GestureResponderEvent) => void;
}

const CheckBox = ({ checked, containerStyle, onPress, ...rest }: CheckBox) => {
  const theme = useTheme();
  const s = useStyles();

  return (
    <RNECheckBox
      center
      checked={checked}
      checkedIcon={<SquareCheckBig color={theme.colors.listItemIcon} />}
      uncheckedIcon={<Square color={theme.colors.listItemIcon} />}
      checkedColor={theme.colors.checkboxActive as string}
      uncheckedColor={theme.colors.checkboxInactive as string}
      containerStyle={[s.checkbox, containerStyle]}
      onPress={onPress}
      {...rest}
    />
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
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

export { CheckBox };
