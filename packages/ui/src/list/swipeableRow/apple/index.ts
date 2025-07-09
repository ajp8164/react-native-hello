import { type AlertConfig } from '../../../hooks';
import { type ReactElement } from 'react';

export * from './AppleSwipeableRow';

export interface EditAction {
  ButtonComponent?: ReactElement;
  op?: 'open-swipeable';
  onPressEdit?: () => void;
  reorderable?: boolean;
}

export interface SwipeableAction {
  ButtonComponent?: ReactElement;
  color: string;
  confirmation?: AlertConfig;
  onPress: () => void;
  op?: 'remove';
  text?: string;
  totalWidth?: number;
  x?: number;
}
