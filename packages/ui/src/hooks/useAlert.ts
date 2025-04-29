import { Alert } from 'react-native';
import { AlertStatusContext } from '../providers';
import { useContext } from 'react';
import { useTheme } from '../theme';

type AlertButton = {
  text: string;
  style?: 'default' | 'cancel' | 'destructive' | undefined;
};

export type AlertConfig = {
  title: string;
  message: string;
  buttons?: AlertButton[];
};

/**
 * This hook provides UI alert presention. Multiple API calls can execute in parallel. Using this hook will
 * prevent the possibilty of multiple alert dialogs being presented on top of each other (an issue on iOS).
 * Using this hook also avoids the need for handling dialog presentation in the screens. The first dialog requested
 * is shown, subsequent dialog requests are swallowed. When the presented dialog is dismissed a new dialog request
 * will display that dialog.
 */
export const useAlert = () => {
  const theme = useTheme();
  const alertStatusContext = useContext(AlertStatusContext);

  // Return a function that presents an alert UI if and only if another alert UI is not presented.
  // Calls to present a second alert ignore the request. This prevents alerts from stacking up on the UI.
  return (config: AlertConfig, onConfirm?: () => void, onCancel?: () => void) => {
    return () => {
      const onDismiss = () => {
        alertStatusContext.alertInProgress = false;
      };

      if (!alertStatusContext.alertInProgress) {
        alertStatusContext.alertInProgress = true;

        if (onConfirm) {
          Alert.alert(
            config.title,
            config.message,
            config.buttons?.length === 1
              ? [
                  {
                    text: config.buttons?.[0].text || 'OK',
                    style: config.buttons?.[0].style,
                    onPress: () => {
                      onDismiss();
                      onConfirm();
                    },
                  },
                ]
              : [
                  {
                    text: config.buttons?.[0].text || 'Cancel',
                    style: config.buttons?.[0].style,
                    onPress: () => {
                      onDismiss();
                      if (onCancel) onCancel();
                    },
                  },
                  {
                    text: config.buttons?.[1].text || 'OK',
                    style: config.buttons?.[1].style,
                    onPress: () => {
                      onDismiss();
                      onConfirm();
                    },
                  },
                ],
            {
              cancelable: false,
              userInterfaceStyle: theme.mode,
            },
          );
        } else {
          Alert.alert(
            config.title,
            config.message,
            [
              {
                text: config.buttons?.[1].text || 'OK',
                onPress: () => {
                  onDismiss();
                },
              },
            ],
            {
              cancelable: false,
              userInterfaceStyle: theme.mode,
            },
          );
        }
      }
    };
  };
};
