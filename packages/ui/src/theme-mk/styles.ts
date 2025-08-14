import { type IBaseThemeSchema } from './types';
import { Platform } from 'react-native';
import { type IStyle } from 'react-native-theme-mk';
import type { IStyles } from 'theme-mk';

export const createElementsStyles = ({
  theme,
}: {
  theme: IBaseThemeSchema;
}): Record<keyof IStyles, IStyle> => ({
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
});
