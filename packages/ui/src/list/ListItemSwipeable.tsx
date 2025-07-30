import { type AppTheme, useTheme } from '../theme';
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type ReactElement,
} from 'react';
import { makeStyles } from '@rn-vui/themed';
import { ListItem } from './ListItem';
import {
  AppleStyleSwipeableRow,
  type SwipeableAction,
} from './swipeableRow/apple';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Pressable, View } from 'react-native';
import { GripHorizontal } from 'lucide-react-native';
import type { SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';

const dragHandleWidth = 44;
const editButtonWidth = 44;

export interface EditAction {
  ButtonComponent?: ReactElement;
  op?: 'open-swipeable';
  onPressEdit?: () => void;
  draggable?: boolean;
}

interface ListItemSwipeable extends ListItem {
  buttonWidth?: number;
  drag?: () => void; // The drag() method from react-native-draggable-flat-list.
  dragIsActive?: boolean; // From react-native-draggable-flat-list.
  editAction?: EditAction;
  onSwipeableWillClose?: (direction: 'left' | 'right') => void;
  onSwipeableWillOpen?: (direction: 'left' | 'right') => void;
  showEditor?: boolean;
  swipeableActionsLeft?: SwipeableAction[];
  swipeableActionsRight?: SwipeableAction[];
}

export interface ListItemSwipeableMethods {
  close: () => void;
}

const ListItemSwipeable = React.forwardRef<
  ListItemSwipeableMethods,
  ListItemSwipeable
>((props: ListItemSwipeable, ref) => {
  const {
    buttonWidth = 70,
    drag,
    dragIsActive,
    editAction,
    onSwipeableWillOpen,
    onSwipeableWillClose,
    showEditor = false,
    swipeableActionsLeft,
    swipeableActionsRight,
    ...rest
  } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const [rerender, setRerender] = useState(false);
  const swipeableRef = useRef<SwipeableMethods>(null);

  // Keep track of whether the user is swiping or not. Needed to ignore press
  // events when swiping in progress.
  const [swiping, setSwiping] = useState(false);

  const dragOnly = !editAction && drag; // Whether or not the drag handle should be shown regardless of editing.

  // Initialize wrt to showEditor to avoid recyling animation when this list item is re-render/re-mounted.
  const dragHandleX = useSharedValue(
    dragOnly ? 0 : showEditor ? 0 : -dragHandleWidth,
  );
  const editButtonX = useSharedValue(showEditor ? editButtonWidth : 0);
  const editModeOpacity = useSharedValue(dragOnly ? 1 : showEditor ? 1 : 0);
  const titlePad = useSharedValue(0);

  const dragHandleAnimatedStyles = useAnimatedStyle(() => ({
    right: dragHandleX.value,
    opacity: editModeOpacity.value,
  }));

  const editButtonAnimatedStyles = useAnimatedStyle(() => ({
    left: editButtonX.value - editButtonWidth, // <--
    opacity: editModeOpacity.value,
  }));

  const listItemAnimatedStyles = useAnimatedStyle(() => ({
    left: editButtonX.value,
    paddingRight: editButtonX.value,
  }));

  const listItemRightValueContentAnimatedStyles = useAnimatedStyle(() => ({
    opacity: 1 - editModeOpacity.value,
  }));

  // Force a re-render when the button component changes.
  useEffect(() => {
    setRerender(!rerender);
  }, [editAction?.ButtonComponent]);

  useEffect(() => {
    // If we're showng the drag handle regardless of editing then we need to ignore editor state changes.
    if (dragOnly) return;

    // The delay allows the right image (e.g. caret) to fade out before edit mode animation begins.
    if (showEditor) {
      editButtonX.value = withDelay(
        100,
        withTiming(editButtonWidth, { duration: 200 }),
      );

      editModeOpacity.value = withDelay(100, withTiming(1, { duration: 200 }));

      if (editAction?.draggable) {
        titlePad.value = withDelay(
          100,
          withTiming(editButtonWidth, {
            duration: 200,
            easing: Easing.linear,
          }),
        );
      }

      if (drag) {
        dragHandleX.value = withDelay(100, withTiming(0, { duration: 200 }));
      }
    } else {
      editButtonX.value = withDelay(100, withTiming(0, { duration: 200 }));
      editModeOpacity.value = withDelay(100, withTiming(0, { duration: 200 }));
      titlePad.value = withDelay(
        100,
        withTiming(0, { duration: 200, easing: Easing.linear }),
      );

      if (drag) {
        dragHandleX.value = withDelay(
          100,
          withTiming(-dragHandleWidth, { duration: 100 }),
        );
      }
    }
  }, [showEditor]);

  useImperativeHandle(ref, () => ({
    // These functions exposed to the parent component through the ref.
    close,
  }));

  const close = () => {
    swipeableRef.current?.close();
  };

  const doEditAction = () => {
    if (editAction?.op === 'open-swipeable') {
      swipeableRef?.current?.openRight();
    }
    if (editAction?.onPressEdit) {
      editAction?.onPressEdit();
    }
  };

  const renderDragHandle = () => {
    if (!editAction?.draggable && !dragOnly) return null;
    return (
      <Animated.View style={[s.dragTouchContainer, dragHandleAnimatedStyles]}>
        <Pressable
          onPressIn={() => {
            if (drag) drag();
          }}
          disabled={!showEditor && !dragOnly}>
          <GripHorizontal color={theme.colors.midGray} />
        </Pressable>
      </Animated.View>
    );
  };

  const renderEditButton = () => {
    return (
      // Force edit button to be invisible when not shown (prevents any peek visibility of the
      // button if not completely out of view).
      // Must disable the button when now shown, some of the touch area is always in view.
      <Animated.View style={[s.editTouchContainer, editButtonAnimatedStyles]}>
        <Pressable onPress={doEditAction} disabled={!showEditor}>
          {editAction?.ButtonComponent}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={[dragIsActive ? theme.styles.shadowGlow : {}]}>
      <AppleStyleSwipeableRow
        ref={swipeableRef}
        containerStyle={[
          rest.position?.includes('first') ? s.first : {},
          rest.position?.includes('last') ? s.last : {},
          rest.focus ? s.focus : {},
          rest.ghost ? s.ghost : {},
        ]}
        buttonWidth={buttonWidth}
        leftActions={swipeableActionsLeft}
        rightActions={swipeableActionsRight}
        onSwipeableWillOpen={direction => {
          if (onSwipeableWillOpen) onSwipeableWillOpen(direction);
          setSwiping(true);
        }}
        onSwipeableWillClose={direction => {
          if (onSwipeableWillClose) onSwipeableWillClose(direction);
          setSwiping(false);
        }}
        onSwipeableOpen={() => setSwiping(false)}
        onSwipeableClose={() => setSwiping(false)}>
        {editAction && renderEditButton()}
        <Animated.View style={listItemAnimatedStyles}>
          <ListItem
            {...rest}
            onPress={() => {
              // Only handle press if not swiping.
              if (!swiping) {
                if (rest.onPress) rest.onPress();
              }
            }}
            containerStyle={{
              ...rest.containerStyle,
              ...s.noBorderRadius,
            }}
            rightContentStyle={{
              ...listItemRightValueContentAnimatedStyles,
              ...rest.rightContentStyle,
            }}
            valueStyle={{
              ...listItemRightValueContentAnimatedStyles,
              ...rest.valueStyle,
            }}
          />
        </Animated.View>
        {drag && renderDragHandle()}
      </AppleStyleSwipeableRow>
    </View>
  );
});

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  dragTouchContainer: {
    width: dragHandleWidth,
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTouchContainer: {
    width: editButtonWidth,
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
  },
  first: {
    borderTopLeftRadius: 10, //theme.styles.button.borderRadius,
    borderTopRightRadius: 10, //theme.styles.button.borderRadius,
  },
  focus: {
    borderColor: theme.colors.listItemIcon,
    borderWidth: 1,
  },
  ghost: {
    borderColor: theme.colors.lightGray,
    borderWidth: 1,
    borderStyle: 'dashed',
    overflow: 'visible',
  },
  last: {
    borderBottomLeftRadius: 10, //theme.styles.button.borderRadius,
    borderBottomEndRadius: 10, //theme.styles.button.borderRadius,
  },
  noBorderRadius: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

export { ListItemSwipeable };
