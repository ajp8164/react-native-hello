import {
  type LayoutChangeEvent,
  Text,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { ThemeManager } from './theme';
import React, { useState, type ReactNode } from 'react';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import MaskedNumberInput from './MaskedNumberInput';
import {
  MaskedTextInput,
  type MaskedTextInputProps,
  type MaskedTextInputRef,
} from 'react-native-advanced-input-mask';
import type { FakeCurrencyInputProps } from 'react-native-currency-input';
import { TextInput as RNGHTextInput } from 'react-native-gesture-handler';

export type InputMethods = TextInput & RNGHTextInput & MaskedTextInputRef;

const defaultHeight = 48;

interface Input
  extends Omit<
    TextInputProps & MaskedTextInputProps & FakeCurrencyInputProps,
    'mask' | 'onChangeText' | 'value'
  > {
  errorMessage?: string;
  infoMessage?: string;
  insideModal?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  label?: string;
  mask?: string; // Adheres to format described by react-native-advanced-input-mask
  messageStyle?: TextStyle | TextStyle[];
  inputContainerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle;
  onChangeText: (formatted: string, unformatted: string) => void;
  rtlNumber?: boolean;
  value: string;
  ComponentRight?: ReactNode;
}

const Input = React.forwardRef<InputMethods, Input>(
  (
    {
      errorMessage,
      infoMessage,
      insideModal,
      containerStyle,
      label,
      mask,
      messageStyle,
      inputContainerStyle,
      inputStyle,
      onChangeText,
      rtlNumber,
      value,
      ...rest
    }: Input,
    ref,
  ) => {
    const s = useStyles();

    const [messageHeight, setMessageHeight] = useState<number | undefined>();

    const onLayoutMessage = (event: LayoutChangeEvent) => {
      setMessageHeight(event.nativeEvent.layout.height);
    };

    const TextInputComponent = insideModal ? BottomSheetTextInput : TextInput;

    // Set a height if not specified.
    inputStyle = { height: defaultHeight, ...inputStyle };

    let _label = label;
    if (!value) {
      _label = undefined;
    }

    return (
      <View style={containerStyle}>
        <View
          style={[
            s.inputContainer,
            { height: inputStyle.height },
            inputContainerStyle,
          ]}>
          {mask && rtlNumber ? (
            <MaskedNumberInput
              ref={ref}
              {...rest}
              style={{ ...s.textInput, ...inputStyle }}
              mask={mask}
              value={value}
              onChangeText={onChangeText}
            />
          ) : mask && !rtlNumber ? (
            <MaskedTextInput
              ref={ref}
              {...rest}
              style={{ ...s.textInput, ...inputStyle }}
              mask={mask}
              value={value}
              onChangeText={onChangeText}
            />
          ) : (
            <TextInputComponent
              ref={ref}
              {...rest}
              style={{ ...s.textInput, ...inputStyle }}
              value={value}
              onChangeText={text => onChangeText(text, text)}
            />
          )}
          {_label && (
            <Animated.View
              style={[
                s.labelContainer,
                { backgroundColor: inputStyle.backgroundColor },
              ]}
              entering={FadeInDown}
              exiting={FadeOut}>
              <Text style={s.label}>{_label}</Text>
            </Animated.View>
          )}
        </View>
        {(errorMessage || infoMessage) && (
          <Text
            style={[
              s.message,
              errorMessage ? s.error : {},
              { height: messageHeight },
              messageStyle,
            ]}
            onLayout={onLayoutMessage}>
            {errorMessage || infoMessage || ''}
          </Text>
        )}
      </View>
    );
  },
);

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  error: {
    color: theme.colors.assertive,
  },
  label: {
    ...theme.text.small,
    ...theme.styles.textDim,
  },
  labelContainer: {
    position: 'absolute',
    top: -theme.lineHeight.small / 2,
    left: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  message: {
    ...theme.text.small,
    height: theme.lineHeight.small,
    marginTop: 5,
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 6,
  },
  inputContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    ...theme.text.normal,
    lineHeight: undefined, // Prevent text wrap
    width: '100%',
    backgroundColor: theme.colors.listItem,
    borderRadius: 10,
    paddingHorizontal: 14,
  },
}));

export { Input };
