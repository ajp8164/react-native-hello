import { makeStyles } from '@rn-vui/themed';
import { type SwipeableAction } from '.';
import { Text, type TextStyle, View, type ViewStyle } from 'react-native';
import { type AppTheme, useTheme } from '../../theme';
import Animated, {
  Extrapolation,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { type SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';
import { RectButton } from 'react-native-gesture-handler';
import React from 'react';

export interface LeftActionsProps {
  buttonStyle?: ViewStyle;
  buttonWidth: number;
  config: SwipeableAction;
  dragX: SharedValue<number>;
  swipeableRef: React.RefObject<SwipeableMethods | null>;
  textStyle?: TextStyle;
}

const LeftAction = (props: LeftActionsProps) => {
  const { buttonWidth, config, dragX, swipeableRef } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          dragX.value,
          [0, config.totalWidth!],
          [-config.totalWidth! / 2, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <RectButton
      style={[s.action, { backgroundColor: config.color }]}
      onPress={() => {
        config.onPress();
        swipeableRef.current?.close();
      }}>
      <Animated.View style={animatedStyle}>
        <View style={[s.actionWrapper, { width: buttonWidth }]}>
          {config.ButtonComponent ? config.ButtonComponent : null}
          {config?.text && <Text style={s.text}>{config?.text}</Text>}
        </View>
      </Animated.View>
    </RectButton>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  action: {
    flex: 1,
    justifyContent: 'center',
  },
  actionWrapper: {
    alignItems: 'center',
  },
  text: {
    ...theme.styles.textSmall,
    color: theme.colors.stickyWhite,
  },
}));

export { LeftAction };
