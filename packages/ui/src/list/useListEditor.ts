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

  const [listEditSwipeEnabled, setListEditSwipeEnabled] = useState(false);
  const [listEditModeEnabled, setListEditModeEnabled] = useState(false);

  // Reset the editor when the screen loses focus (navigate away).
  useEffect(() => {
    if (!isFocused) resetEditor();
    setListEditModeEnabled(false);
    setListEditSwipeEnabled(false);
  }, [isFocused]);

  // When the screen edit button is touched all of the open swipeables are closed and
  // the list is put into edit mode (swipeable shows editor controls).
  const onToggleEditMode = () => {
    if (listEditSwipeEnabled) {
      setListEditSwipeEnabled(false);
      setListEditModeEnabled(false);
      resetEditor();
    } else {
      if (listEditModeEnabled) {
        resetEditor();
      }

      setListEditModeEnabled(!listEditModeEnabled);
    }
  };

  // When a new swipeable opens we close other list item swipeables.
  const onSwipeableWillOpen = (group: string, id: string) => {
    Object.keys(liRef.current).forEach(g => {
      liRef.current[g].forEach(li => {
        if (!(g === group && li.id === id)) li.ref.close();
      });
    });

    // Need to allow the editor resets to run first.
    setTimeout(() => {
      setListEditSwipeEnabled(true);
    });
  };

  const onSwipeableWillClose = () => {
    setListEditSwipeEnabled(false);
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

      // Don't duplicate entries.
      const index = liRef.current[group].findIndex(li => li.id === id);
      if (index < 0) {
        liRef.current[group].push({ id, ref });
      }
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
    enabled: listEditModeEnabled || listEditSwipeEnabled,
    show: listEditModeEnabled,
    enabledBySwipe: listEditSwipeEnabled,
    add: addToEditor,
    onToggleEditMode,
    onItemWillOpen: onSwipeableWillOpen,
    onItemWillClose: onSwipeableWillClose,
    reset: resetEditor,
  };
};
