import { ThemeManager, useTheme } from '../theme';
import React from 'react';
import { CheckBox } from '../CheckBox';
import { Check } from 'lucide-react-native';
import { ListItem } from './ListItem';

interface ListItemCheckBox extends ListItem {
  disabled?: boolean;
  checked: boolean;
  checkedIcon?: JSX.Element;
  onChange: (value: boolean) => void;
  uncheckedIcon?: JSX.Element;
}

const ListItemCheckBox = (props: ListItemCheckBox) => {
  const { checkedIcon, checked, disabled, onChange, uncheckedIcon, ...rest } =
    props;

  const theme = useTheme();
  const s = useStyles();

  return (
    <ListItem
      rightContent={
        <CheckBox
          center
          checked={checked}
          checkedIcon={
            checkedIcon ? (
              checkedIcon
            ) : (
              <Check color={theme.colors.listItemIcon} />
            )
          }
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

const useStyles = ThemeManager.createStyleSheet(() => ({
  checkbox: {
    right: 0,
  },
}));

export { ListItemCheckBox };
