import { type ColorValue } from 'react-native';
import { type IStyle } from 'react-native-theme-mk';
import type {
  IColor,
  IFonts,
  IFontSizes,
  ILineHeights,
  IPalette,
  IRadius,
  IShadows,
  ISpacings,
  IStyles,
  ITexts,
} from 'theme-mk';

export interface IThemeManagerTextStyle {
  color: ColorValue | string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

export type IShadow =
  | {
      shadowColor: string;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowRadius: number;
      shadowOpacity: number;
      elevation?: undefined;
    }
  | {
      elevation: number;
      shadowColor?: undefined;
      shadowOffset?: undefined;
      shadowRadius?: undefined;
      shadowOpacity?: undefined;
    }
  | undefined;

export interface IBaseThemeSchema {
  radius: Record<keyof IRadius, number>;
  colors: Record<keyof IColor, ColorValue>;
  fonts: Record<keyof IFonts, string>;
  lineHeight: Record<keyof ILineHeights, number>;
  spacing: Record<keyof ISpacings, number>;
  fontSize: Record<keyof IFontSizes, number>;
}

export interface IThemeManagerSchema extends IBaseThemeSchema {
  palette: Record<keyof IPalette, string>;
  styles: Record<keyof IStyles, IStyle>;
  text: Record<keyof ITexts, IThemeManagerTextStyle>;
  shadow: Record<keyof IShadows, IShadow>;
}
