import { type LayoutChangeEvent, Text, TextInput, type TextStyle, View, type ViewStyle } from 'react-native';
import MaskInput, { type MaskInputProps } from 'react-native-mask-input';
import { type AppTheme, fontFamily, fontSizes, useTheme } from './theme';
import { makeStyles } from '@rn-vui/themed';
import React, { useState } from 'react';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import Animated, { FadeInDown } from 'react-native-reanimated';
export { Masks } from './lib';

export interface InputProps extends Omit<MaskInputProps, 'style'> {
  errorMessage?: string;
  infoMessage?: string;
  insideModal?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  label?: string;
  messageStyle?: TextStyle | TextStyle[];
  inputStyle?: TextStyle | TextStyle[];
  style?: TextStyle | TextStyle[];
  // MaskedInput provides three arguments.
  onChangeText: (text1: string, text2: string, text3: string) => void;
}

const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      errorMessage,
      infoMessage,
      insideModal,
      containerStyle,
      label,
      messageStyle,
      inputStyle,
      style,
      onChangeText,
      ...rest
    }: InputProps,
    ref,
  ) => {
    const theme = useTheme();
    const s = useStyles(theme);

    const [messageHeight, setMessageHeight] = useState<number | undefined>();

    const onLayoutMessage = (event: LayoutChangeEvent) => {
      setMessageHeight(event.nativeEvent.layout.height);
    };

    let _label = label;
    if (!rest.value) {
      _label = undefined;
    }

    return (
      <View style={containerStyle}>
        {insideModal === true ? (
          <BottomSheetTextInput
            style={[s.textInput, style]}
            onChangeText={text => onChangeText(text, '', '')}
            {...rest}
          />
        ) : (
          <View style={[s.style, style]}>
            <MaskInput
              ref={ref}
              style={[s.textInput, inputStyle, _label ? { paddingTop: 15 } : null]}
              onChangeText={onChangeText}
              {...rest}
            />
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
    color: theme.colors.textLight,
  },
  labelContainer: {
    position: 'absolute',
    top: 3,
    left: 12,
  },
  message: {
    ...theme.styles.textSmall,
    height: 17, // Needs to change if font size changes
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  style: {},
  textInput: {
    width: '100%',
    height: 48,
    backgroundColor: theme.colors.listItem,
    borderRadius: theme.styles.button.borderRadius,
    paddingHorizontal: 12,
    color: theme.colors.text,
    fontSize: fontSizes.normal,
    fontFamily,
    fontWeight: '500',
  },
}));

export default Input;
