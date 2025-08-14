import { baseTheme } from './base-theme';
import { palette } from './palette';
import { shadow } from './shadow';
import { createElementsStyles } from './styles';
import { createTextStyles } from './text';
import { type IBaseThemeSchema, type IThemeManagerSchema } from './types';

export const themeBase: IBaseThemeSchema = {
  ...baseTheme,
  colors: {
    white: palette.black,
    black: palette.white,
    stickyWhite: palette.white,
    stickyBlack: palette.black,
    transparent: palette.transparent,

    darkGray: '#ffffffde',
    midGray: '#787878',
    lightGray: '#787878',
    subtleGray: '#101010',
    hintGray: '#101010',
    wispGray: '#101010',

    assertive: '#ff1f1f',

    error: '#ff1f1f',
    info: '#0078fe',
    success: '#00ff00',
    warning: '#ffff00',

    blackTransparentDarker: 'rgba(255, 255, 255, 0.9)',
    blackTransparentDark: 'rgba(255, 255, 255, 0.7)',
    blackTransparentMid: 'rgba(255, 255, 255, 0.5)',
    blackTransparentLight: 'rgba(255, 255, 255, 0.3)',
    blackTransparentSubtle: 'rgba(255, 255, 255, 0.05)',

    whiteTransparentDarker: 'rgba(0, 0, 0, 0.8)',
    whiteTransparentDark: 'rgba(0, 0, 0, 0.7)',
    whiteTransparentMid: 'rgba(0, 0, 0, 0.4)',
    whiteTransparentLight: 'rgba(0, 0, 0, 0.2)',
    whiteTransparentSubtle: 'rgba(0, 0, 0, 0.1)',

    button: palette.primary,
    buttonText: palette.white,

    checkboxActive: palette.primary,
    checkboxInactive: palette.primary,

    collapsibleBackground: palette.black,

    datePickerAccent: palette.primary,

    kbAccessoryButtonText: palette.primary,

    listItem: '#303030',
    listItemBorder: '#1b1b1b',
    listItemIcon: palette.primary,
    listItemIconNav: palette.white,
    listItemSubtitle: '#878787',
    listItemTitle: '#ffffffde',
    listItemValue: '#878787',

    screenHeaderBackground: '#202020',
    screenHeaderButtonText: palette.primary,
    screenHeaderTitle: palette.white,

    segmentActive: '#787878',
    segmentBackground: '#1a1a17',
    segmentBorder: '#303030',

    switchOffThumb: palette.white,
    switchOffTrack: '#787878',
    switchOnThumb: palette.white,
    switchOnTrack: palette.primary,

    text: '#ffffffde',
    textInv: palette.white,
    textLink: palette.primary,
    textPlaceholder: '#bbbbbb',

    viewBackground: palette.black,
    viewAltBackground: palette.black,
    viewInvBackground: palette.primary,
  },
};

export const darkTheme: IThemeManagerSchema = {
  ...themeBase,
  palette,
  text: createTextStyles({ theme: themeBase }),
  styles: createElementsStyles({ theme: themeBase }),
  shadow,
};
