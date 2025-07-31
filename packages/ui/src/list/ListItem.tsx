import { makeStyles } from '@rn-vui/themed';
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Info,
} from 'lucide-react-native';
import React, { type ReactElement } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { type AppTheme, useTheme } from '../theme';

interface ListItem {
  bottomDividerColor?: string;
  bottomDividerForceHide?: boolean;
  bottomDividerLeft?: number;
  bottomDividerRight?: number;
  containerStyle?: ViewStyle | ViewStyle[];
  disabled?: boolean;
  disabledStyle?: ViewStyle | ViewStyle[];
  focus?: boolean;
  footerContent?: ReactElement;
  ghost?: boolean;
  headerContent?: ReactElement;
  leftContent?: ReactElement;
  leftContentStyle?: ViewStyle;
  mainContent?: ReactElement;
  mainContentStyle?: ViewStyle | ViewStyle;
  position?: ('first' | 'last' | undefined)[];
  rightContent?:
    | ReactElement
    | 'chevron-down'
    | 'chevron-right'
    | 'chevron-up'
    | 'info';
  rightContentStyle?: ViewStyle;
  subtitle?: string | null | ReactElement;
  subtitleLines?: number;
  subtitleStyle?: TextStyle | TextStyle[];
  title?: string | null;
  titleLines?: number;
  titleStyle?: TextStyle | TextStyle[];
  value?: string | null | ReactElement;
  valueStyle?: TextStyle | TextStyle[];
  onPress?: () => void;
  onPressRight?: () => void;
}

const getRightContent = (key: string, theme: AppTheme) => {
  switch (key) {
    case 'chevron-down':
      return <ChevronDown color={theme.colors.listItemIconNav} />;
    case 'chevron-right':
      return <ChevronRight color={theme.colors.listItemIconNav} />;
    case 'chevron-up':
      return <ChevronUp color={theme.colors.listItemIconNav} />;
    case 'info':
      return <Info color={theme.colors.listItemIconNav} />;
    default:
      return undefined;
  }
};

const ListItem = (props: ListItem) => {
  const {
    bottomDividerColor,
    bottomDividerForceHide,
    bottomDividerLeft,
    bottomDividerRight,
    containerStyle,
    disabled,
    disabledStyle,
    focus,
    footerContent,
    ghost,
    headerContent,
    leftContent,
    leftContentStyle,
    mainContent,
    mainContentStyle,
    position,
    rightContent,
    rightContentStyle,
    subtitle,
    subtitleLines,
    subtitleStyle,
    title,
    titleLines,
    titleStyle,
    value,
    valueStyle,
    onPress,
    onPressRight,
  } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const _bottomDividerColor =
    bottomDividerColor || (s.border.borderColor as string);
  const _bottomDividerLeft = bottomDividerLeft || (s.border.left as number);
  const _bottomDividerRight = bottomDividerRight || (s.border.right as number);

  const valueIsElement = React.isValidElement(value);

  let _rightContent = rightContent;
  let rightIcon = false;
  if (!React.isValidElement(_rightContent)) {
    _rightContent = getRightContent(_rightContent as string, theme);
    rightIcon = true;
  }

  return (
    <Pressable
      style={[
        s.container,
        position?.includes('first') ? s.first : {},
        position?.includes('last') ? s.last : {},
        focus ? s.focus : {},
        ghost ? s.ghost : {},
        containerStyle,
        disabled ? disabledStyle : {},
      ]}
      onPress={!disabled ? onPress : null}>
      {/* Header */}
      {headerContent && <View>{headerContent}</View>}
      <View style={s.innerContainer}>
        {/* Left */}
        {leftContent && (
          <View style={[s.leftContent, leftContentStyle]}>{leftContent}</View>
        )}
        {/* Main */}
        {mainContent ? (
          <View style={[s.mainContent, mainContentStyle]}>{mainContent}</View>
        ) : (
          <>
            {/* Title, Subtitle */}
            <View style={s.titleSubtitle}>
              {title && (
                <Text
                  style={[s.title, titleStyle]}
                  numberOfLines={titleLines !== undefined ? titleLines : 1}
                  ellipsizeMode={'tail'}
                  allowFontScaling={false}>
                  {title}
                </Text>
              )}
              {subtitle && (
                <Text
                  style={[s.subtitle, subtitleStyle]}
                  numberOfLines={
                    subtitleLines !== undefined ? subtitleLines : 1
                  }
                  ellipsizeMode={'tail'}
                  allowFontScaling={false}>
                  {subtitle}
                </Text>
              )}
            </View>
            {/* Value */}
            {value && !valueIsElement && (
              <Animated.Text
                style={[s.value, valueStyle]}
                allowFontScaling={false}>
                {value}
              </Animated.Text>
            )}
            {value && valueIsElement && (
              <Animated.View style={[s.valueElement, valueStyle]}>
                {value}
              </Animated.View>
            )}
          </>
        )}
        {/* Right */}
        {_rightContent && (
          <Animated.View style={[rightContentStyle]}>
            <Pressable
              style={s.rightContent}
              disabled={!onPressRight}
              onPress={rightIcon && onPressRight ? onPressRight : undefined}>
              {_rightContent}
            </Pressable>
          </Animated.View>
        )}
      </View>
      {/* Footer */}
      {footerContent && <View>{footerContent}</View>}
      {/* Bottom Divider */}
      {!bottomDividerForceHide && !position?.includes('last') ? (
        <View
          style={[
            ghost ? {} : s.bottomDivider,
            {
              borderColor: _bottomDividerColor,
              left: _bottomDividerLeft,
              right: _bottomDividerRight,
            },
          ]}
        />
      ) : null}
    </Pressable>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  border: {
    left: 15,
    right: 0,
    borderColor: theme.colors.listItemBorder,
  },
  bottomDivider: {
    borderWidth: StyleSheet.hairlineWidth,
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
  container: {
    backgroundColor: theme.colors.listItem,
    overflow: 'hidden',
  },
  first: {
    borderTopLeftRadius: theme.styles.button.borderRadius,
    borderTopRightRadius: theme.styles.button.borderRadius,
  },
  focus: {
    borderColor: theme.colors.listItemIcon,
    borderWidth: 1,
  },
  ghost: {
    borderColor: theme.colors.listItemBorder,
    borderWidth: 1,
    borderStyle: 'dashed',
    overflow: 'visible',
  },
  innerContainer: {
    flexDirection: 'row',
    minHeight: 60,
  },
  last: {
    borderBottomLeftRadius: theme.styles.button.borderRadius,
    borderBottomEndRadius: theme.styles.button.borderRadius,
  },
  leftContent: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  mainContent: {
    flex: 1,
  },
  rightContent: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  subtitle: {
    ...theme.styles.textSmall,
    color: theme.colors.listItemSubtitle,
  },
  titleSubtitle: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  title: {
    ...theme.styles.textNormal,
    color: theme.colors.listItemTitle,
  },
  value: {
    ...theme.styles.textNormal,
    color: theme.colors.listItemValue,
    textAlign: 'right',
    alignSelf: 'center',
    paddingLeft: 10,
  },
  valueElement: {
    justifyContent: 'center',
  },
}));

export { ListItem };
