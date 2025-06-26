import { useTheme } from '../theme';
import React from 'react';
import { ListItem } from './ListItem';
import { Switch } from '@rn-vui/base';

interface ListItemSwitch extends Omit<ListItem, 'value'> {
  disabled?: boolean;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const ListItemSwitch = (props: ListItemSwitch) => {
  const { disabled, value, onValueChange, ...rest } = props;

  const theme = useTheme();

  return (
    <ListItem
      rightContent={
        <Switch
          disabled={disabled}
          value={value}
          onValueChange={onValueChange}
          thumbColor={
            value ? theme.colors.switchOnThumb : theme.colors.switchOffThumb
          }
          ios_backgroundColor={theme.colors.switchOffTrack}
          trackColor={{
            false: theme.colors.switchOffTrack,
            true: theme.colors.switchOnTrack,
          }}
        />
      }
      {...rest}
    />
  );
};

export { ListItemSwitch };
