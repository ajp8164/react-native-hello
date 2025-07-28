import {
  type LayoutChangeEvent,
  Text,
  TextInput,
  type TextInputProps,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { type AppTheme, useTheme } from './theme';
import { makeStyles } from '@rn-vui/themed';
import React, { useState, type ReactNode } from 'react';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import Animated, { FadeInDown } from 'react-native-reanimated';
import MaskedNumberInput from './MaskedNumberInput';
import {
  MaskedTextInput,
  type MaskedTextInputProps,
  type MaskedTextInputRef,
} from 'react-native-advanced-input-mask';
import type { FakeCurrencyInputProps } from 'react-native-currency-input';

export type InputMethods = TextInput & MaskedTextInputRef;

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
  inputStyle?: TextStyle | TextStyle[];
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
    const theme = useTheme();
    const s = useStyles(theme);

    const [messageHeight, setMessageHeight] = useState<number | undefined>();

    const onLayoutMessage = (event: LayoutChangeEvent) => {
      setMessageHeight(event.nativeEvent.layout.height);
    };

    let _label = label;
    if (!value) {
      _label = undefined;
    }

    return (
      <View style={containerStyle}>
        {insideModal === true ? (
          <BottomSheetTextInput
            style={[s.textInput, inputStyle]}
            onChangeText={text => onChangeText(text, text)}
            {...rest}
          />
        ) : (
          <View style={[s.inputContainer, inputContainerStyle]}>
            {mask && rtlNumber ? (
              <MaskedNumberInput
                ref={ref}
                {...rest}
                style={{
                  ...s.textInput,
                  ...inputStyle,
                  ...(_label ? { paddingTop: 20 } : null),
                }}
                mask={mask}
                value={value}
                onChangeText={onChangeText}
              />
            ) : mask && !rtlNumber ? (
              <MaskedTextInput
                ref={ref}
                {...rest}
                style={{
                  ...s.textInput,
                  ...inputStyle,
                  ...(_label ? { paddingTop: 20 } : null),
                }}
                mask={mask}
                value={value}
                onChangeText={onChangeText}
              />
            ) : (
              <TextInput
                ref={ref}
                {...rest}
                style={{
                  ...s.textInput,
                  ...inputStyle,
                  ...(_label ? { paddingTop: 20 } : null),
                }}
                value={value}
                onChangeText={text => onChangeText(text, text)}
              />
            )}
            {_label && (
              <Animated.View style={s.labelContainer} entering={FadeInDown}>
                <Text style={s.label}>{_label}</Text>
              </Animated.View>
            )}
          </View>
        )}
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

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  error: {
    color: theme.colors.assertive,
  },
  label: {
    ...theme.styles.textSmall,
    ...theme.styles.textDim,
  },
  labelContainer: {
    position: 'absolute',
    top: 0,
    left: 6,
  },
  message: {
    ...theme.styles.textSmall,
    height: 17, // Needs to change if font size changes
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
    flex: 1,
  },
  textInput: {
    ...theme.styles.textNormal,
    width: '100%',
    backgroundColor: theme.colors.listItem,
    borderRadius: 10, //theme.styles.button.borderRadius,
    paddingHorizontal: 6,
  },
}));

export { Input };
