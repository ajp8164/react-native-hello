import { Text, View } from 'react-native';
import type { ToastConfigParams } from 'react-native-toast-message';
import React from 'react';
import { type AppTheme, useTheme } from '../theme';
import { makeStyles } from '@rneui/themed';

export const useToastConfig = () => {
  const theme = useTheme();
  const s = useStyles(theme);

  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    networkConnection: ({ text1, text2 }: ToastConfigParams<any>) => (
      <View style={s.container}>
        <Text style={theme.styles.textNormal}>{text1}</Text>
        <Text style={theme.styles.textTiny}>{text2}</Text>
      </View>
    ),
  };
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  container: {
    width: '95%',
    height: 60,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: theme.colors.blackTransparentMid,
  },
}));
