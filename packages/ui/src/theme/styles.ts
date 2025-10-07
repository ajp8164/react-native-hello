import { type IBaseThemeSchema, type IStyles } from './types';
import { Platform } from 'react-native';

export const createElementsStyles = ({
  theme,
}: {
  theme: IBaseThemeSchema;
}): IStyles => ({
  /**
   * Buttons
   */

  button: {
    backgroundColor: theme.colors.button,
    borderRadius: theme.radius.M,
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
  buttonClear: {
    backgroundColor: theme.colors.transparent,
    borderWidth: 0,
  },
  buttonClearTitle: {
    fontSize: theme.fontSize.normal,
    fontWeight: '400',
    fontFamily: theme.fonts.regular,
    color: theme.colors.button,
  },
  buttonClearDisabled: {
    backgroundColor: theme.colors.transparent,
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
    paddingHorizontal: 5,
    minWidth: 0,
    justifyContent: 'flex-start',
  },
  buttonScreenHeaderContainerLeft: {
    left: -12,
  },
  buttonScreenHeaderContainerRight: {
    right: -12,
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
    paddingHorizontal: 5,
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

  textDim: {
    opacity: 0.4,
  },

  textLink: {
    color: theme.colors.textLink,
    textDecorationLine: 'underline',
  },
});
