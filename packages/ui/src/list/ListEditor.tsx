import React, { useEffect, useImperativeHandle, useRef, type JSX } from 'react';
import {
  Keyboard,
  View,
  type LayoutRectangle,
  type ViewProps,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import type { ListItemSwipeableMethods } from './ListItemSwipeable';
import { ThemeManager } from '../theme';

// This list editor works with ListItemSwipeable items only.

export type ListEditorState = {
  enabled: boolean; // Editor was shown via button (onToggleEditMode)
  enabledBySwipe: boolean; // How was the editor shown? via swipe (onItemWillOpen)
  show: boolean; // When true the implementation should show the editor controls (typically left side of list item)
};

interface ListEditor extends ViewProps {
  children: JSX.Element;
  listLayout?: LayoutRectangle;
  onChangeState?: (state: ListEditorState) => void;
}

export interface ListEditorMethods {
  add: (
    ref: ListItemSwipeableMethods | null,
    group: string,
    id: string,
  ) => void;
  getState: () => ListEditorState;
  onItemWillClose: (withSwipe?: boolean) => void;
  onItemWillOpen: (group: string, id: string, withSwipe?: boolean) => void;
  onItemOpen: (group: string, id: string) => void;
  onItemClose: (group: string, id: string) => void;
  onToggleEditMode: () => void;
  remove: (group: string, id: string) => void;
  reset: () => void;
}

const ListEditor = React.forwardRef<ListEditorMethods, ListEditor>(
  (props: ListEditor, ref) => {
    const { children, listLayout, onChangeState, ...rest } = props;

    const s = useStyles();

    const isFocused = useIsFocused();

    // References are indexed by group and then ordinal index in the group.
    // Groups allow multiple lists on the same screen all responding to the
    // single editor instance.
    // const liRef = useRef<Record<string, ListItemSwipeableMethods[]>>({});
    const liRef = useRef<
      Record<string, { id: string; ref: ListItemSwipeableMethods }[]>
    >({});

    const stateEnabled = useRef(false);
    const stateEnabledBySwipe = useRef(false);
    const stateShow = useRef(false);

    useImperativeHandle(ref, () => ({
      // These functions exposed to the parent component through the ref.
      add,
      getState,
      onToggleEditMode: () => {
        Keyboard.dismiss();
        onToggleEditMode();
      },
      onItemClose,
      onItemOpen,
      onItemWillClose,
      onItemWillOpen,
      remove,
      reset,
    }));

    // Reset the editor when the screen loses focus (navigate away).
    useEffect(() => {
      if (!isFocused) reset();
      stateEnabled.current = false;
      stateEnabledBySwipe.current = false;
      stateShow.current = false;
      onChangeState?.(getState());
    }, [isFocused]);

    // When the screen edit button is touched all of the open swipeables are closed and
    // the list is put into edit mode (swipeable shows editor controls).
    const onToggleEditMode = () => {
      if (stateEnabled.current && stateShow.current) {
        // Editor is shown, close it
        stateEnabled.current = false;
        stateShow.current = false;
        reset();
        onChangeState?.(getState());
      } else if (stateEnabled.current) {
        // Item is open, close it
        stateEnabled.current = false;
        reset();
        onChangeState?.(getState());
      } else {
        // Editor is closed, open it
        stateEnabled.current = true;
        stateShow.current = true;
        onChangeState?.(getState());
      }
    };

    // When wired to the swipeable, onItemOpen() is only called when the user has
    // swiped. When calling ()swipeable).openRight() on the swipeable this function is
    // not called. Similar for onItemClose().
    const onItemOpen = (_group: string, _id: string) => {
      stateEnabledBySwipe.current = true;
    };

    const onItemClose = (_group: string, _id: string) => {
      stateEnabledBySwipe.current = false;
    };

    // When a new swipeable opens we close other list item swipeables.
    const onItemWillOpen = (group: string, id: string) => {
      Object.keys(liRef.current).forEach(g => {
        liRef.current[g].forEach(li => {
          if (!(g === group && li.id === id)) {
            li.ref.close();
          }
        });
      });

      // Need to allow the editor resets to run first.
      setTimeout(() => {
        stateEnabled.current = true;
        onChangeState?.(getState());
      }, 200); // Greater than the animation time for open/close
    };

    const onItemWillClose = (_withSwipe?: boolean) => {
      if (!stateShow.current) {
        stateEnabled.current = false;
        onChangeState?.(getState());
      }
    };

    const getState = () => {
      return {
        enabled: stateEnabled.current,
        enabledBySwipe: stateEnabledBySwipe.current,
        show: stateShow.current,
      };
    };

    // Add the reference to the editor by group. The group is used to allow
    // multiple lists on the same screen, each list should have a different
    // group name.
    const add = (
      ref: ListItemSwipeableMethods | null,
      group: string,
      id: string,
    ) => {
      if (ref) {
        if (!liRef.current[group]) {
          liRef.current = {
            ...liRef.current,
            [group]: [],
          };
        }

        // Add or update the list item entry.
        const index = liRef.current[group].findIndex(li => li.id === id);
        if (index < 0) {
          liRef.current[group].push({ id, ref });
        } else {
          liRef.current[group][index] = { id, ref };
        }
      }
    };

    // Remove the reference from the editor. Automatically exit edit mode if
    // there are no more references in the group.
    const remove = (group: string, id: string) => {
      const index = liRef.current[group].findIndex(li => li.id === id);
      if (index >= 0) {
        liRef.current[group].splice(index, 1);
      }

      // Close the swipeable when the editor is not shown and we were opened via
      // user swipe (and not a call to (swipeable).openRight()).
      if (stateEnabledBySwipe.current && !stateShow.current) {
        // Editor not shown but is enabled, remove item and disable
        stateEnabled.current = false;
        stateEnabledBySwipe.current = false;
        onChangeState?.(getState());
      } else if (stateShow.current && liRef.current[group].length === 0) {
        stateEnabled.current = false;
        stateEnabledBySwipe.current = false;
        stateShow.current = false;
        onChangeState?.(getState());
      }
    };

    // Close all swipeables.
    const reset = () => {
      Object.keys(liRef.current).forEach(group => {
        liRef.current[group].forEach(li => {
          li.ref.close();
        });
      });
    };

    // TODO - overlays are not able to manage more than one list.
    return (
      <View style={s.container} {...rest}>
        {stateEnabled.current && listLayout && (
          <>
            {/* Top Overlay - intercept taps and close the editor */}
            <View
              pointerEvents="auto"
              style={{ ...s.overlay, height: listLayout.y }}
              onStartShouldSetResponder={() => true}
              onTouchStart={() =>
                stateEnabledBySwipe.current ? reset() : onToggleEditMode()
              }
            />
            {/* Bottom Overlay - intercept taps and close the editor */}
            <View
              pointerEvents="auto"
              style={{ ...s.overlay, top: listLayout.y + listLayout.height }}
              onStartShouldSetResponder={() => true}
              onTouchStart={() =>
                stateEnabledBySwipe.current ? reset() : onToggleEditMode()
              }
            />
          </>
        )}
        {children}
      </View>
    );
  },
);

const useStyles = ThemeManager.createStyleSheet(() => ({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    height: '100%',
  },
}));

export { ListEditor };
