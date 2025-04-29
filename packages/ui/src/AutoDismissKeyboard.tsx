import { Keyboard } from 'react-native';
import { useEffect } from 'react';

export interface AutoDismissKeyboardProps {
  dismissWhen: () => boolean;
  onDismiss?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watchValue: any;
}

/**
 * Will dismiss the keyboard when a watched value changes and the result of dismissOn() is true.
 */
const AutoDismissKeyboard = ({ onDismiss, dismissWhen, watchValue }: AutoDismissKeyboardProps) => {
  useEffect(() => {
    if (dismissWhen()) {
      Keyboard.dismiss();
      if (onDismiss) onDismiss();
    }
  }, [watchValue]);

  return null;
};

export default AutoDismissKeyboard;
