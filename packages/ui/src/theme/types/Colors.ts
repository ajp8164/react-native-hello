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
  readonly assertive: string;
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
  readonly button: string;
  readonly buttonText: string;
  readonly checkboxActive: string;
  readonly checkboxInactive: string;
  readonly collapsibleBackground: string;
  readonly datePickerAccent: string;
  readonly kbAccessoryButtonText: string;
  readonly listItem: string;
  readonly listItemBorder: string;
  readonly listItemIcon: string;
  readonly listItemIconNav: string;
  readonly screenHeaderBackground: string;
  readonly screenHeaderButtonText: string;
  readonly segmentActive: string;
  readonly segmentBackground: string;
  readonly segmentBorder: string;
  readonly switchOffThumb: string;
  readonly switchOffTrack: string;
  readonly switchOnThumb: string;
  readonly switchOnTrack: string;
  readonly text: string;
  readonly textInv: string;
  readonly textLight: string;
  readonly textLink: string;
  readonly textPlaceholder: string;
  readonly viewBackground: string;
  readonly viewAltBackground: string;
  readonly viewInvBackground: string;
}

declare module '@rneui/themed' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Colors extends ColorSet {}
}
