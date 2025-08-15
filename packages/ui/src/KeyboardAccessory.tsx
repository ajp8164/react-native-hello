import { ThemeManager, useTheme } from './theme';
import { Button } from '.';
import {
  InputAccessoryView,
  Keyboard,
  Platform,
  TextInput,
  View,
  type TextStyle,
} from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react-native';

type AccessoryState = {
  fieldCount: number;
  focusedField: number;
  nextDisabled: boolean;
  previousDisabled: boolean;
};

interface KeyboardAccessory {
  disabledDone?: boolean;
  disabledTitleStyle?: TextStyle | TextStyle[];
  doneText?: string;
  // The fieldRefs array must be ordered the same as intended field navigation on the form.
  fieldRefs: (TextInput | null)[];
  id: string;
  onDone?: () => void;
}

export interface KeyboardAccessoryMethods {
  focusedField: (field: number) => void;
}

const KeyboardAccessory = forwardRef<
  KeyboardAccessoryMethods,
  KeyboardAccessory
>(
  (
    {
      disabledDone,
      disabledTitleStyle,
      doneText,
      fieldRefs,
      id,
      onDone,
    }: KeyboardAccessory,
    ref,
  ) => {
    // Only iOS.
    if (Platform.OS !== 'ios') return null;

    const theme = useTheme();
    const s = useStyles();

    useImperativeHandle(ref, () => ({
      //  These functions exposed to the parent component through the ref.
      focusedField,
    }));

    const [editorState, setEditorState] = useState<AccessoryState>({
      fieldCount: fieldRefs.length,
      focusedField: 0,
      nextDisabled: fieldRefs.length === 0,
      previousDisabled: true,
    });

    const focusedField = (field: number) => {
      const nextDisabled = field === fieldRefs.length - 1;
      const previousDisabled = field === 0;
      setEditorState(prevState => {
        return {
          ...prevState,
          focusedField: field,
          nextDisabled,
          previousDisabled,
        };
      });
    };

    const next = () => {
      if (editorState.focusedField === undefined) return;
      const nextField = editorState.focusedField + 1;
      const nextDisabled = nextField === fieldRefs.length - 1;
      const previousDisabled = nextField === 0;
      fieldRefs[nextField]?.focus();
      setEditorState(prevState => {
        return {
          ...prevState,
          focusedField: nextField,
          nextDisabled,
          previousDisabled,
        };
      });
    };

    const previous = () => {
      if (editorState.focusedField === undefined) return;
      const nextField = editorState.focusedField - 1;
      const nextDisabled = nextField === fieldRefs.length;
      const previousDisabled = nextField === 0;
      fieldRefs[nextField]?.focus();
      setEditorState(prevState => {
        return {
          ...prevState,
          nextField,
          nextDisabled,
          previousDisabled,
        };
      });
    };

    return (
      <InputAccessoryView nativeID={id}>
        <View style={s.container}>
          <Button
            type={'clear'}
            icon={
              <ChevronUp
                color={theme.colors.kbAccessoryButtonText}
                disabled={editorState.previousDisabled}
              />
            }
            disabled={editorState.previousDisabled}
            onPress={previous}
          />
          <Button
            type={'clear'}
            icon={
              <ChevronDown
                color={theme.colors.kbAccessoryButtonText}
                disabled={editorState.nextDisabled}
              />
            }
            disabled={editorState.nextDisabled}
            onPress={next}
          />
          <Button
            type={'clear'}
            title={doneText || 'Done'}
            containerStyle={s.doneContainer}
            titleStyle={s.doneTitle}
            disabled={disabledDone}
            disabledTitleStyle={[
              s.doneTitle,
              s.doneDisabled,
              disabledTitleStyle,
            ]}
            onPress={onDone || Keyboard.dismiss}
          />
        </View>
      </InputAccessoryView>
    );
  },
);

const useStyles = ThemeManager.createStyleSheet(({ theme, device }) => ({
  container: {
    flexDirection: 'row',
    height: 45,
    width: device.screen.width,
    backgroundColor: theme.colors.viewBackground,
    borderTopColor: theme.colors.lightGray,
  },
  doneContainer: {
    position: 'absolute',
    top: 3,
    right: 10,
  },
  doneDisabled: {
    opacity: 0.4,
  },
  doneTitle: {
    ...theme.text.normal,
    fontFamily: theme.fonts.bold,
    color: theme.colors.kbAccessoryButtonText,
  },
}));

export { KeyboardAccessory };
