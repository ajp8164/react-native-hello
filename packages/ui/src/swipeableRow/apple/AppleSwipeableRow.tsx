import React, { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { View, type ViewStyle, Animated, type LayoutChangeEvent } from 'react-native';
import { type SharedValue } from 'react-native-reanimated';
import Swipeable, { type SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';
import { makeStyles } from '@rn-vui/themed';
import { type AppTheme, useTheme } from '../../theme';
import { type SwipeableAction } from '.';
import { LeftAction } from './LeftAction';
import { RightAction } from './RightAction';
import { useAlert } from '../../hooks';
import { LayoutAwareView } from '../../LayoutAwareView';

export interface AppleStyleSwipeableRowProps {
  buttonWidth?: number;
  children?: ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  leftActions?: SwipeableAction[];
  rightActions?: SwipeableAction[];
}

const AppleStyleSwipeableRow = (props: AppleStyleSwipeableRowProps) => {
  const { buttonWidth = 64, containerStyle, children, leftActions, rightActions } = props;

  const theme = useTheme();
  const s = useStyles(theme);
  const alert = useAlert();

  const enabled = !!leftActions || !!rightActions;

  const swipeableRow = useRef<SwipeableMethods>(null);
  // Initial max height > anything expected, onLayout will set final value
  const animatedMaxHeight = useRef(new Animated.Value(1000));

  const [actionsLeft, setActionsLeft] = useState<SwipeableAction[]>([]);
  const [actionsRight, setActionsRight] = useState<SwipeableAction[]>([]);

  useEffect(() => {
    // For actions requiring removal operation listen to the onPress handler promise result to
    // invoke the remove row handler. An optional confirmation alert may intervene.
    const _leftActions = leftActions
      ? leftActions.map(a => {
          if (a.op === 'remove') {
            const aOnPress = a.onPress;
            a.onPress = () => {
              if (a.confirmation) {
                alert(a.confirmation, () => {
                  handleRemoval(aOnPress);
                })();
              } else {
                handleRemoval(aOnPress);
              }
            };
          }
          return a;
        })
      : [];

    const _rightActions = rightActions
      ? rightActions.map(a => {
          if (a.op === 'remove') {
            const aOnPress = a.onPress;
            a.onPress = () => {
              if (a.confirmation) {
                alert(a.confirmation, () => {
                  handleRemoval(aOnPress);
                })();
              } else {
                handleRemoval(aOnPress);
              }
            };
          }
          return a;
        })
      : [];

    setActionsLeft(_leftActions);
    setActionsRight(_rightActions);
  }, [leftActions, rightActions]);

  const handleRemoval = (actionOnPress: () => void) => {
    Animated.timing(animatedMaxHeight.current, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(actionOnPress);
  };

  // Only 1 action allowed.
  const renderLeftActions = useCallback(
    (
      translation: SharedValue<number>,
      swipeableRef: React.RefObject<SwipeableMethods | null>,
      actions: SwipeableAction[],
    ) => {
      const totalWidth = buttonWidth * actions.length;
      return (
        actions[0] && (
          <LeftAction
            config={{
              x: buttonWidth * 1,
              totalWidth,
              ...actions[0],
            }}
            buttonWidth={buttonWidth}
            dragX={translation}
            swipeableRef={swipeableRef}
          />
        )
      );
    },
    [],
  );

  // Up to 3 actions allowed.
  const renderRightActions = useCallback(
    (
      translation: SharedValue<number>,
      swipeableRef: React.RefObject<SwipeableMethods | null>,
      actions: SwipeableAction[],
    ) => {
      const totalWidth = buttonWidth * actions.length;
      return (
        <View style={[s.rightActionsView, { width: totalWidth }]}>
          {actions[2] && (
            <RightAction
              config={{
                x: buttonWidth * 3,
                totalWidth,
                ...actions[2],
              }}
              buttonWidth={buttonWidth}
              dragX={translation}
              swipeableRef={swipeableRef}
            />
          )}
          {actions[1] && (
            <RightAction
              config={{
                x: buttonWidth * 2,
                totalWidth,
                ...actions[1],
              }}
              buttonWidth={buttonWidth}
              dragX={translation}
              swipeableRef={swipeableRef}
            />
          )}
          {actions[0] && (
            <RightAction
              config={{
                x: buttonWidth * 1,
                totalWidth,
                ...actions[0],
              }}
              buttonWidth={buttonWidth}
              dragX={translation}
              swipeableRef={swipeableRef}
            />
          )}
        </View>
      );
    },
    [],
  );

  const onLayout = (event: LayoutChangeEvent) => {
    animatedMaxHeight.current = new Animated.Value(event.nativeEvent.layout.height);
  };

  return (
    <Animated.View
      style={[enabled ? { maxHeight: animatedMaxHeight.current } : {}, s.container]}
      onLayout={onLayout}>
      <LayoutAwareView
        onLayout={event => {
          animatedMaxHeight.current = new Animated.Value(event.nativeEvent.layout.height);
        }}>
        <Swipeable
          ref={swipeableRow}
          enabled={enabled}
          containerStyle={containerStyle}
          friction={2}
          leftThreshold={140}
          rightThreshold={40}
          renderLeftActions={(_, translation) =>
            renderLeftActions(translation, swipeableRow, actionsLeft)
          }
          renderRightActions={(_, translation) =>
            renderRightActions(translation, swipeableRow, actionsRight)
          }
          onSwipeableOpen={dir => {
            // Opening the left action invokes the orPress handler.
            // If not removing the row then immediatley close the action.
            if (dir === 'right') {
              actionsLeft[0].onPress();
              if (actionsLeft[0].op !== 'remove') {
                swipeableRow.current?.close();
              }
            }
          }}>
          {children}
        </Swipeable>
      </LayoutAwareView>
    </Animated.View>
  );
};

const useStyles = makeStyles((_theme, __theme: AppTheme) => ({
  container: {
    overflow: 'hidden',
  },
  rightActionsView: {
    flexDirection: 'row',
  },
}));

export { AppleStyleSwipeableRow };
