import { ThemeManager } from './theme';
import { type TextStyle, View, type ViewStyle } from 'react-native';

import { Divider as RNEDivider } from '@rn-vui/base';
import React from 'react';
import { useTheme } from './theme';

interface Divider {
  color?: string;
  orientation?: 'vertical' | 'horizontal' | undefined;
  rightComponent?: JSX.Element | null;
  subHeaderStyle?: TextStyle;
  style?: ViewStyle;
  text?: string;
  note?: boolean;
  light?: boolean;
  width?: number;
}

const Divider = ({
  color,
  light,
  note,
  orientation,
  rightComponent = null,
  style,
  subHeaderStyle,
  text,
  width,
}: Divider) => {
  const theme = useTheme();
  const s = useStyles();

  return (
    <RNEDivider
      subHeader={text}
      subHeaderStyle={[
        s.subheader,
        note ? s.note : {},
        light ? s.light : {},
        subHeaderStyle,
      ]}
      color={color || theme.colors.lightGray}
      orientation={orientation}
      style={[!!width && { marginBottom: 20 }, s.style, style]}
      width={width}
      children={<View style={s.children}>{rightComponent}</View>}
    />
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  children: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  light: {
    ...theme.styles.textDim,
  },
  note: {
    ...theme.text.normal,
    textTransform: 'none',
    lineHeight: 20,
    marginBottom: 15,
    marginTop: -15,
  },
  subheader: {
    ...theme.text.normal,
    fontFamily: theme.fonts.bold,
    textTransform: 'uppercase',
    marginBottom: 10,
    marginHorizontal: 5,
  },
  style: {
    borderBottomWidth: 0,
    marginTop: 25,
  },
}));

export { Divider };
