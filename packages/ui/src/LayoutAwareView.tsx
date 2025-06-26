import React, { type ReactNode, useCallback } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';

interface LayoutAwareView {
  children: ReactNode;
  onLayout: (event: LayoutChangeEvent) => void;
}

const LayoutAwareView = (props: LayoutAwareView) => {
  const { children, onLayout } = props;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    onLayout(event);
  }, []);

  return <View onLayout={handleLayout}>{children}</View>;
};

export { LayoutAwareView };
