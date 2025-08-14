declare module 'theme-mk' {
  interface IColor {
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

  interface IFonts {
    bold: string;
    semiBold: string;
    medium: string;
    regular: string;
    light: string;
  }

  interface IFontSizes {
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

  interface ILineHeights {
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

  interface IPalette {
    black: ColorValue;
    white: ColorValue;
    transparent: ColorValue;
    primary: ColorValue;
    secondary: ColorValue;
  }

  interface IRadius {
    M: number;
  }

  interface IShadows {
    glow: IShadow;
    normal: IShadow;
    shallow: IShadow;
  }

  interface ISpacings {
    XXS: number;
    XS: number;
    S: number;
    M: number;
    L: number;
    XL: number;
    XXL: number;
  }

  interface IStyles {
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

  interface ITexts {
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
}
