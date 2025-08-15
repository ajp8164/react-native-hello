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
      shadowColor: ColorValue | string;
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
  white: ColorValue | string;
  black: ColorValue | string;
  stickyWhite: ColorValue | string;
  stickyBlack: ColorValue | string;
  transparent: ColorValue | string;
  darkGray: ColorValue | string;
  midGray: ColorValue | string;
  lightGray: ColorValue | string;
  subtleGray: ColorValue | string;
  hintGray: ColorValue | string;
  wispGray: ColorValue | string;
  assertive: ColorValue | string;
  error: ColorValue | string;
  info: ColorValue | string;
  success: ColorValue | string;
  warning: ColorValue | string;
  blackTransparentDarker: ColorValue | string;
  blackTransparentDark: ColorValue | string;
  blackTransparentMid: ColorValue | string;
  blackTransparentLight: ColorValue | string;
  blackTransparentSubtle: ColorValue | string;
  whiteTransparentDarker: ColorValue | string;
  whiteTransparentDark: ColorValue | string;
  whiteTransparentMid: ColorValue | string;
  whiteTransparentLight: ColorValue | string;
  whiteTransparentSubtle: ColorValue | string;
  button: ColorValue | string;
  buttonText: ColorValue | string;
  checkboxActive: ColorValue | string;
  checkboxInactive: ColorValue | string;
  collapsibleBackground: ColorValue | string;
  datePickerAccent: ColorValue | string;
  kbAccessoryButtonText: ColorValue | string;
  listItem: ColorValue | string;
  listItemBorder: ColorValue | string;
  listItemIcon: ColorValue | string;
  listItemIconNav: ColorValue | string;
  listItemSubtitle: ColorValue | string;
  listItemTitle: ColorValue | string;
  listItemValue: ColorValue | string;
  screenHeaderBackground: ColorValue | string;
  screenHeaderButtonText: ColorValue | string;
  screenHeaderTitle: ColorValue | string;
  segmentActive: ColorValue | string;
  segmentBackground: ColorValue | string;
  segmentBorder: ColorValue | string;
  switchOffThumb: ColorValue | string;
  switchOffTrack: ColorValue | string;
  switchOnThumb: ColorValue | string;
  switchOnTrack: ColorValue | string;
  text: ColorValue | string;
  textInv: ColorValue | string;
  textLink: ColorValue | string;
  textPlaceholder: ColorValue | string;
  viewBackground: ColorValue | string;
  viewAltBackground: ColorValue | string;
  viewInvBackground: ColorValue | string;
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
  black: ColorValue | string;
  white: ColorValue | string;
  transparent: ColorValue | string;
  primary: ColorValue | string;
  secondary: ColorValue | string;
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
