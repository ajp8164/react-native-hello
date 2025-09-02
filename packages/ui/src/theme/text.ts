import { type IBaseThemeSchema, type ITexts } from './types';

export const createTextStyles = ({
  theme,
}: {
  theme: IBaseThemeSchema;
}): ITexts => ({
  h1: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H1,
    lineHeight: theme.lineHeight.H1,
    letterSpacing: theme.letterSpacing.H1,
  },
  h2: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H2,
    lineHeight: theme.lineHeight.H2,
    letterSpacing: theme.letterSpacing.H2,
  },
  h3: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H3,
    lineHeight: theme.lineHeight.H3,
    letterSpacing: theme.letterSpacing.H3,
  },
  h4: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H4,
    lineHeight: theme.lineHeight.H4,
    letterSpacing: theme.letterSpacing.H4,
  },
  h5: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H5,
    lineHeight: theme.lineHeight.H5,
    letterSpacing: theme.letterSpacing.H5,
  },
  h6: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H6,
    lineHeight: theme.lineHeight.H6,
    letterSpacing: theme.letterSpacing.H6,
  },
  xl: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.XL,
    lineHeight: theme.lineHeight.XL,
    letterSpacing: theme.letterSpacing.XL,
  },
  large: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.large,
    lineHeight: theme.lineHeight.large,
    letterSpacing: theme.letterSpacing.large,
  },
  normal: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.normal,
    lineHeight: theme.lineHeight.normal,
    letterSpacing: theme.letterSpacing.normal,
  },
  small: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.small,
    lineHeight: theme.lineHeight.small,
    letterSpacing: theme.letterSpacing.small,
  },
  tiny: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.tiny,
    lineHeight: theme.lineHeight.tiny,
    letterSpacing: theme.letterSpacing.tiny,
  },
});
