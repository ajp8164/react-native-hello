import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { type SwipeableAction } from '.';
import { type LayoutChangeEvent, Text, View } from 'react-native';
import { type SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';
import { RectButton } from 'react-native-gesture-handler';
import { ThemeManager } from '../../../theme';
import { useState } from 'react';
import React from 'react';

interface RightAction {
  buttonWidth: number;
  config: SwipeableAction;
  dragX: SharedValue<number>;
  swipeableRef: React.RefObject<SwipeableMethods | null>;
}

const RightAction = (props: RightAction) => {
  const { buttonWidth, config, dragX, swipeableRef } = props;

  const s = useStyles();

  const [buttonContentWidth, setbuttonContentWidth] = useState(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          dragX.value,
          [0, -config.totalWidth!],
          [config.x!, 0],
        ),
      },
    ],
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    setbuttonContentWidth(event.nativeEvent.layout.width);
  };

  return (
    <Animated.View style={[s.actionView, animatedStyle]}>
      <RectButton
        style={[s.action, { backgroundColor: config.color }]}
        onPress={() => {
          config.onPress();
          swipeableRef.current?.close();
        }}>
        <View
          style={{
            position: 'absolute',
            left: (buttonWidth - buttonContentWidth) / 2,
          }}>
          <View style={{ alignItems: 'center' }} onLayout={onLayout}>
            {config.ButtonComponent ? config.ButtonComponent : null}
            {config.text && <Text style={s.text}>{config.text}</Text>}
          </View>
        </View>
      </RectButton>
    </Animated.View>
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme, device }) => ({
  action: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: device.screen.width,
  },
  actionView: {
    flex: 1,
    width: device.screen.width,
  },
  text: {
    ...theme.text.small,
    color: theme.colors.stickyWhite,
  },
}));

export { RightAction };
