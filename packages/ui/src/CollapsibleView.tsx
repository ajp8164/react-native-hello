import React, { type ReactNode } from 'react';
import { type ViewStyle } from 'react-native';
import RNCollapsible from 'react-native-collapsible';
import { type AppTheme, useTheme } from './theme';
import { makeStyles } from '@rn-vui/themed';

interface Props {
  children: ReactNode | ReactNode[];
  duration?: number;
  expanded?: boolean;
  style?: ViewStyle;
}

const CollapsibleView = (props: Props) => {
  const { children, duration, expanded = true, style } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  return (
    <RNCollapsible
      collapsed={!expanded}
      style={{ ...s.collapsible, ...style }}
      duration={duration}>
      {children}
    </RNCollapsible>
  );
};

const useStyles = makeStyles((_theme, __theme: AppTheme) => ({
  collapsible: {
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    borderWidth: 0,
    overflow: 'hidden',
  },
}));

export { CollapsibleView };
