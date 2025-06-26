import { type CreateThemeOptions, createTheme } from '@rn-vui/themed';

export const theme: CreateThemeOptions = {
  darkColors: {
    white: '#000000',
    black: '#ffffffde',
    stickyWhite: '#ffffff',
    stickyBlack: '#000000',
    transparent: '#00000000',

    darkGray: '#ffffffde',
    midGray: '#787878',
    lightGray: '#787878',
    subtleGray: '#101010',
    hintGray: '#101010',
    wispGray: '#101010',

    assertive: '#ff1f1f',

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

    button: '#0078fe',
    buttonText: '#ffffff',

    checkboxActive: '#0078fe',
    checkboxInactive: '#0078fe',

    collapsibleBackground: '#000000',

    datePickerAccent: '#0078fe',

    kbAccessoryButtonText: '#0078fe',

    listItem: '#303030',
    listItemBorder: '#1b1b1b',
    listItemIcon: '#0078fe',
    listItemIconNav: '#ffffff',

    screenHeaderBackground: '#202020',
    screenHeaderButtonText: '#ffffff',

    segmentActive: '#787878',
    segmentBackground: '#1a1a17',
    segmentBorder: '#303030',

    switchOffThumb: '#ffffff',
    switchOffTrack: '#787878',
    switchOnThumb: '#ffffff',
    switchOnTrack: '#0078fe',

    text: '#ffffffde',
    textInv: '#000000',
    textLink: '#0078fe',
    textPlaceholder: '#878787',

    viewBackground: '#000000',
    viewAltBackground: '#000000',
    viewInvBackground: '#0078fe',
  },
  lightColors: {
    white: '#ffffff',
    black: '#000000',
    stickyWhite: '#ffffff',
    stickyBlack: '#000000',
    transparent: '#00000000',

    darkGray: '#545454',
    midGray: '#787878',
    lightGray: '#aaaaaa',
    subtleGray: '#e5e5e5',
    hintGray: '#f0f0f0',
    wispGray: '#f8f8f8',

    assertive: '#ff1f1f',

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

    button: '#0078fe',
    buttonText: '#ffffff',

    checkboxActive: '#0078fe',
    checkboxInactive: '#0078fe',

    collapsibleBackground: '#f0f0f0',

    datePickerAccent: '#0078fe',

    kbAccessoryButtonText: '#0078fe',

    listItem: '#ffffff',
    listItemBorder: '#e5e5e5',
    listItemIcon: '#0078fe',
    listItemIconNav: '#000000',

    screenHeaderBackground: '#ffffff',
    screenHeaderButtonText: '#000000',

    segmentActive: '#ffffff',
    segmentBackground: '#e2e1e6',
    segmentBorder: '#d5d4d9',

    switchOffThumb: '#ffffff',
    switchOffTrack: '#f2f2f2',
    switchOnThumb: '#ffffff',
    switchOnTrack: '#0078fe',

    text: '#303030',
    textInv: '#ffffff',
    textLink: '#0078fe',
    textPlaceholder: '#878787',

    viewBackground: '#f0f0f0',
    viewAltBackground: '#ffffff',
    viewInvBackground: '#0078fe',
  },
};

createTheme(theme);
