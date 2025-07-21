import { type AppTheme, useTheme } from '../theme';
import React from 'react';
import { Text, type TextStyle, View } from 'react-native';

import { makeStyles } from '@rn-vui/themed';
import { ListItem } from './ListItem';
import { Input, type InputRef } from '../Input';

export type ListItemInputRef = InputRef;

interface ListItemInput extends ListItem {
  container?: 'left' | 'main' | 'right';
  error?: boolean;
  errorMessage?: string;
  inputProps: Input;
  title?: string;
  units?: string;
  unitsStyle?: TextStyle;
}

const ListItemInput = React.forwardRef<ListItemInputRef, ListItemInput>(
  (props, ref) => {
    const {
      container = 'main',
      error,
      errorMessage = 'Required field',
      inputProps,
      title,
      units,
      unitsStyle,
      ...rest
    } = props;

    const theme = useTheme();
    const s = useStyles(theme);

    const Content = (
      <View style={s.row}>
        <Input
          ref={ref}
          containerStyle={s.container}
          placeholderTextColor={theme.colors.textPlaceholder}
          selectionColor={theme.colors.text}
          keyboardAppearance={theme.mode}
          allowFontScaling={false}
          inputStyle={{
            backgroundColor: theme.colors.transparent,
            ...(container === 'right' ? { textAlign: 'right' } : {}),
          }}
          messageStyle={{
            ...(container === 'right' ? { alignSelf: 'flex-end' } : {}),
          }}
          {...inputProps}
          inputContainerStyle={[
            container === 'left' ? s.leftContainer : {},
            container === 'right' ? s.rightContainer : {},
            container === 'main' ? s.mainContainer : {},
            Array.isArray(inputProps.inputContainerStyle)
              ? Object.assign({}, ...inputProps.inputContainerStyle)
              : inputProps.inputContainerStyle || {},
          ]}
        />
        {units && <Text style={[s.units, unitsStyle]}>{units}</Text>}
        {inputProps.ComponentRight}
      </View>
    );

    const Error = <Text style={s.error}>{errorMessage}</Text>;

    return (
      <>
        <ListItem
          title={title}
          {...rest}
          leftContent={container === 'left' ? Content : undefined}
          rightContent={container === 'right' ? Content : undefined}
          mainContent={container === 'main' ? Content : undefined}
          mainContentStyle={s.main}
          footerContent={error ? Error : undefined}
        />
      </>
    );
  },
);

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  container: {
    flex: 1,
  },
  error: {
    ...theme.styles.textSmall,
    color: theme.colors.assertive,
    position: 'absolute',
    left: 15,
    bottom: 0,
  },
  leftContainer: {
    width: 100,
  },
  main: {
    marginHorizontal: 10,
    paddingRight: 5,
  },
  mainContainer: {},
  rightContainer: {
    width: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  units: {
    ...theme.styles.textNormal,
    ...theme.styles.textDim,
    marginRight: 7,
  },
}));

export { ListItemInput };
