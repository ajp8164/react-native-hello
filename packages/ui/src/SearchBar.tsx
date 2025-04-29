import React, { useImperativeHandle, useRef, useState } from 'react';
import { type AppTheme, useTheme } from './theme';
import { makeStyles } from '@rneui/themed';
import { SearchBar as RNESearchBar } from '@rneui/base';
import { Search } from 'lucide-react-native';
import { type ViewStyle } from 'react-native';

export interface SearchBarProps {
  containerStyle?: ViewStyle | ViewStyle[];
  onChangeText: (text: string) => void;
}

export interface SearchBarMethods {
  blur: () => void;
  cancel: () => void;
  clear: () => void;
  focus: () => void;
  render: () => void;
}

const SearchBar = React.forwardRef<SearchBarMethods, SearchBarProps>((props, ref) => {
  const { containerStyle, onChangeText } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const [search, setSearch] = useState('');
  const innerRef = useRef<RNESearchBar>(null);

  useImperativeHandle(ref, () => ({
    // These functions exposed to the parent component through the ref.
    blur: () => innerRef.current?.blur(),
    clear: () => innerRef.current?.clear(),
    cancel: () => innerRef.current?.cancel(),
    focus: () => innerRef.current?.focus(),
    render: () => innerRef.current?.render(),
  }));

  const onChange = (text?: string) => {
    setSearch(text ? text : '');
    onChangeText(text ? text : '');
  };

  return (
    <RNESearchBar
      // @ts-expect-error ref not typed
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
});

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

export default SearchBar;
