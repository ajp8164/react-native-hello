import { Dimensions, Platform } from 'react-native';

import type { Styles } from './types/Styles';
import { makeStyles } from '@rneui/themed';

export const fontFamily = 'WorkSans-Regular';
export const fontFamilyBold = 'WorkSans-Bold';
export const fontFamilyLight = 'WorkSans-Light';
export const fontFamilyMedium = 'WorkSans-Medium';
export const fontFamilySemiBold = 'WorkSans-SemiBold';

export const fontSizes = {
  tiny: 10,
  small: 12,
  normal: 16,
  large: 18,
  XL: 20,
  headingXL: 45,
  heading1: 30,
  heading2: 26,
  heading3: 22,
  heading4: 20,
  heading5: 18,
};

export const viewport = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

export const useStyles = makeStyles(
  (theme): Styles => ({
    /**
     * Constants
     */

    headerBar: {
      ...Platform.select({
        android: {
          height: 44,
        },
        ios: {
          height: 44,
        },
      }),
    },
    headerBarLarge: {
      ...Platform.select({
        android: {
          height: 0,
        },
        ios: {
          height: 96,
        },
      }),
    },
    navigationBottomTabBar: {
      height: 83, // iOS constant for use outside of nav container
    },
    statusBar: {
      ...Platform.select({
        android: {
          height: 20,
        },
        ios: {
          height: 20,
        },
      }),
    },

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
        fontSize: fontSizes.normal,
        fontFamily,
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
        fontSize: fontSizes.normal,
        fontWeight: '400',
        fontFamily,
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
        fontSize: fontSizes.normal,
        fontFamily,
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
        fontSize: fontSizes.small,
        fontFamily,
        fontWeight: '500',
        lineHeight: 14,
        color: theme.colors.buttonText,
      },

    /**
     * Text
     */

    textHeadingXL: {
      color: theme.colors.text,
      marginVertical: 10,
      fontSize: fontSizes.headingXL,
      fontFamily: fontFamilyBold,
    },
    textHeading1: {
      color: theme.colors.text,
      marginVertical: 10,
      fontSize: fontSizes.heading1,
      fontFamily: fontFamilyBold,
    },
    textHeading2: {
      color: theme.colors.text,
      marginVertical: 10,
      fontSize: fontSizes.heading2,
      fontFamily: fontFamilyBold,
    },
    textHeading3: {
      color: theme.colors.text,
      marginVertical: 10,
      fontSize: fontSizes.heading3,
      fontFamily: fontFamilyBold,
    },
    textHeading4: {
      color: theme.colors.text,
      marginVertical: 4,
      fontSize: fontSizes.heading4,
      fontFamily: fontFamilyBold,
    },
    textHeading5: {
      color: theme.colors.text,
      marginVertical: 4,
      fontSize: fontSizes.heading5,
      fontFamily: fontFamilyBold,
    },
    textLarge: {
      color: theme.colors.text,
      fontSize: fontSizes.large,
      fontFamily,
      fontWeight: 'normal',
    },
    textXL: {
      color: theme.colors.text,
      fontSize: fontSizes.XL,
      fontFamily,
      fontWeight: 'normal',
    },
    textScreenTitle: {
      color: theme.colors.black,
      fontSize: 17,
      fontFamily,
      fontWeight: '600',
    },
    textNormal: {
      color: theme.colors.text,
      fontSize: fontSizes.normal,
      fontFamily,
      fontWeight: 'normal',
    },
    textSmall: {
      color: theme.colors.text,
      fontSize: fontSizes.small,
      fontFamily,
      fontWeight: 'normal',
    },
    textTiny: {
      color: theme.colors.text,
      fontSize: fontSizes.tiny,
      fontFamily,
      fontWeight: 'normal',
    },
    textLight: {
      fontFamily: fontFamilyLight,
      fontWeight: 'normal',
    },
    textMedium: {
      color: theme.colors.text,
      fontFamily: fontFamilyMedium,
      fontWeight: 'normal',
    },
    textSemiBold: {
      fontFamily: fontFamilySemiBold,
      fontWeight: 'normal',
    },
    textBold: {
      fontFamily: fontFamilyBold,
      fontWeight: '600',
    },
    textDim: {
      opacity: 0.4,
    },
    textPlaceholder: {
      opacity: 0.4,
    },
    textLink: {
      color: theme.colors.textLink,
      textDecorationLine: 'underline',
    },

    /**
     * Shadow
     */

    shadow: {
      shadowColor: theme.colors.stickyBlack,
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.45,
          shadowRadius: 4.27,
        },
        android: {
          elevation: 10,
          backgroundColor: theme.colors.black,
        },
      }),
    },
    shadowGlow: {
      shadowColor: theme.colors.black,
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowopacity: 0.44,
          shadowRadius: 10,
        },
        android: {
          elevation: 10,
          backgroundColor: theme.colors.black,
        },
      }),
    },
    shadowShallow: {
      shadowColor: theme.colors.stickyBlack,
      ...Platform.select({
        ios: {
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.45,
          shadowRadius: 2,
        },
        android: {
          elevation: 5,
          backgroundColor: theme.colors.black,
        },
      }),
    },
  }),
);
