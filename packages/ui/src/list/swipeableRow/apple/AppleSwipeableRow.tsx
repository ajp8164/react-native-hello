import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View, type ViewStyle } from 'react-native';
import { type SharedValue } from 'react-native-reanimated';
import Swipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import {
  AnimatedRemovableItem,
  type AnimatedRemovableItemRef,
} from '../../AnimatedRemovableItem';
import { ThemeManager } from '../../../theme';
import { type SwipeableAction } from '.';
import { LeftAction } from './LeftAction';
import { RightAction } from './RightAction';
import { ConditionalWrapper } from '../../../ConditionalWrapper';

interface AppleStyleSwipeableRow
  extends Partial<React.ComponentProps<typeof Swipeable>> {
  buttonWidth?: number;
  children?: ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
  enableRemoveableRow?: boolean;
  leftActions?: SwipeableAction[];
  rightActions?: SwipeableAction[];
}

const AppleStyleSwipeableRow = (props: AppleStyleSwipeableRow) => {
  const {
    buttonWidth = 64,
    containerStyle,
    children,
    enableRemoveableRow = true,
    leftActions,
    rightActions,
    ...rest
  } = props;

  const s = useStyles();

  const enabled = !!leftActions || !!rightActions;

  const swipeableRow = useRef<SwipeableMethods>(null);

  const [actionsLeft, setActionsLeft] = useState<SwipeableAction[]>([]);
  const [actionsRight, setActionsRight] = useState<SwipeableAction[]>([]);

  const animatedRemovableItemRef = useRef<AnimatedRemovableItemRef>(null);

  useEffect(() => {
    // For actions requiring removal operation listen to the onPress handler promise result to
    // invoke the remove row handler. An optional confirmation alert may intervene.
    const _leftActions = leftActions
      ? leftActions.map(a => {
          if (a.op === 'remove') {
            const aOnPress = a.onPress;
            a.onPress = async () => {
              if (a.confirmation) {
                const confirmed = await a.confirmation();
                if (confirmed) {
                  handleRemoval(aOnPress);
                }
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
            a.onPress = async () => {
              if (a.confirmation) {
                const confirmed = await a.confirmation();
                if (confirmed) {
                  handleRemoval(aOnPress);
                }
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
    // Trigger removal animation and execute press action when animation completes.
    animatedRemovableItemRef.current?.trigger(actionOnPress);
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

  return (
    <ConditionalWrapper
      condition={enableRemoveableRow}
      wrapper={children => (
        <AnimatedRemovableItem ref={animatedRemovableItemRef}>
          {children}
        </AnimatedRemovableItem>
      )}>
      <View style={[s.container]}>
        <Swipeable
          ref={swipeableRow}
          enabled={enabled}
          containerStyle={containerStyle}
          friction={2}
          leftThreshold={140}
          rightThreshold={40}
          renderLeftActions={(_progress, translation) =>
            renderLeftActions(translation, swipeableRow, actionsLeft)
          }
          renderRightActions={(_progress, translation) =>
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
          }}
          {...rest}>
          {children}
        </Swipeable>
      </View>
    </ConditionalWrapper>
  );
};
const useStyles = ThemeManager.createStyleSheet(() => ({
  container: {
    overflow: 'hidden',
  },
  rightActionsView: {
    flexDirection: 'row',
  },
}));

export { AppleStyleSwipeableRow };
