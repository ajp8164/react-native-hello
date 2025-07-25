import {
  CollapsibleView,
  ListItemSwitch as _ListItemSwitch,
} from '@react-native-hello/ui';
import React from 'react';

interface ListItemSwitchCollapsible extends _ListItemSwitch {
  children?: React.ReactElement;
  expanded?: boolean;
}

const ListItemSwitchCollapsible = (props: ListItemSwitchCollapsible) => {
  const { children, expanded = true, ...rest } = props;

  const first = rest.position?.includes('first') ? 'first' : undefined;

  return (
    <>
      <_ListItemSwitch
        {...rest}
        position={expanded ? [first] : rest.position}
      />
      <CollapsibleView expanded={expanded}>{children}</CollapsibleView>
    </>
  );
};

export { ListItemSwitchCollapsible };
