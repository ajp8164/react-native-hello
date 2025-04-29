import { type AppTheme, useTheme } from '../theme';
import { makeStyles } from '@rneui/themed';
import { Pressable, View } from 'react-native';
import React, { type ReactElement } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { FloatingActionButton } from '.';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type FABButton = {
  label: string | ReactElement;
  onPress: () => void;
};

export interface FABMenuProps {
  animate?: boolean;
  buttons?: FABButton[];
  label?: string | ReactElement;
  onPress?: () => void;
};

const FABMenu = (props: FABMenuProps) => {
  const { animate = true, buttons, label, onPress } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
    if (onPress) onPress();
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(isExpanded.value ? 1 : 0, [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? '45deg' : '0deg';

    return {
      transform: [{ translateX: translateValue }, { rotate: withTiming(rotateValue) }],
    };
  });

  return (
    <View style={s.buttonContainer}>
      <AnimatedPressable onPress={handlePress} style={[s.shadow, s.mainButton]}>
        <Animated.Text style={[animate ? plusIconStyle : {}, s.mainContent]}>
          {label || '+'}
        </Animated.Text>
      </AnimatedPressable>
      {buttons?.map((b, i) => {
        return (
          <FloatingActionButton
            key={`${i + 1}`}
            index={i + 1}
            isExpanded={isExpanded}
            buttonContent={b.label}
            onPress={b.onPress}
          />
        );
      })}
    </View>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 15,
    right: 15,
  },
  mainButton: {
    zIndex: 1,
    height: 56,
    width: 56,
    borderRadius: 100,
    backgroundColor: theme.colors.button,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    fontSize: 24,
    color: theme.colors.white,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
}));

export { FABMenu };
