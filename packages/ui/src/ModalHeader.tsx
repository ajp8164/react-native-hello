import { makeStyles } from '@rn-vui/themed';
import { Button } from './Button';

import React, { type ReactElement } from 'react';
import { Text, View } from 'react-native';
import { type AppTheme, useTheme } from './theme';

interface ModalHeader {
  buttonLeftDisabled?: boolean;
  buttonLeftLabel?: string | ReactElement;
  buttonLeftVisible?: boolean;
  buttonRightDisabled?: boolean;
  buttonRightLabel?: string | ReactElement;
  buttonRightVisible?: boolean;
  onButtonLeftPress?: () => void;
  onButtonRightPress?: () => void;
  title?: string;
}

const ModalHeader = (props: ModalHeader) => {
  const {
    buttonLeftDisabled,
    buttonLeftVisible = true,
    buttonLeftLabel,
    buttonRightDisabled,
    buttonRightVisible = true,
    buttonRightLabel,
    onButtonLeftPress,
    onButtonRightPress,
    title,
  } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const buttonLeftIsElement = React.isValidElement(buttonLeftLabel);
  const buttonRightIsElement = React.isValidElement(buttonRightLabel);

  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      {buttonLeftVisible && (
        <Button
          title={buttonLeftIsElement ? undefined : (buttonLeftLabel as string)}
          icon={
            buttonLeftIsElement ? (buttonLeftLabel as ReactElement) : undefined
          }
          titleStyle={theme.styles.buttonScreenHeaderTitle}
          buttonStyle={s.buttonLeft}
          disabledStyle={s.buttonLeft}
          disabled={buttonLeftDisabled}
          onPress={() => onButtonLeftPress && onButtonLeftPress()}
        />
      )}
      {buttonRightVisible && (
        <Button
          title={
            buttonRightIsElement ? undefined : (buttonRightLabel as string)
          }
          icon={
            buttonRightIsElement
              ? (buttonRightLabel as ReactElement)
              : undefined
          }
          titleStyle={theme.styles.buttonScreenHeaderTitle}
          buttonStyle={s.buttonRight}
          disabledStyle={s.buttonRight}
          containerStyle={s.buttonRightContainer}
          disabled={buttonRightDisabled}
          onPress={() => onButtonRightPress && onButtonRightPress()}
        />
      )}
    </View>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  buttonLeft: {
    ...theme.styles.buttonScreenHeader,
    width: 'auto',
    marginHorizontal: 15,
    zIndex: 10,
  },
  buttonRight: {
    ...theme.styles.buttonScreenHeader,
    width: 'auto',
    marginHorizontal: 15,
  },
  buttonRightContainer: {
    position: 'absolute',
    right: 0,
  },
  container: {
    height: 40,
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: theme.colors.listItemBorder,
    backgroundColor: theme.colors.screenHeaderBackground,
  },
  title: {
    ...theme.styles.textLarge,
    fontWeight: '500',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    flex: 1,
  },
}));

export { ModalHeader };
