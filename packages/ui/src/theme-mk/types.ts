import { type ColorValue } from 'react-native';
import { type IStyle } from 'react-native-theme-mk';

export { type IStyle } from 'react-native-theme-mk';

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

export interface IFonts {
  bold: string;
  semiBold: string;
  medium: string;
  regular: string;
  light: string;
}

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

export interface IPalette {
  black: ColorValue;
  white: ColorValue;
  transparent: ColorValue;
  primary: ColorValue;
  secondary: ColorValue;
}

export interface IRadius {
  M: number;
}

export interface IShadows {
  glow: IShadow;
  normal: IShadow;
  shallow: IShadow;
}

export interface ISpacings {
  XXS: number;
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

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
  radius: IRadius;
  colors: IColor;
  fonts: IFonts;
  lineHeight: ILineHeights;
  spacing: ISpacings;
  fontSize: IFontSizes;
}

export interface IThemeManagerSchema extends IBaseThemeSchema {
  palette: IPalette;
  styles: IStyles;
  text: ITexts;
  shadow: IShadows;
}
