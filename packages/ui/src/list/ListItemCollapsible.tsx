import { useTheme } from '../theme';
import React, { useImperativeHandle, useState } from 'react';
import { CollapsibleView, ListItem } from '..';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevronDown } from 'lucide-react-native';

interface ListItemCollapsible extends ListItem {
  children?: React.ReactElement;
  initExpanded?: boolean;
}

export interface ListItemCollapsibleMethods {
  close: () => void;
  isOpen: () => boolean;
  open: () => void;
}

const ListItemCollapsible = React.forwardRef<
  ListItemCollapsibleMethods,
  ListItemCollapsible
>((props: ListItemCollapsible, ref) => {
  const { initExpanded = false, children, ...rest } = props;

  const theme = useTheme();

  const [expanded, setExpanded] = useState(initExpanded);
  const rotation = useSharedValue(0);

  const animatedCaret = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  useImperativeHandle(ref, () => ({
    // These functions exposed to the parent component through the ref.
    close,
    isOpen,
    open,
  }));

  const close = () => {
    setExpanded(false);
    closeRotation();
  };

  const open = () => {
    setExpanded(true);
    openRotation();
  };

  const isOpen = () => {
    return expanded;
  };

  const closeRotation = () => {
    rotation.value = withTiming(0, {
      duration: 200,
    });
  };

  const openRotation = () => {
    rotation.value = withTiming(180, {
      duration: 200,
    });
  };

  const toggleRotation = () => {
    rotation.value = withTiming(rotation.value === 0 ? 180 : 0, {
      duration: 200,
    });
  };

  return (
    <>
      <ListItem
        {...rest}
        position={
          expanded
            ? rest.position?.includes('first')
              ? ['first']
              : []
            : rest.position
        }
        rightContent={
          <Animated.View style={animatedCaret}>
            <ChevronDown color={theme.colors.listItemIconNav} />
          </Animated.View>
        }
        onPress={() => {
          if (rest.onPress) rest.onPress();
          setExpanded(!expanded);
          toggleRotation();
        }}
      />
      <CollapsibleView expanded={expanded}>{children}</CollapsibleView>
    </>
  );
});

export { ListItemCollapsible };
