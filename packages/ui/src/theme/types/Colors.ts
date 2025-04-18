import '@rneui/themed';

export interface ColorSet {
  readonly white: string;
  readonly black: string;
  readonly stickyWhite: string;
  readonly stickyBlack: string;
  readonly transparent: string;

  readonly darkGray: string;
  readonly midGray: string;
  readonly lightGray: string;
  readonly subtleGray: string;
  readonly hintGray: string;
  readonly wispGray: string;

  readonly blackTransparentDarker: string;
  readonly blackTransparentDark: string;
  readonly blackTransparentMid: string;
  readonly blackTransparentLight: string;
  readonly blackTransparentSubtle: string;

  readonly whiteTransparentDarker: string;
  readonly whiteTransparentDark: string;
  readonly whiteTransparentMid: string;
  readonly whiteTransparentLight: string;
  readonly whiteTransparentSubtle: string;

  readonly kbAccessoryButtonText: string;

  readonly text: string;
  readonly textLink: string;

  readonly viewBackground: string;
  readonly viewAltBackground: string;
  readonly viewInvBackground: string;
}

declare module '@rneui/themed' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Colors extends ColorSet {}
}
