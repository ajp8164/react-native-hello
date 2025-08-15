/**
 * See https://github.com/funcsio/react-native-swipe-button-tutorial
 */

import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { ThemeManager, useTheme } from './theme';
import type { ColorValue, TextStyle, ViewStyle } from 'react-native';
import {
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import React, { type ReactNode, useState } from 'react';

import LinearGradient from 'react-native-linear-gradient';

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

type AnimatedGHContext = {
  completed: boolean;
};

interface SwipeButtonInterface {
  backText?: string;
  backTextStyle?: TextStyle | TextStyle[];
  backTextColor?: ColorValue;
  containerStyle?: ViewStyle | ViewStyle[];
  onToggle: (value: boolean) => void;
  height?: number;
  padding?: number;
  text?: string;
  textStyle?: TextStyle | TextStyle[];
  textColor?: ColorValue;
  thumbComponent?: ReactNode;
  thumbStartColor?: ColorValue;
  thumbStyle?: ViewStyle | ViewStyle[];
  thumbEndColor?: ColorValue;
  trackColor?: ColorValue;
  trackStartColor?: ColorValue;
  trackEndColor?: ColorValue;
  width?: number;
}

const SwipeButton = ({
  backText,
  backTextColor,
  backTextStyle,
  containerStyle,
  onToggle,
  height = 40,
  padding = 5,
  text,
  textColor,
  textStyle,
  thumbComponent = null,
  thumbStartColor,
  thumbStyle,
  thumbEndColor,
  trackColor,
  trackStartColor,
  trackEndColor,
  width = 180,
}: SwipeButtonInterface) => {
  const swipableDimensions = height - 2 * padding;
  const hWaveRange = swipableDimensions + 2 * padding;
  const hSwipeRange = width - 2 * padding - swipableDimensions;

  const theme = useTheme();
  const s = useStyles();

  backTextColor = backTextColor || theme.styles.buttonTitle.color || '#ffffff';
  textColor = textColor || theme.styles.buttonTitle.color || '#ffffff';
  thumbStartColor =
    thumbStartColor || theme.styles.buttonTitle.color || '#ffffff';
  thumbEndColor = thumbEndColor || theme.styles.buttonTitle.color || '#ffffff';
  trackColor = trackColor || theme.styles.button.backgroundColor || '#c0c0c0';
  trackStartColor =
    trackStartColor || theme.styles.button.backgroundColor || '#c0c0c0';
  trackEndColor =
    trackEndColor || theme.styles.button.backgroundColor || '#c0c0c0';

  const swipeable = {
    ...s.swipeable,
    left: padding,
    height: swipableDimensions,
    width: swipableDimensions,
    borderRadius: swipableDimensions,
  };

  const swipeContainer = {
    ...s.swipeContainer,
    height,
    width,
    backgroundColor: trackColor,
    borderRadius: height,
    padding,
  };

  const swipeText = {
    ...s.swipeText,
    color: textColor,
  };

  const backSwipeText = {
    ...s.backSwipeText,
    color: backTextColor,
  };
  const colorWave = {
    ...s.colorWave,
    height,
    borderRadius: height,
  };

  // Animated value for X translation
  const X = useSharedValue(0);
  // Toggled State
  const [toggled, setToggled] = useState(false);

  // Fires when animation ends
  const handleComplete = (isToggled: boolean) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);
    }
  };

  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    AnimatedGHContext
  >({
    onStart: (_, ctx) => {
      'worklet';
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      'worklet';
      let newValue;
      if (ctx.completed) {
        newValue = hSwipeRange + e.translationX;
      } else {
        newValue = e.translationX;
      }

      if (newValue >= 0 && newValue <= hSwipeRange) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      'worklet';
      if (X.value < width / 2 - swipableDimensions / 2) {
        X.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        X.value = withSpring(hSwipeRange);
        runOnJS(handleComplete)(true);
      }
    },
  });

  const InterpolateXInput = [0, hSwipeRange];
  const AnimatedStyles = {
    swipeContainer: useAnimatedStyle(() => {
      'worklet';
      return {};
    }),
    colorWave: useAnimatedStyle(() => {
      'worklet';
      return {
        width: hWaveRange + X.value,
        opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
      };
    }),
    swipeable: useAnimatedStyle(() => {
      'worklet';
      return {
        backgroundColor: interpolateColor(
          X.value,
          [0, width - swipableDimensions - padding],
          [thumbStartColor as string, thumbEndColor as string],
        ),
        transform: [{ translateX: X.value }],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      'worklet';
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [1, 0],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [0, width / 2 - swipableDimensions],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }),
    backSwipeText: useAnimatedStyle(() => {
      'worklet';
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0, 1],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [width / 2 - swipableDimensions, 0],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }),
  };

  return (
    <Animated.View
      style={[swipeContainer, AnimatedStyles.swipeContainer, containerStyle]}>
      <AnimatedLinearGradient
        style={[AnimatedStyles.colorWave, colorWave]}
        colors={[trackStartColor as string, trackEndColor as string]}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View
          style={[swipeable, AnimatedStyles.swipeable, thumbStyle]}>
          {thumbComponent}
        </Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[swipeText, AnimatedStyles.swipeText, textStyle]}>
        {text}
      </Animated.Text>
      <Animated.Text
        style={[backSwipeText, AnimatedStyles.backSwipeText, backTextStyle]}>
        {backText}
      </Animated.Text>
    </Animated.View>
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  swipeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorWave: {
    position: 'absolute',
    left: 0,
  },
  swipeable: {
    position: 'absolute',
    zIndex: 3,
  },
  swipeText: {
    ...theme.text.normal,
    alignSelf: 'center',
    zIndex: 2,
    position: 'absolute',
  },
  backSwipeText: {
    ...theme.text.normal,
    alignSelf: 'center',
    zIndex: 2,
    position: 'absolute',
  },
}));

export { SwipeButton };
