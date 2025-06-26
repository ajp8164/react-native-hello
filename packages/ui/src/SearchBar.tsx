import React, { useImperativeHandle, useRef, useState } from 'react';
import { type AppTheme, useTheme } from './theme';
import { makeStyles } from '@rn-vui/themed';
import { SearchBar as RNESearchBar } from '@rn-vui/base';
import { Search } from 'lucide-react-native';
import { type ViewStyle } from 'react-native';
import type { SearchBarRef } from '@rn-vui/base/dist/SearchBar/SearchBar';

interface SearchBar {
  containerStyle?: ViewStyle | ViewStyle[];
  onChangeText: (text: string) => void;
}

export interface SearchBarMethods {
  blur: () => void;
  cancel: () => void;
  clear: () => void;
  focus: () => void;
}

const SearchBar = React.forwardRef<SearchBarMethods, SearchBar>(
  (props, ref) => {
    const { containerStyle, onChangeText } = props;

    const theme = useTheme();
    const s = useStyles(theme);

    const [search, setSearch] = useState('');
    const innerRef = useRef<SearchBarRef>(null);

    useImperativeHandle(ref, () => ({
      // These functions exposed to the parent component through the ref.
      blur: () => innerRef.current?.blur(),
      clear: () => innerRef.current?.clear(),
      cancel: () => innerRef.current?.cancel(),
      focus: () => innerRef.current?.focus(),
    }));

    const onChange = (text?: string) => {
      setSearch(text ? text : '');
      onChangeText(text ? text : '');
    };

    return (
      <RNESearchBar
        ref={innerRef}
        platform={'ios'}
        placeholder={'Search transactions'}
        placeholderTextColor={theme.colors.textPlaceholder}
        searchIcon={<Search color={theme.colors.textPlaceholder} size={20} />}
        clearIcon={{ name: 'close-circle' }}
        containerStyle={[s.container, containerStyle]}
        inputContainerStyle={s.inputContainer}
        inputStyle={s.input}
        cancelButtonProps={{ buttonTextStyle: s.cancelButton }}
        value={search}
        onChangeText={text => onChange(text)}
        onCancel={() => onChange()}
        onClear={() => onChange()}
      />
    );
  },
);

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  cancelButton: {
    ...theme.styles.textNormal,
    color: theme.colors.button,
    marginRight: 10,
  },
  container: {
    paddingLeft: 7,
    paddingRight: 7,
    backgroundColor: theme.colors.transparent,
    minHeight: 50,
  },
  input: {
    ...theme.styles.textNormal,
    marginTop: -5,
  },
  inputContainer: {
    backgroundColor: theme.colors.listItem,
  },
}));

export { SearchBar };
