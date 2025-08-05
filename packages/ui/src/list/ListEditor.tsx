import React, { type JSX, useEffect, useImperativeHandle } from 'react';
import { useListEditor } from '.';
import {
  Keyboard,
  type LayoutRectangle,
  View,
  type ViewProps,
} from 'react-native';
import { type AppTheme, useTheme } from '../theme';
import { makeStyles } from '@rn-vui/themed';
import { type ListItemSwipeableMethods } from './ListItemSwipeable';

// This list editor works with ListItemSwipeable items only.

export type ListEditorState = {
  enabled: boolean;
  enabledBySwipe: boolean;
  show: boolean;
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
  onItemWillClose: () => void;
  onItemWillOpen: (group: string, id: string) => void;
  onToggleEditMode: () => void;
  remove: (group: string, id: string) => void;
  reset: () => void;
}

const ListEditor = React.forwardRef<ListEditorMethods, ListEditor>(
  (props: ListEditor, ref) => {
    const { children, listLayout, onChangeState, ...rest } = props;

    const theme = useTheme();
    const s = useStyles(theme);

    const listEditor = useListEditor();

    useImperativeHandle(ref, () => ({
      // These functions exposed to the parent component through the ref.
      add: listEditor.add,
      onToggleEditMode: () => {
        Keyboard.dismiss();
        listEditor.onToggleEditMode();
      },
      onItemWillClose: listEditor.onItemWillClose,
      onItemWillOpen: listEditor.onItemWillOpen,
      remove: listEditor.remove,
      reset: listEditor.reset,
    }));

    useEffect(() => {
      if (onChangeState) {
        onChangeState({
          enabled: listEditor.enabled,
          enabledBySwipe: listEditor.enabledBySwipe,
          show: listEditor.show,
        });
      }
    }, [listEditor.enabled, listEditor.enabledBySwipe, listEditor.show]);

    // TODO - overlays are not able to manage more than one list.
    return (
      <View style={s.container} {...rest}>
        {listEditor.enabled && listLayout && (
          <>
            {/* Top Overlay - intercept taps and close the editor */}
            <View
              pointerEvents="auto"
              style={{ ...s.overlay, height: listLayout.y }}
              onStartShouldSetResponder={() => true}
              onTouchStart={() =>
                listEditor.enabledBySwipe
                  ? listEditor.reset()
                  : listEditor.onToggleEditMode()
              }
            />
            {/* Top Overlay - intercept taps and close the editor */}
            <View
              pointerEvents="auto"
              style={{ ...s.overlay, top: listLayout.y + listLayout.height }}
              onStartShouldSetResponder={() => true}
              onTouchStart={() =>
                listEditor.enabledBySwipe
                  ? listEditor.reset()
                  : listEditor.onToggleEditMode()
              }
            />
          </>
        )}
        {children}
      </View>
    );
  },
);

const useStyles = makeStyles((_theme, __theme: AppTheme) => ({
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
