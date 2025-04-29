import { type AppTheme, useTheme } from './theme';
import {
  type LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import React, { type ReactElement, useState } from 'react';
import { makeStyles } from '@rneui/themed';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react-native';

export interface ListItemProps {
  bottomDividerColor?: string;
  bottomDividerForceHide?: boolean;
  bottomDividerLeft?: number;
  bottomDividerRight?: number;
  containerStyle?: ViewStyle | ViewStyle[];
  focus?: boolean;
  footerContent?: ReactElement;
  ghost?: boolean;
  leftContent?: ReactElement;
  leftContentStyle?: ViewStyle;
  mainContent?: ReactElement;
  mainContentStyle?: ViewStyle | ViewStyle;
  position?: ('first' | 'last' | undefined)[];
  rightContent?: ReactElement | 'chevron-down' | 'chevron-right' | 'chevron-up';
  rightContentStyle?: ViewStyle;
  style?: ViewStyle | ViewStyle[];
  subtitle?: string | null | ReactElement;
  subtitleLines?: number;
  subtitleStyle?: TextStyle | TextStyle[];
  title?: string | null;
  titleLines?: number;
  titleStyle?: TextStyle | TextStyle[];
  value?: string | null | ReactElement;
  valueStyle?: TextStyle | TextStyle[];
  onPress?: () => void;
}

const iconLeftTitleOffset = 40;

const getContent = (key: string, theme: AppTheme) => {
  switch (key) {
    case 'chevron-down':
      return <ChevronDown color={theme.colors.listItemIconNav} />;
    case 'chevron-right':
      return <ChevronRight color={theme.colors.listItemIconNav} />;
    case 'chevron-up':
      return <ChevronUp color={theme.colors.listItemIconNav} />;
    default:
      return undefined;
  }
};

const ListItem = (props: ListItemProps) => {
  const {
    bottomDividerColor,
    bottomDividerForceHide,
    bottomDividerLeft,
    bottomDividerRight,
    containerStyle,
    focus,
    footerContent,
    ghost,
    leftContent,
    leftContentStyle,
    mainContent,
    mainContentStyle,
    position,
    rightContent,
    rightContentStyle,
    style,
    subtitle,
    subtitleLines,
    subtitleStyle,
    title,
    titleLines,
    titleStyle,
    value,
    valueStyle,
    onPress,
  } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const _bottomDividerColor = bottomDividerColor || (s.border.borderColor as string);
  const _bottomDividerLeft = bottomDividerLeft || (s.border.left as number);
  const _bottomDividerRight = bottomDividerRight || (s.border.right as number);

  const mainOffset = leftContent ? iconLeftTitleOffset : 0;
  const subtitleIsElement = React.isValidElement(subtitle);
  const subtitleOffset = leftContent ? iconLeftTitleOffset : 0;
  const titleOffset = leftContent ? iconLeftTitleOffset : 0;
  const valueIsElement = React.isValidElement(value);

  let _rightContent = rightContent;
  if (!React.isValidElement(_rightContent)) {
    _rightContent = getContent(_rightContent as string, theme);
  }

  // Shorten title to avoid title and value overlapping.
  const [titleEndX, setTitleEndX] = useState<number>(0);
  const [titleW, setTitleW] = useState<number>(0);
  const [subtitleEndX, setSubtitleEndX] = useState<number>(0);
  const [subtitleW, setSubtitleW] = useState<number>(0);
  const [rightContentX, setRightContentX] = useState<number>(0);
  const [valueX, setValueX] = useState<number>(0);

  const rightX =
    valueX && rightContentX ? Math.min(valueX, rightContentX) : valueX || rightContentX || 0;
  const titleWidth = titleW - Math.min(titleEndX - rightX + 5);
  const subtitleWidth = subtitleW - Math.min(subtitleEndX - rightX + 20);

  const onLayoutTitle = (event: LayoutChangeEvent) => {
    // If this list item is animated then layout may not be complete until the next
    // render cycle.
    const layout = event.nativeEvent.layout;
    setTimeout(() => {
      setTitleEndX(layout.width + layout.x);
      setTitleW(layout.width);
    });
  };

  const onLayoutSubtitle = (event: LayoutChangeEvent) => {
    // If this list item is animated then layout may not be complete until the next
    // render cycle.
    const layout = event.nativeEvent.layout;
    setTimeout(() => {
      setSubtitleEndX(layout.width + layout.x);
      setSubtitleW(layout.width);
    });
  };

  const onLayoutValue = (event: LayoutChangeEvent) => {
    // If this list item is animated then layout may not be complete until the next
    // render cycle.
    const layout = event.nativeEvent.layout;
    setTimeout(() => {
      setValueX(layout.x);
    });
  };

  const onLayoutRightContent = (event: LayoutChangeEvent) => {
    // If this list item is animated then layout may not be complete until the next
    // render cycle.
    const layout = event.nativeEvent.layout;
    setTimeout(() => {
      setRightContentX(layout.x);
    });
  };

  return (
    <Pressable
      style={[
        s.container,
        position?.includes('first') ? s.first : {},
        position?.includes('last') ? s.last : {},
        focus ? s.focus : {},
        ghost ? s.ghost : {},
        containerStyle,
      ]}
      onPress={onPress}>
      <View>
        <View style={[s.innerContainer, subtitle ? s.itemWithSubtitle : {}, style]}>
          {leftContent && (
            <View style={[s.leftContent, s.leftContentElement, leftContentStyle]}>
              {leftContent}
            </View>
          )}
          {mainContent ? (
            <View style={[s.mainContent, mainContentStyle, { paddingLeft: mainOffset }]}>
              {mainContent}
            </View>
          ) : (
            <>
              <View>
                <Text
                  style={[s.title, { marginLeft: titleOffset, width: titleWidth }, titleStyle]}
                  allowFontScaling={false}
                  onLayout={onLayoutTitle}
                  numberOfLines={titleLines || 1}
                  ellipsizeMode={'tail'}>
                  {title}
                </Text>
                {subtitle && !subtitleIsElement && (
                  <Text
                    style={[
                      s.subtitle,
                      { marginLeft: subtitleOffset, width: subtitleWidth },
                      subtitleStyle,
                    ]}
                    allowFontScaling={false}
                    onLayout={onLayoutSubtitle}
                    numberOfLines={subtitleLines || 1}
                    ellipsizeMode={'tail'}>
                    {subtitle}
                  </Text>
                )}
                {subtitle && subtitleIsElement && (
                  <View style={[s.subtitleElement, { marginLeft: subtitleOffset }, subtitleStyle]}>
                    {subtitle}
                  </View>
                )}
              </View>
              {value && !valueIsElement && (
                <Text
                  style={[
                    s.value,
                    _rightContent ? s.valueMarginRightContent : s.valueMargin,
                    valueStyle,
                  ]}
                  allowFontScaling={false}
                  onLayout={onLayoutValue}>
                  {value}
                </Text>
              )}
              {value && valueIsElement && (
                <View
                  style={[
                    s.valueElement,
                    _rightContent ? s.valueMarginRightContent : s.valueMargin,
                    valueStyle,
                  ]}
                  onLayout={onLayoutValue}>
                  {value}
                </View>
              )}
            </>
          )}
          {_rightContent && (
            <View
              style={[s.rightContent, s.rightContentElement, rightContentStyle]}
              onLayout={onLayoutRightContent}>
              {_rightContent}
            </View>
          )}
        </View>
        {footerContent && <View style={s.footerContentElement}>{footerContent}</View>}
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
      </View>
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
  footerContentElement: {},
  ghost: {
    borderColor: theme.colors.listItemBorder,
    borderWidth: 1,
    borderStyle: 'dashed',
    overflow: 'visible',
  },
  innerContainer: {
    flexDirection: 'row',
    minHeight: 60,
    alignItems: 'center',
    overflow: 'hidden',
  },
  last: {
    borderBottomLeftRadius: theme.styles.button.borderRadius,
    borderBottomEndRadius: theme.styles.button.borderRadius,
  },
  leftContent: {
    position: 'absolute',
    left: 15,
  },
  leftContentElement: {},
  mainContent: {
    flex: 1,
  },
  rightContent: {
    position: 'absolute',
    right: 15,
  },
  rightContentElement: {},
  subtitle: {
    ...theme.styles.textSmall,
    color: theme.colors.textLight,
    left: 15,
  },
  subtitleElement: {
    left: 15,
    alignSelf: 'flex-start',
  },
  itemWithSubtitle: {
    paddingTop: 4,
    paddingBottom: 7,
  },
  title: {
    ...theme.styles.textNormal,
    color: theme.colors.text,
    left: 15,
    overflow: 'hidden',
  },
  value: {
    ...theme.styles.textNormal,
    position: 'absolute',
    right: 15,
    textAlign: 'right',
  },
  valueElement: {
    position: 'absolute',
  },
  valueMargin: {
    right: 15,
  },
  valueMarginRightContent: {
    right: 40,
  },
}));

export default ListItem;
