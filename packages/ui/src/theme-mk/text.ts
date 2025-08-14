import type { ITexts } from 'theme-mk';
import { type IBaseThemeSchema, type IThemeManagerTextStyle } from './types';

export const createTextStyles = ({
  theme,
}: {
  theme: IBaseThemeSchema;
}): Record<keyof ITexts, IThemeManagerTextStyle> => ({
  h1: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H1,
    lineHeight: theme.lineHeight.H1,
  },
  h2: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H2,
    lineHeight: theme.lineHeight.H2,
  },
  h3: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H3,
    lineHeight: theme.lineHeight.H3,
  },
  h4: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H4,
    lineHeight: theme.lineHeight.H4,
  },
  h5: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H5,
    lineHeight: theme.lineHeight.H5,
  },
  h6: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSize.H6,
    lineHeight: theme.lineHeight.H6,
  },
  xl: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.XL,
    lineHeight: theme.lineHeight.XL,
  },
  large: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.large,
    lineHeight: theme.lineHeight.large,
  },
  normal: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.normal,
    lineHeight: theme.lineHeight.normal,
  },
  small: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.small,
    lineHeight: theme.lineHeight.small,
  },
  tiny: {
    color: theme.colors.text,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSize.tiny,
    lineHeight: theme.lineHeight.tiny,
  },
});
