import { Platform } from 'react-native';
import type { IShadows } from './types';

const glow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10,
  },
  android: {
    elevation: 10,
    backgroundColor: '#000000',
  },
});

const normal = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.45,
    shadowRadius: 4.27,
  },
  android: {
    elevation: 10,
    backgroundColor: '#000000',
  },
});

const shallow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.45,
    shadowRadius: 2,
  },
  android: {
    elevation: 5,
    backgroundColor: '#000000',
  },
});

export const shadow: IShadows = {
  glow,
  normal,
  shallow,
};
