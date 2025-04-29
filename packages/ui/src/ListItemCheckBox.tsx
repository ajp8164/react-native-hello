import { type AppTheme, useTheme } from './theme';
import React from 'react';
import ListItem, { type ListItemProps } from './ListItem';
import CheckBox from './CheckBox';
import { makeStyles } from '@rneui/themed';
import { Check } from 'lucide-react-native';

export interface ListItemCheckBoxProps extends ListItemProps {
  disabled?: boolean;
  checked: boolean;
  checkedIcon?: JSX.Element;
  onChange: (value: boolean) => void;
  uncheckedIcon?: JSX.Element;
}

const ListItemCheckBox = (props: ListItemCheckBoxProps) => {
  const { checkedIcon, checked, disabled, onChange, uncheckedIcon, ...rest } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  return (
    <ListItem
      rightContent={
        <CheckBox
          center
          checked={checked}
          checkedIcon={checkedIcon ? checkedIcon : <Check color={theme.colors.listItemIcon} />}
          uncheckedIcon={uncheckedIcon ? uncheckedIcon : <></>}
          checkedColor={theme.colors.checkboxActive}
          uncheckedColor={theme.colors.checkboxInactive}
          disabled={disabled}
          containerStyle={{ backgroundColor: theme.colors.transparent }}
          onPress={() => onChange(true)}
        />
      }
      rightContentStyle={s.checkbox}
      onPress={() => onChange(true)}
      {...rest}
    />
  );
};

const useStyles = makeStyles((_theme, __theme: AppTheme) => ({
  checkbox: {
    right: 0,
  },
}));

export default ListItemCheckBox;
