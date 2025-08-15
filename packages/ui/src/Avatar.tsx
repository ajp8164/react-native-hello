import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  type ImageSourcePropType,
  type ImageStyle,
  type ImageProps,
  View,
} from 'react-native';
import { ThemeManager } from './theme';

export const avatarSizes = {
  small: 34,
  medium: 50,
  large: 75,
  xlarge: 150,
};

export interface Avatar {
  avatarStyle?: ImageStyle;
  children?: React.ReactElement;
  containerStyle?: StyleProp<ViewStyle>;
  Component?: typeof React.Component;
  Icon?: React.ReactElement;
  imageProps?: ImageProps;
  ImageComponent?: React.ComponentClass;
  overlayContainerStyle?: StyleProp<TextStyle>;
  onPress?(): void;
  onLongPress?(): void;
  CustomContent?: React.ReactElement;
  rounded?: boolean;
  source?: ImageSourcePropType;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  size?: ('small' | 'medium' | 'large' | 'xlarge') | number;
}

const AvatarTitle = ({
  size,
  title,
  titleStyle,
}: Pick<Avatar, 'title' | 'titleStyle' | 'size'>) => {
  const width =
    typeof size === 'number'
      ? size
      : (size && avatarSizes[size]) || avatarSizes.small;
  const titleSize = width / 2;

  return (
    <Text style={StyleSheet.flatten([{ fontSize: titleSize }, titleStyle])}>
      {title}
    </Text>
  );
};

const Avatar = (props: Avatar) => {
  const {
    avatarStyle,
    children,
    containerStyle,
    CustomContent,
    Icon,
    imageProps,
    onPress,
    overlayContainerStyle,
    rounded,
    size = 'small',
    source,
    title,
    titleStyle,
    ...rest
  } = props;

  const s = useStyles();

  const width =
    typeof size === 'number' ? size : avatarSizes[size] || avatarSizes.small;
  const height = width;

  const imageContainerStyle = StyleSheet.flatten([
    s.overlayContainer,
    rounded && { borderRadius: width / 2, overflow: 'hidden' },
    overlayContainerStyle,
  ]);

  let componentToRender;

  if (source) {
    componentToRender = (
      <View style={imageContainerStyle as StyleProp<TextStyle>}>
        <Image
          source={source}
          borderRadius={rounded ? width / 2 : undefined}
          {...imageProps}
          style={StyleSheet.flatten([
            s.avatar,
            imageProps && imageProps.style,
            avatarStyle,
          ])}
        />
      </View>
    );
  } else if (title) {
    componentToRender = (
      <AvatarTitle title={title} titleStyle={titleStyle} size={size} />
    );
  } else if (Icon) {
    componentToRender = Icon;
  } else if (CustomContent) {
    componentToRender = CustomContent;
  }

  return (
    <Pressable
      style={StyleSheet.flatten([
        s.container,
        { height, width },
        rounded && { borderRadius: width / 2 },
        containerStyle,
      ])}
      {...{
        onPress,
        ...rest,
      }}>
      {componentToRender}
      {children}
    </Pressable>
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  container: {
    justifyContent: 'center',
  },
  avatar: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
  },
  title: {
    color: theme.colors.white,
    backgroundColor: theme.colors.transparent,
    textAlign: 'center',
    zIndex: 1,
  },
  placeholderStyle: {
    backgroundColor: theme.colors.transparent,
  },
}));

export { Avatar };
