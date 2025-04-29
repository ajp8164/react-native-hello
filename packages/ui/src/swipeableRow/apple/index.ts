import { type AlertConfig } from '../../hooks';
import { type ReactElement } from 'react';

export * from './AppleSwipeableRow';

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
