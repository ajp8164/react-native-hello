import { type AppTheme, useTheme } from './theme';
import React from 'react';
import ListItem, { type ListItemProps } from './ListItem';
import { makeStyles } from '@rneui/themed';
import { AppleStyleSwipeableRow, type SwipeableAction } from './swipeableRow/apple';

export interface ListItemSwipeableProps extends ListItemProps {
  buttonWidth?: number;
  swipeableActionsLeft?: SwipeableAction[];
  swipeableActionsRight?: SwipeableAction[];
}

const ListItemSwipeable = (props: ListItemSwipeableProps) => {
  const { buttonWidth = 70, swipeableActionsLeft, swipeableActionsRight, ...rest } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  return (
    <AppleStyleSwipeableRow
      containerStyle={[
        rest.position?.includes('first') ? s.first : {},
        rest.position?.includes('last') ? s.last : {},
        rest.focus ? s.focus : {},
        rest.ghost ? s.ghost : {},
      ]}
      buttonWidth={buttonWidth}
      leftActions={swipeableActionsLeft}
      rightActions={swipeableActionsRight}>
      <ListItem
        {...rest}
        containerStyle={{
          ...rest.containerStyle,
          ...s.noBorderRadius,
        }}
      />
    </AppleStyleSwipeableRow>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  first: {
    borderTopLeftRadius: theme.styles.button.borderRadius,
    borderTopRightRadius: theme.styles.button.borderRadius,
  },
  focus: {
    borderColor: theme.colors.listItemIcon,
    borderWidth: 1,
  },
  ghost: {
    borderColor: theme.colors.lightGray,
    borderWidth: 1,
    borderStyle: 'dashed',
    overflow: 'visible',
  },
  last: {
    borderBottomLeftRadius: theme.styles.button.borderRadius,
    borderBottomEndRadius: theme.styles.button.borderRadius,
  },
  noBorderRadius: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export default ListItemSwipeable;
