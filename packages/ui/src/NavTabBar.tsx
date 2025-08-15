import { View } from 'react-native';
import {
  type NavigationRoute,
  type ParamListBase,
  useLinkBuilder,
} from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { ThemeManager, useTheme } from './theme';
import { type BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';

/**
 * Example use:
 *
 * <Tab.Navigator
 *   tabBar={props => <AppTabBar {...props} />}>
 */
const NavTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const theme = useTheme();
  const s = useStyles();

  const { buildHref } = useLinkBuilder();

  const onPress = (
    route: NavigationRoute<ParamListBase, string>,
    isFocused: boolean,
  ) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name, route.params);
    }
  };

  return (
    <View style={s.bar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string) // Not allowing a ReactNode
            : options.title !== undefined
              ? options.title
              : route.name;

        const icon = options.tabBarIcon;

        return (
          <PlatformPressable
            key={`${index}`}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={() => onPress(route, isFocused)}
            style={s.button}>
            {icon
              ? icon({
                  color: theme.colors.buttonText as string,
                  focused: isFocused,
                  size: 0,
                })
              : null}
            <Text style={[s.label, { opacity: isFocused ? 1 : 0.5 }]}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme, device }) => ({
  bar: {
    flexDirection: 'row',
    width: device.screen.width - 30,
    position: 'absolute',
    bottom: 25,
    height: 54,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: theme.colors.button,
  },
  button: {
    alignItems: 'center',
    width: 53,
    marginTop: 2,
  },
  label: {
    ...theme.text.tiny,
    color: theme.colors.buttonText,
  },
}));

export { NavTabBar };
