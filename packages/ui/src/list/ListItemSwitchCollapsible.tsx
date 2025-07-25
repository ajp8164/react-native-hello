import { ListItemSwitch } from '.';
import React from 'react';
import { CollapsibleView } from '../CollapsibleView';

interface ListItemSwitchCollapsible extends ListItemSwitch {
  children?: React.ReactElement;
  expanded?: boolean;
}

const ListItemSwitchCollapsible = (props: ListItemSwitchCollapsible) => {
  const { children, expanded = true, ...rest } = props;

  const first = rest.position?.includes('first') ? 'first' : undefined;

  return (
    <>
      <ListItemSwitch {...rest} position={expanded ? [first] : rest.position} />
      <CollapsibleView expanded={expanded}>{children}</CollapsibleView>
    </>
  );
};

export { ListItemSwitchCollapsible };
