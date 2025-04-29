import { type AlertConfig } from '../hooks';

export const BiometricsError: AlertConfig = {
  title: 'Face ID Error',
  message: 'Face ID is not available. Please try again.',
};

export const LogoutConfirmation: AlertConfig = {
  title: 'Logout?',
  message: 'Are you sure you want to log out?',
  buttons: [{ text: 'Cancel' }, { text: 'Log Out', style: 'destructive' }],
};

export const NetworkError: AlertConfig = {
  title: 'Network Error',
  message: 'Please check your internet connection and try again.',
};

export const InternalError: AlertConfig = {
  title: 'Processing Error',
  message: "It's not you, it's us. Please try again.",
};

export const PushNotificationsError: AlertConfig = {
  title: 'Push Notifications Error',
  message: 'Push notifications could not be enabled. Please try again.',
};
