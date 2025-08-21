import { type IDevice as IMKDevice } from 'react-native-theme-mk';
import { ThemeManager, type IDevice } from '.';
import { Platform } from 'react-native';
import { useContext } from 'react';
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { HeaderHeightContext } from '@react-navigation/elements';

export const useDevice = (): IDevice => {
  const bottomTabBarHeight = useContext(BottomTabBarHeightContext);
  const headerHeight = useContext(HeaderHeightContext);

  const device: IMKDevice = ThemeManager.useDevice();

  return {
    ...device,
    bottomTabBarHeight: bottomTabBarHeight || 83,
    headerBar: {
      height: headerHeight || 44,
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
