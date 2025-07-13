import React, { type ReactNode } from 'react';
import { type ViewStyle } from 'react-native';
import RNCollapsibleView from '@eliav2/react-native-collapsible-view';
import { type AppTheme, useTheme } from './theme';
import { makeStyles } from '@rn-vui/themed';

interface Props {
  children: ReactNode | ReactNode[];
  duration?: number;
  expanded?: boolean;
  initExpanded?: boolean;
  style?: ViewStyle;
}

const CollapsibleView = (props: Props) => {
  const {
    children,
    duration,
    expanded = true,
    initExpanded = false,
    style,
  } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  return (
    <RNCollapsibleView
      initExpanded={initExpanded}
      expanded={expanded}
      activeOpacityFeedback={1}
      style={{ ...s.collapsible, ...style }}
      titleStyle={s.collapsibleTitle}
      noArrow
      duration={duration}>
      {children}
    </RNCollapsibleView>
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
  collapsibleTitle: {
    height: 0,
  },
}));

export { CollapsibleView };
