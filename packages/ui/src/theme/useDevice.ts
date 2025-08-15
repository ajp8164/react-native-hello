import { type IDevice as IMKDevice } from 'react-native-theme-mk';
import { ThemeManager, type IDevice } from '.';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

export const useDevice = (): IDevice => {
  const bottomTabBarHeight = useBottomTabBarHeight();
  const data: IMKDevice = ThemeManager.useDevice();

  return {
    ...data,
    bottomTabBarHeight,
    headerBar: {
      height: 44,
    },
    headerBarLarge: Platform.select({
      android: {
        height: 0,
      },
      ios: {
        height: 96,
      },
      default: {
        height: 0,
      },
    }),
  };
};
