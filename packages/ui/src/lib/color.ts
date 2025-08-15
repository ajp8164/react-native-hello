import type { ColorValue } from 'react-native';

export const adjust = (color: ColorValue, amount: number) => {
  let c: string = '';
  if (typeof color === 'string') {
    c = color;
  }

  if (typeof color === 'number') {
    // Convert number to hex string with 8 digits (ARGB)
    c = '#' + (color as number).toString(16).padStart(8, '0');
  }

  return (
    '#' +
    c
      .replace(/^#/, '')
      .replace(/../g, color =>
        (
          '0' +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2),
      )
  );
};
