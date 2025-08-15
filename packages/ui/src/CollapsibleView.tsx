import React, { type ReactNode } from 'react';
import { type ViewStyle } from 'react-native';
import RNCollapsible from 'react-native-collapsible';
import { ThemeManager } from './theme';

interface Props {
  children: ReactNode | ReactNode[];
  duration?: number;
  expanded?: boolean;
  style?: ViewStyle;
}

const CollapsibleView = (props: Props) => {
  const { children, duration, expanded = true, style } = props;

  const s = useStyles();

  return (
    <RNCollapsible
      collapsed={!expanded}
      style={{ ...s.collapsible, ...style }}
      duration={duration}>
      {children}
    </RNCollapsible>
  );
};

const useStyles = ThemeManager.createStyleSheet(() => ({
  collapsible: {
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    borderWidth: 0,
    overflow: 'hidden',
  },
}));

export { CollapsibleView };
