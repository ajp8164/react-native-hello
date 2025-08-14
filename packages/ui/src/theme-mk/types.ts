import { type ColorValue } from 'react-native';
import { type IStyle } from 'react-native-theme-mk';

export interface IThemeManagerTextStyle {
  color: ColorValue | string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

export type IShadow =
  | {
      shadowColor: string;
      shadowOffset: {
        width: number;
        height: number;
      };
      shadowRadius: number;
      shadowOpacity: number;
      elevation?: undefined;
    }
  | {
      elevation: number;
      shadowColor?: undefined;
      shadowOffset?: undefined;
      shadowRadius?: undefined;
      shadowOpacity?: undefined;
    }
  | undefined;

export interface IBaseThemeSchema {
  radius: Record<string, number>;
  colors: Record<string, ColorValue>;
  fonts: Record<string, string>;
  lineHeight: Record<string, number>;
  spacing: Record<string, number>;
  fontSize: Record<string, number>;
}

export interface IThemeManagerSchema extends IBaseThemeSchema {
  palette: Record<string, string>;
  styles: Record<string, IStyle>;
  text: Record<string, IThemeManagerTextStyle>;
  shadow: Record<string, IShadow>;
}
