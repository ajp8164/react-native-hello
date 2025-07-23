import { type AppTheme, useTheme } from './theme';
import { TextInput } from 'react-native';

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@rn-vui/themed';
import {
  FakeCurrencyInput,
  type FakeCurrencyInputProps,
} from 'react-native-currency-input';

// The mask string may adhere to the mask format described by react-native-advanced-input-mask.
// This allows calling components to use the same mask format regardless of the type of input component
// used to render the actual input.
// This implementation will strip []{} from the mask.

interface MaskedNumberInputInterface
  extends Omit<FakeCurrencyInputProps, 'onChangeText' | 'value'> {
  mask?: string;
  onChangeText: (fornatted: string, unformatted: string) => void;
  value: string;
}

export type MaskedNumberInputMethods = TextInput;

const MaskedNumberInput = React.forwardRef<
  MaskedNumberInputMethods,
  MaskedNumberInputInterface
>((props, ref) => {
  const { mask = '000.00', onChangeText, value, ...rest } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  // Parse the mask.
  // Capture a prefix and apply to the result.
  const prefix = mask.replace(/[[\]{}]/g, '').match(/^\D+/)?.[0] || '';
  const coreMask = mask.replace(prefix, '').replace(/[[\]{}]/g, '');

  // Strip unneeded characters from the mask.
  // Support mask having only 1 separator.
  const separator = coreMask?.match(/[^0-9]/)?.[0] || '';
  const precision = separator
    ? coreMask?.split(separator[0])[1].length || 0
    : 0;
  const maxValue = separator
    ? (Math.pow(10, coreMask.length - 1) - 1) / Math.pow(10, precision)
    : (Math.pow(10, coreMask.length) - 1) / Math.pow(10, precision);

  const [internalValue, setInternalValue] = useState<number | null>(
    toInternalValue(value),
  );

  // For form cancellation the original value is typically provided.
  useEffect(() => {
    setInternalValue(toInternalValue(value));
  }, [value]);

  function toInternalValue(value: string) {
    return value
      ? parseFloat(
          value
            .replace(separator, '.')
            .replace(/[^\d.]/g, '')
            .replace(/^0+/, ''),
        )
      : null;
  }

  return (
    <FakeCurrencyInput
      ref={ref}
      caretStyle={s.caret}
      prefix={prefix}
      delimiter={','}
      separator={separator}
      precision={precision}
      maxValue={maxValue}
      placeholder={rest.placeholder}
      placeholderTextColor={theme.colors.textPlaceholder}
      value={internalValue}
      onChangeValue={setInternalValue}
      onChangeText={formatted => {
        if (formatted !== value) {
          const unformatted =
            toInternalValue(formatted)?.toFixed(precision) || '';
          onChangeText(formatted, unformatted);
        }
      }}
      {...rest}
    />
  );
});

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  caret: {
    color: theme.colors.text,
    left: -5,
    top: 2,
  },
}));

export default MaskedNumberInput;
