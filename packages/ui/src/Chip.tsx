import { ThemeManager, useTheme } from './theme';

import { Text, View, type ViewStyle } from 'react-native';
import React from 'react';

interface Chip {
  color?: string;
  style?: ViewStyle | ViewStyle[];
  text?: string;
  textColor?: string;
  visible?: boolean;
}

const Chip = (props: Chip) => {
  const { color, style, text, textColor, visible = true } = props;

  const theme = useTheme();
  const s = useStyles();

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

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  text: {
    ...theme.text.small,
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
