import { type IBaseThemeSchema, type IStylesKeys } from './types';
import { Platform } from 'react-native';
import { type IStyle } from 'react-native-theme-mk';

export const createElementsStyles = ({
  theme,
}: {
  theme: IBaseThemeSchema;
}): Record<IStylesKeys, IStyle> => ({
  /**
   * Buttons
   */

  button: {
    backgroundColor: theme.colors.button,
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 15,
    width: '100%',
    alignSelf: 'center',
  },
  buttonTitle: {
    fontSize: theme.fontSize.normal,
    fontFamily: theme.fonts.regular,
    color: theme.colors.buttonText,
    fontWeight: '600',
    ...Platform.select({
      ios: {
        marginTop: 0,
      },
      android: {
        marginTop: -2,
      },
    }),
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonOutline: {
    backgroundColor: theme.colors.transparent,
    borderColor: theme.colors.button,
    borderWidth: 2,
  },
  buttonOutlineTitle: {
    fontSize: theme.fontSize.normal,
    fontWeight: '400',
    fontFamily: theme.fonts.regular,
    color: theme.colors.button,
  },
  buttonOutlineDisabled: {
    backgroundColor: theme.colors.transparent,
    opacity: 0.4,
  },
  buttonScreenHeader: {
    backgroundColor: theme.colors.transparent,
    height: 40,
    paddingHorizontal: 0,
    minWidth: 0,
    justifyContent: 'flex-start',
  },
  buttonScreenHeaderTitle: {
    color: theme.colors.screenHeaderButtonText,
    fontSize: theme.fontSize.normal,
    fontFamily: theme.fonts.regular,
    ...Platform.select({
      ios: {
        marginTop: 0,
      },
      android: {
        marginTop: -2,
      },
    }),
  },
  buttonScreenHeaderDisabled: {
    backgroundColor: theme.colors.transparent,
    height: 40,
    paddingHorizontal: 0,
    minWidth: 0,
    justifyContent: 'flex-start',
    opacity: 0.4,
  },
  buttonSmall: {
    width: 'auto',
    height: 35,
    padding: 0,
  },
  buttonSmallContainer: {
    alignSelf: 'center',
    marginTop: 20,
    minWidth: 0,
  },
  buttonSmallTitle: {
    fontSize: theme.fontSize.small,
    fontFamily: theme.fonts.regular,
    fontWeight: '500',
    lineHeight: 14,
    color: theme.colors.buttonText,
  },

  /**
   * Text
   */

  // textHeadingXL: {
  //   color: theme.colors.text,
  //   marginVertical: 10,
  //   fontSize: theme.fontSize.H1,
  //   fontFamily: theme.fonts.bold,
  // },
  // textHeading1: {
  //   color: theme.colors.text,
  //   marginVertical: 10,
  //   fontSize: theme.fontSize.H1,
  //   fontFamily: theme.fonts.bold,
  // },
  // textHeading2: {
  //   color: theme.colors.text,
  //   marginVertical: 10,
  //   fontSize: theme.fontSize.H2,
  //   fontFamily: theme.fonts.bold,
  // },
  // textHeading3: {
  //   color: theme.colors.text,
  //   marginVertical: 10,
  //   fontSize: theme.fontSize.H3,
  //   fontFamily: theme.fonts.bold,
  // },
  // textHeading4: {
  //   color: theme.colors.text,
  //   marginVertical: 4,
  //   fontSize: theme.fontSize.H4,
  //   fontFamily: theme.fonts.bold,
  // },
  // textHeading5: {
  //   color: theme.colors.text,
  //   marginVertical: 4,
  //   fontSize: theme.fontSize.H5,
  //   fontFamily: theme.fonts.bold,
  // },
  // textLarge: {
  //   color: theme.colors.text,
  //   fontSize: theme.fontSize.large,
  //   fontFamily: theme.fonts.regular,
  //   fontWeight: 'normal',
  // },
  // textXL: {
  //   color: theme.colors.text,
  //   fontSize: theme.fontSize.XL,
  //   fontFamily: theme.fonts.regular,
  //   fontWeight: 'normal',
  // },
  // textScreenTitle: {
  //   color: theme.colors.black,
  //   fontSize: 17,
  //   fontFamily: theme.fonts.regular,
  //   fontWeight: '600',
  // },
  // textNormal: {
  //   color: theme.colors.text,
  //   fontSize: theme.fontSize.normal,
  //   fontFamily: theme.fonts.regular,
  //   fontWeight: 'normal',
  // },
  // textSmall: {
  //   color: theme.colors.text,
  //   fontSize: theme.fontSize.small,
  //   fontFamily: theme.fonts.regular,
  //   fontWeight: 'normal',
  // },
  // textTiny: {
  //   color: theme.colors.text,
  //   fontSize: theme.fontSize.tiny,
  //   fontFamily: theme.fonts.regular,
  //   fontWeight: 'normal',
  // },
  // textLight: {
  //   fontFamily: theme.fonts.light,
  //   fontWeight: 'normal',
  // },
  // textMedium: {
  //   color: theme.colors.text,
  //   fontFamily: theme.fonts.medium,
  //   fontWeight: 'normal',
  // },
  // textSemiBold: {
  //   fontFamily: theme.fonts.semiBold,
  //   fontWeight: 'normal',
  // },
  // textBold: {
  //   fontFamily: theme.fonts.bold,
  //   fontWeight: '600',
  // },
  // textDim: {
  //   opacity: 0.4,
  // },
  // textPlaceholder: {
  //   opacity: 0.4,
  // },
  // textLink: {
  //   color: theme.colors.textLink,
  //   textDecorationLine: 'underline',
  // },
});
