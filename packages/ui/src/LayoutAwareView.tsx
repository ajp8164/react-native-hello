import React, { type ReactNode, useCallback } from 'react';
import { type LayoutChangeEvent, View } from 'react-native';

export interface LayoutAwareViewProps {
  children: ReactNode;
  onLayout: (event: LayoutChangeEvent) => void;
};

export const LayoutAwareView = (props: LayoutAwareViewProps) => {
  const { children, onLayout } = props;

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    onLayout(event);
  }, []);

  return <View onLayout={handleLayout}>{children}</View>;
};
