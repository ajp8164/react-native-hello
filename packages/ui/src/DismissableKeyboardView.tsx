import { Keyboard, Pressable } from 'react-native';
import React, { type ReactNode } from 'react';

export interface DismissableKeyboardViewProps {
  children: ReactNode;
}

/**
 * Dismisses the keyboard on touch outside. Touching an input will not dismiss the keyboard.
 */
const DismissableKeyboardView = ({ children }: DismissableKeyboardViewProps) => {
  return (
    <Pressable onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </Pressable>
  );
};

export default DismissableKeyboardView;
