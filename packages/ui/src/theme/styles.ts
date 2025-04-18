import { Dimensions, Platform } from 'react-native';

import type { Styles } from './types/Styles';
import { makeStyles } from '@rneui/themed';

export const fontFamily = 'WorkSans-Regular';
export const fontFamilyBold = 'WorkSans-Bold';
export const fontFamilyLight = 'WorkSans-Light';
export const fontFamilyMedium = 'WorkSans-Medium';
export const fontFamilySemiBold = 'WorkSans-SemiBold';

export const fontSizes = {
  tiny: 12,
  small: 14,
  normal: 16,
  large: 18,
  xl: 26,
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
      fontSize: fontSizes.xl,
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
