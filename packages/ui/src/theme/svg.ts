import { ReactNativeHello } from '@react-native-hello/core';
import type { SVGImages } from '@react-native-hello/common';
import iconMissing from './img/icon-missing.svg';

type SvgOptions = {
  fill?: boolean;
  stroke?: boolean;
};

export const getColoredSvg = (which: string, opts?: SvgOptions) => {
  const fill = opts?.fill === undefined ? true : false;
  const stroke = opts?.stroke === undefined ? true : false;

  // Replace fill and stroke colors with 'currentColor' literal.
  // Allows react-native-svg to replace the color using style color property.
  let i = getSvg(which);
  i = fill ? i.replace(/(s|fill)="(.[0-9a-fA-F]*)"/g, 'fill="currentColor"') : i;
  i = stroke ? i.replace(/(s|stroke)="(.[0-9a-fA-F]*)"/g, 'stroke="currentColor"') : i;
  return i;
};

export const getSvg = (which: string): string => {
  const svgImages = ReactNativeHello.get<SVGImages>('svgImages');
  if (svgImages[which as keyof typeof svgImages]) {
    return svgImages[which as keyof typeof svgImages];
  } else {
    return iconMissing;
  }
};
