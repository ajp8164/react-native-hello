import { type AppTheme, useTheme } from './theme';
import { type ReactNode } from 'react';

import React from 'react';
import RNCollapsibleView from '@eliav2/react-native-collapsible-view';
import { makeStyles } from '@rneui/themed';

export interface CollapsibleViewProps {
  children: ReactNode | ReactNode[];
  duration?: number;
  expanded?: boolean;
  initExpanded?: boolean;
}

const CollapsibleView = (props: CollapsibleViewProps) => {
  const { children, duration, expanded = true, initExpanded = false } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  return (
    <RNCollapsibleView
      initExpanded={initExpanded}
      expanded={expanded}
      activeOpacityFeedback={1}
      style={s.collapsible}
      titleStyle={s.collapsibleTitle}
      noArrow
      duration={duration}>
      <>{children}</>
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
