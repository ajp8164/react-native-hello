import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  type PropsWithChildren,
} from 'react';
import type { LayoutChangeEvent, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnUI,
} from 'react-native-reanimated';

export interface AnimatedRemovableItemRef {
  trigger: (action?: () => void) => void;
}

interface Props {
  duration?: number;
  style?: ViewStyle;
}

export const AnimatedRemovableItem = forwardRef<
  AnimatedRemovableItemRef,
  PropsWithChildren<Props>
>(({ duration = 200, style, children }, ref) => {
  const height = useSharedValue<number>(0);
  const [measured, setMeasured] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    if (!measured) return {};
    return {
      height: height.value,
      overflow: 'hidden',
    };
  });

  // Wrap this in a UI-thread-safe block
  const triggerWorklet = () => {
    'worklet';
    height.value = withTiming(0, { duration });
  };

  useImperativeHandle(ref, () => ({
    trigger: (action?: () => void) => {
      if (!measured) return;
      runOnUI(triggerWorklet)();

      setTimeout(() => {
        if (action) action();
      }, duration);
    },
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    const measuredHeight = e.nativeEvent.layout.height;
    if (!measured && measuredHeight > 0) {
      height.value = measuredHeight;
      setMeasured(true);
    }
  };

  return (
    <Animated.View style={[style, animatedStyle]} onLayout={onLayout}>
      {children}
    </Animated.View>
  );
});
