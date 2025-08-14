import { type ColorValue } from 'react-native';
import { type IStyle } from 'react-native-theme-mk';

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

export type IColorKeys = keyof IColor;
export interface IColor {
  white: ColorValue;
  black: ColorValue;
  stickyWhite: ColorValue;
  stickyBlack: ColorValue;
  transparent: ColorValue;
  darkGray: ColorValue;
  midGray: ColorValue;
  lightGray: ColorValue;
  subtleGray: ColorValue;
  hintGray: ColorValue;
  wispGray: ColorValue;
  assertive: ColorValue;
  error: ColorValue;
  info: ColorValue;
  success: ColorValue;
  warning: ColorValue;
  blackTransparentDarker: ColorValue;
  blackTransparentDark: ColorValue;
  blackTransparentMid: ColorValue;
  blackTransparentLight: ColorValue;
  blackTransparentSubtle: ColorValue;
  whiteTransparentDarker: ColorValue;
  whiteTransparentDark: ColorValue;
  whiteTransparentMid: ColorValue;
  whiteTransparentLight: ColorValue;
  whiteTransparentSubtle: ColorValue;
  button: ColorValue;
  buttonText: ColorValue;
  checkboxActive: ColorValue;
  checkboxInactive: ColorValue;
  collapsibleBackground: ColorValue;
  datePickerAccent: ColorValue;
  kbAccessoryButtonText: ColorValue;
  listItem: ColorValue;
  listItemBorder: ColorValue;
  listItemIcon: ColorValue;
  listItemIconNav: ColorValue;
  listItemSubtitle: ColorValue;
  listItemTitle: ColorValue;
  listItemValue: ColorValue;
  screenHeaderBackground: ColorValue;
  screenHeaderButtonText: ColorValue;
  screenHeaderTitle: ColorValue;
  segmentActive: ColorValue;
  segmentBackground: ColorValue;
  segmentBorder: ColorValue;
  switchOffThumb: ColorValue;
  switchOffTrack: ColorValue;
  switchOnThumb: ColorValue;
  switchOnTrack: ColorValue;
  text: ColorValue;
  textInv: ColorValue;
  textLink: ColorValue;
  textPlaceholder: ColorValue;
  viewBackground: ColorValue;
  viewAltBackground: ColorValue;
  viewInvBackground: ColorValue;
}

export type IFontsKeys = keyof IFonts;
export interface IFonts {
  bold: string;
  semiBold: string;
  medium: string;
  regular: string;
  light: string;
}

export type IFontSizesKeys = keyof IFontSizes;
export interface IFontSizes {
  H1: number;
  H2: number;
  H3: number;
  H4: number;
  H5: number;
  H6: number;
  XL: number;
  large: number;
  normal: number;
  small: number;
  tiny: number;
}

export type ILineHeightsKeys = keyof ILineHeights;
export interface ILineHeights {
  H1: number;
  H2: number;
  H3: number;
  H4: number;
  H5: number;
  H6: number;
  XL: number;
  large: number;
  normal: number;
  small: number;
  tiny: number;
}

export type IPaletteKeys = keyof IPalette;
export interface IPalette {
  black: ColorValue;
  white: ColorValue;
  primary: ColorValue;
  secondary: ColorValue;
  transparent: ColorValue;
}

export type IRadiusKeys = keyof IRadius;
export interface IRadius {
  M: number;
}

export type IShadowsKeys = keyof IShadows;
export interface IShadows {
  glow: IShadow;
  normal: IShadow;
  shallow: IShadow;
}

export type ISpacingsKeys = keyof ISpacings;
export interface ISpacings {
  XXS: number;
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

export type IStylesKeys = keyof IStyles;
export interface IStyles {
  button: IStyle;
  buttonTitle: IStyle;
  buttonDisabled: IStyle;
  buttonOutline: IStyle;
  buttonOutlineTitle: IStyle;
  buttonOutlineDisabled: IStyle;
  buttonScreenHeader: IStyle;
  buttonScreenHeaderTitle: IStyle;
  buttonScreenHeaderDisabled: IStyle;
  buttonSmall: IStyle;
  buttonSmallContainer: IStyle;
  buttonSmallTitle: IStyle;
}

export type ITextsKeys = keyof ITexts;
export interface ITexts {
  h1: IThemeManagerTextStyle;
  h2: IThemeManagerTextStyle;
  h3: IThemeManagerTextStyle;
  h4: IThemeManagerTextStyle;
  h5: IThemeManagerTextStyle;
  h6: IThemeManagerTextStyle;
  xl: IThemeManagerTextStyle;
  large: IThemeManagerTextStyle;
  normal: IThemeManagerTextStyle;
  small: IThemeManagerTextStyle;
  tiny: IThemeManagerTextStyle;
}

export interface IBaseThemeSchema {
  radius: Record<IRadiusKeys, number>;
  colors: Record<IColorKeys, ColorValue>;
  fonts: Record<IFontsKeys, string>;
  lineHeight: Record<ILineHeightsKeys, number>;
  spacing: Record<ISpacingsKeys, number>;
  fontSize: Record<IFontSizesKeys, number>;
}

export interface IThemeManagerSchema extends IBaseThemeSchema {
  palette: Record<IPaletteKeys, string>;
  styles: Record<IStylesKeys, IStyle>;
  text: Record<ITextsKeys, IThemeManagerTextStyle>;
  shadow: Record<IShadowsKeys, IShadow>;
}
