import { type IDevice as IMKDevice, type IStyle } from 'react-native-theme-mk';

export { type IStyle } from 'react-native-theme-mk';

export interface IThemeManagerTextStyle {
  color: string;
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
  white: string;
  black: string;
  stickyWhite: string;
  stickyBlack: string;
  transparent: string;
  darkGray: string;
  midGray: string;
  lightGray: string;
  subtleGray: string;
  hintGray: string;
  wispGray: string;
  assertive: string;
  error: string;
  info: string;
  success: string;
  warning: string;
  blackTransparentDarker: string;
  blackTransparentDark: string;
  blackTransparentMid: string;
  blackTransparentLight: string;
  blackTransparentSubtle: string;
  whiteTransparentDarker: string;
  whiteTransparentDark: string;
  whiteTransparentMid: string;
  whiteTransparentLight: string;
  whiteTransparentSubtle: string;
  button: string;
  buttonText: string;
  checkboxActive: string;
  checkboxInactive: string;
  collapsibleBackground: string;
  datePickerAccent: string;
  kbAccessoryButtonText: string;
  listItem: string;
  listItemBorder: string;
  listItemIcon: string;
  listItemIconNav: string;
  listItemSubtitle: string;
  listItemTitle: string;
  listItemValue: string;
  screenHeaderBackground: string;
  screenHeaderButtonText: string;
  screenHeaderTitle: string;
  segmentActive: string;
  segmentBackground: string;
  segmentBorder: string;
  switchOffThumb: string;
  switchOffTrack: string;
  switchOnThumb: string;
  switchOnTrack: string;
  text: string;
  textInv: string;
  textLink: string;
  textPlaceholder: string;
  viewBackground: string;
  viewAltBackground: string;
  viewInvBackground: string;
}

export interface IDevice extends IMKDevice {
  bottomTabBarHeight: number;
  headerBar: { height: number };
  headerBarLarge: { height: number };
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
  black: string;
  white: string;
  transparent: string;
  primary: string;
  secondary: string;
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
  textDim: IStyle;
  textLink: IStyle;
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
