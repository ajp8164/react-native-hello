import { ThemeManager, useTheme } from '../theme';
import { ActivityIndicator, Text, View } from 'react-native';
import type { ToastConfigParams } from 'react-native-toast-message';
import React from 'react';
import { CircleAlert, ThumbsUp, Wifi } from 'lucide-react-native';

export const useAppToastConfig = () => {
  const theme = useTheme();
  const s = useStyles();

  return {
    activity: ({ text1 }: ToastConfigParams<string>) => (
      <View style={[s.container]}>
        <ActivityIndicator color={theme.colors.textInv} size={'small'} />
        <Text style={s.text}>{text1}</Text>
      </View>
    ),
    error: ({ text1 }: ToastConfigParams<string>) => (
      <View style={[s.container, s.errorContainer]}>
        <CircleAlert color={theme.colors.textInv} size={20} />
        <Text style={s.text}>{text1}</Text>
      </View>
    ),
    networkConnection: ({ text1 }: ToastConfigParams<string>) => (
      <View style={[s.container, s.warningContainer]}>
        <Wifi color={theme.colors.buttonText} size={20} />
        <Text style={s.text}>{text1}</Text>
      </View>
    ),
    success: ({ text1 }: ToastConfigParams<string>) => (
      <View style={[s.container, s.successContainer]}>
        <ThumbsUp color={theme.colors.textInv} size={20} />
        <Text style={s.text}>{text1}</Text>
      </View>
    ),
  };
};

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  container: {
    width: '60%',
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.styles.button.borderRadius,
    backgroundColor: theme.colors.lightGray,
    flexDirection: 'row',
  },
  errorContainer: {
    backgroundColor: theme.colors.assertive,
  },
  successContainer: {
    backgroundColor: theme.colors.success,
  },
  warningContainer: {
    backgroundColor: theme.colors.warning,
  },
  text: {
    ...theme.text.small,
    color: theme.colors.textInv,
    marginLeft: 7,
  },
}));
