import { type AppTheme, useTheme } from './theme';
import { type TextStyle, View, type ViewStyle } from 'react-native';

import { Divider as RNEDivider } from '@rn-vui/base';
import React from 'react';
import { makeStyles } from '@rn-vui/themed';

export interface DividerProps {
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
}: DividerProps) => {
  const theme = useTheme();
  const s = useStyles(theme);

  return (
    <RNEDivider
      subHeader={text}
      subHeaderStyle={[s.subheader, note ? s.note : {}, light ? s.light : {}, subHeaderStyle]}
      color={color || s.color.color}
      orientation={orientation}
      style={[!!width && { marginBottom: 20 }, s.style, style]}
      width={width}
      children={<View style={s.children}>{rightComponent}</View>}
    />
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  children: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  color: {
    color: theme.colors.divider,
  },
  light: {
    color: theme.colors.textLight,
  },
  note: {
    ...theme.styles.textNormal,
    textTransform: 'none',
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: 15,
    marginTop: -15,
  },
  subheader: {
    ...theme.styles.textNormal,
    ...theme.styles.textBold,
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
