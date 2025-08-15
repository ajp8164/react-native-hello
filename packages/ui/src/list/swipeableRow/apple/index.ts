import { type ReactElement } from 'react';
import type { ColorValue } from 'react-native';

export * from './AppleSwipeableRow';

export interface SwipeableAction {
  ButtonComponent?: ReactElement;
  color: ColorValue;
  confirmation?: () => Promise<boolean>;
  onPress: () => void;
  op?: 'remove';
  text?: string;
  totalWidth?: number;
  x?: number;
}
