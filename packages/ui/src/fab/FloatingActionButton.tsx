import { type AppTheme, useTheme } from '../theme';
import { makeStyles } from '@rn-vui/themed';
import { Pressable, type ViewStyle } from 'react-native';
import React, { type ReactElement } from 'react';
import Animated, {
  withDelay,
  useAnimatedStyle,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

export interface FloatingActionButtonProps {
  buttonContent: string | ReactElement;
  index: number;
  isExpanded: SharedValue<boolean>;
  style?: ViewStyle | ViewStyle[];
  onPress: () => void;
};

const FloatingActionButton = (props: FloatingActionButtonProps) => {
  const { buttonContent, index, isExpanded, style, onPress } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 100;
    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  return (
    <AnimatedPressable style={[animatedStyles, s.shadow, s.button, style]} onPress={onPress}>
      <Animated.Text style={s.content}>{buttonContent}</Animated.Text>
    </AnimatedPressable>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  button: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.button,
    position: 'absolute',
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    color: theme.colors.white,
    fontWeight: 500,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
}));

export { FloatingActionButton };
