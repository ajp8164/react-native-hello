import { ThemeManager, useTheme } from './theme';
import { TextInput } from 'react-native';

import React, { useEffect, useState } from 'react';
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
  const s = useStyles();

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

  // Convert a formatted string to a number.
  // If the string is empty or '0' then return null.
  // A null value forces display of the input placeholder.
  function toInternalValue(value: string) {
    const parsed = parseFloat(
      value
        .replace(separator || '.', '.')
        .replace(/[^\d.]/g, '')
        .replace(/^0+/, ''),
    );
    return parsed === 0 || isNaN(parsed) ? null : parsed;
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
        // Formatted string is the internal value matching the mask; 1.23 numeric value -> '$1.23'.
        // Unformatted string is a parsable string numeric; '$1.23' -> '1.23'.
        // Unformatted zero is returned as an empty string.
        if (formatted !== value) {
          const unformatted = internalValue
            ? internalValue.toFixed(precision)
            : '';
          onChangeText(formatted, unformatted);
        }
      }}
      {...rest}
    />
  );
});

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  caret: {
    color: theme.colors.text,
    left: -5,
    top: 2,
  },
}));

export default MaskedNumberInput;
