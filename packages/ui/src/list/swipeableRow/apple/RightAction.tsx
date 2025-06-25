import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { type SwipeableAction } from '.';
import { type LayoutChangeEvent, Text, View } from 'react-native';
import { type SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';
import { RectButton } from 'react-native-gesture-handler';
import { type AppTheme, useTheme, viewport } from '../../../theme';
import { makeStyles } from '@rn-vui/themed';
import { useState } from 'react';
import React from 'react';

export interface RightActionProps {
  buttonWidth: number;
  config: SwipeableAction;
  dragX: SharedValue<number>;
  swipeableRef: React.RefObject<SwipeableMethods | null>;
}

const RightAction = (props: RightActionProps) => {
  const { buttonWidth, config, dragX, swipeableRef } = props;

  const theme = useTheme();
  const s = useStyles(theme);

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

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  action: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: viewport.width,
  },
  actionView: {
    flex: 1,
    width: viewport.width,
  },
  text: {
    ...theme.styles.textSmall,
    color: theme.colors.stickyWhite,
  },
}));

export { RightAction };
