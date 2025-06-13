import { type AppTheme, useTheme } from './theme';

import { type ColorValue, Text, View, type ViewStyle } from 'react-native';
import { makeStyles } from '@rn-vui/themed';
import React from 'react';

export interface ChipProps {
  color?: ColorValue;
  style?: ViewStyle | ViewStyle[];
  text?: string;
  textColor?: ColorValue;
  visible?: boolean;
}

const Chip = (props: ChipProps) => {
  const { color, style, text, textColor, visible = true } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  return (
    <View style={style}>
      <Text
        style={[
          s.text,
          visible
            ? {
                backgroundColor: color || theme.colors.lightGray,
                color: textColor || theme.colors.text,
              }
            : {},
        ]}
        allowFontScaling={true}>
        {text}
      </Text>
    </View>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  text: {
    ...theme.styles.textSmall,
    paddingHorizontal: 10,
    marginBottom: 6,
    marginTop: 5,
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 9,
    overflow: 'hidden',
  },
}));

export { Chip };
