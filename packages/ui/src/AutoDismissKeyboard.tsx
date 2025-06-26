import { Keyboard } from 'react-native';
import { useEffect } from 'react';

interface AutoDismissKeyboard {
  dismissWhen: () => boolean;
  onDismiss?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watchValue: any;
}

/**
 * Will dismiss the keyboard when a watched value changes and the result of dismissOn() is true.
 */
const AutoDismissKeyboard = ({
  onDismiss,
  dismissWhen,
  watchValue,
}: AutoDismissKeyboard) => {
  useEffect(() => {
    if (dismissWhen()) {
      Keyboard.dismiss();
      if (onDismiss) onDismiss();
    }
  }, [watchValue]);

  return null;
};

export { AutoDismissKeyboard };
