import { baseTheme } from './base-theme';
import { palette } from './palette';
import { shadow } from './shadow';
import { createElementsStyles } from './styles';
import { createTextStyles } from './text';
import { type IBaseThemeSchema, type IThemeManagerSchema } from './types';

export const themeBase: IBaseThemeSchema = {
  ...baseTheme,
  colors: {
    white: palette.white,
    black: palette.black,
    stickyWhite: palette.white,
    stickyBlack: palette.black,
    transparent: palette.transparent,

    darkGray: '#545454',
    midGray: '#787878',
    lightGray: '#aaaaaa',
    subtleGray: '#e5e5e5',
    hintGray: '#f0f0f0',
    wispGray: '#f8f8f8',

    assertive: '#ff1f1f',

    error: '#ff1f1f',
    info: '#0078fe',
    success: 'green',
    warning: 'yellow',

    blackTransparentDarker: 'rgba(0, 0, 0, 0.8)',
    blackTransparentDark: 'rgba(0, 0, 0, 0.7)',
    blackTransparentMid: 'rgba(0, 0, 0, 0.4)',
    blackTransparentLight: 'rgba(0, 0, 0, 0.2)',
    blackTransparentSubtle: 'rgba(0, 0, 0, 0.1)',

    whiteTransparentDarker: 'rgba(255, 255, 255, 0.9)',
    whiteTransparentDark: 'rgba(255, 255, 255, 0.7)',
    whiteTransparentMid: 'rgba(255, 255, 255, 0.5)',
    whiteTransparentLight: 'rgba(255, 255, 255, 0.3)',
    whiteTransparentSubtle: 'rgba(255, 255, 255, 0.05)',

    button: palette.primary,
    buttonText: palette.white,

    checkboxActive: palette.primary,
    checkboxInactive: palette.primary,

    collapsibleBackground: '#f0f0f0',

    datePickerAccent: palette.primary,

    kbAccessoryButtonText: palette.primary,

    listItem: palette.white,
    listItemBorder: '#e5e5e5',
    listItemIcon: palette.primary,
    listItemIconNav: '#878787',
    listItemSubtitle: '#878787',
    listItemTitle: '#303030',
    listItemValue: '#878787',

    screenHeaderBackground: palette.white,
    screenHeaderButtonText: palette.primary,
    screenHeaderTitle: palette.black,

    segmentActive: palette.white,
    segmentBackground: '#e2e1e6',
    segmentBorder: '#d5d4d9',

    switchOffThumb: palette.white,
    switchOffTrack: '#f2f2f2',
    switchOnThumb: palette.white,
    switchOnTrack: palette.primary,

    text: '#303030',
    textInv: palette.white,
    textLink: palette.primary,
    textPlaceholder: '#bbbbbb',

    viewBackground: '#f0f0f0',
    viewAltBackground: palette.white,
    viewInvBackground: palette.primary,
  },
};

export const lightTheme: IThemeManagerSchema = {
  ...themeBase,
  palette,
  text: createTextStyles({ theme: themeBase }),
  styles: createElementsStyles({ theme: themeBase }),
  shadow,
};
