import { useEffect, useRef, useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { type ListItemSwipeableMethods } from './ListItemSwipeable';

export const useListEditor = () => {
  const isFocused = useIsFocused();

  // References are indexed by group and then ordinal index in the group.
  // Groups allow multiple lists on the same screen all responding to the
  // single editor instance.
  // const liRef = useRef<Record<string, ListItemSwipeableMethods[]>>({});

  const liRef = useRef<
    Record<string, { id: string; ref: ListItemSwipeableMethods }[]>
  >({});

  const [state, setState] = useState({
    enabled: false,
    enabledBySwipe: false,
    show: false,
  });

  // Reset the editor when the screen loses focus (navigate away).
  useEffect(() => {
    if (!isFocused) resetEditor();
    setState({
      enabled: false,
      enabledBySwipe: false,
      show: false,
    });
  }, [isFocused]);

  // When the screen edit button is touched all of the open swipeables are closed and
  // the list is put into edit mode (swipeable shows editor controls).
  const onToggleEditMode = () => {
    if (state.enabledBySwipe) {
      setState({
        enabled: false,
        enabledBySwipe: false,
        show: false,
      });
      resetEditor();
    } else {
      if (state.enabled) {
        resetEditor();
      }

      setState(prevState => {
        return {
          ...prevState,
          enabled: !prevState.enabled,
          show: !prevState.show,
        };
      });
    }
  };

  // When a new swipeable opens we close other list item swipeables.
  const onSwipeableWillOpen = (group: string, id: string) => {
    Object.keys(liRef.current).forEach(g => {
      liRef.current[g].forEach(li => {
        if (!(g === group && li.id === id)) {
          li.ref.close();
        }
      });
    });

    // Need to allow the editor resets to run first.
    setTimeout(() => {
      setState(prevState => {
        return {
          ...prevState,
          enabledBySwipe: true,
        };
      });
    }, 200); // Greater than the animation time for open/close
  };

  const onSwipeableWillClose = () => {
    setState(prevState => {
      return {
        ...prevState,
        enabledBySwipe: false,
      };
    });
  };

  const getState = () => {
    return state;
  };

  // Add the reference to the editor by group. The group is used to allow
  // multiple lists on the same screen, each list should have a different
  // group name.
  const addToEditor = (
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
  const removeFromEditor = (group: string, id: string) => {
    const index = liRef.current[group].findIndex(li => li.id === id);
    if (index >= 0) {
      liRef.current[group].splice(index, 1);
    }

    // Exit edit mode if all items in the list are removed.
    if (liRef.current[group].length === 0) {
      onToggleEditMode();
    }
  };

  // Close all swipeables.
  const resetEditor = () => {
    Object.keys(liRef.current).forEach(group => {
      liRef.current[group].forEach(li => {
        li.ref.close();
      });
    });
  };

  return {
    enabled: state.enabled || state.enabledBySwipe,
    show: state.enabled,
    enabledBySwipe: state.enabledBySwipe,
    add: addToEditor,
    getState,
    onToggleEditMode,
    onItemWillOpen: onSwipeableWillOpen,
    onItemWillClose: onSwipeableWillClose,
    remove: removeFromEditor,
    reset: resetEditor,
  };
};
