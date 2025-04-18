import { type CreateThemeOptions, createTheme } from '@rneui/themed';

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

    kbAccessoryButtonText: '#0078fe',

    text: '#ffffffde',
    textLink: '#0078fe',

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

    kbAccessoryButtonText: '#0078fe',

    text: '#303030',
    textLink: '#0078fe',

    viewBackground: '#f0f0f0',
    viewAltBackground: '#ffffff',
    viewInvBackground: '#0078fe',
  },
};

createTheme(theme);
