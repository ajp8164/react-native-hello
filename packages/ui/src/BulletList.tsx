import { type AppTheme, useTheme } from './theme';
import { Text, type TextStyle, View, type ViewStyle } from 'react-native';

import React from 'react';
import { makeStyles } from '@rn-vui/themed';
import { Circle } from 'lucide-react-native';

export type BulletItem = {
  bullet: JSX.Element;
  text: string;
  subtext?: string;
  hide?: boolean;
};

export interface BulletListProps {
  type?: 'ordered' | 'unordered';
  bulletOffset?: number;
  bulletSize?: number;
  initialCount?: number;
  items: string[] | BulletItem[] | JSX.Element[];
  lineSpacing?: number;
  containerStyle?: ViewStyle | ViewStyle[];
  itemContainerStyle?: ViewStyle | ViewStyle[];
  itemStyle?: TextStyle[] | TextStyle;
  subItemStyle?: TextStyle[] | TextStyle;
  bulletStyle?: TextStyle[] | TextStyle;
}

const BulletList = ({
  type = 'unordered',
  bulletOffset = 9,
  bulletSize = 10,
  initialCount = 0,
  items,
  lineSpacing = 0,
  containerStyle,
  itemContainerStyle,
  itemStyle,
  subItemStyle,
  bulletStyle,
}: BulletListProps) => {
  const theme = useTheme();
  const s = useStyles(theme);

  let count = initialCount;

  const getBullet = () => {
    return (
      <View style={{ paddingTop: bulletOffset }}>
        <Circle fill={theme.colors.text} strokeWidth={0} size={bulletSize} />
      </View>
    );
  };

  const itemsAreStrings = typeof items[0] === 'string';
  const itemsAreBulletItems = (items[0] as BulletItem).bullet !== undefined;
  const itemsAreElements = React.isValidElement(items[0]);

  return (
    <View style={[s.container, containerStyle]}>
      <View>
        {items.map(i => {
          count++;
          return (
            <View style={[s.row, { marginBottom: lineSpacing }]} key={count}>
              {itemsAreStrings &&
                (type === 'unordered' ? (
                  <Text
                    style={[s.bulletStyle, bulletStyle]}
                    allowFontScaling={false}>
                    {getBullet()}
                  </Text>
                ) : (
                  <Text
                    style={[s.itemStyle, itemStyle]}
                    allowFontScaling={false}>
                    {count + '.'}
                  </Text>
                ))}
              {typeof i === 'string' ? (
                <Text style={[s.itemStyle, itemStyle]}>{i}</Text>
              ) : null}
              {itemsAreBulletItems ? (
                (i as BulletItem).hide ? (
                  <></>
                ) : (
                  <View
                    style={[
                      { flexDirection: 'row', alignItems: 'center' },
                      itemContainerStyle,
                    ]}>
                    {(i as BulletItem).bullet}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[s.itemStyle, itemStyle]}
                        allowFontScaling={false}>
                        {(i as BulletItem).text}
                      </Text>
                      {(i as BulletItem).subtext && (
                        <Text
                          style={[s.subItemStyle, subItemStyle]}
                          allowFontScaling={false}>
                          {(i as BulletItem).subtext}
                        </Text>
                      )}
                    </View>
                  </View>
                )
              ) : null}
              {itemsAreElements ? (i as JSX.Element) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  container: {},
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 0,
    marginBottom: 10,
  },
  bulletStyle: {
    ...theme.styles.textNormal,
    marginRight: 10,
    fontSize: 40,
  },
  itemStyle: {
    ...theme.styles.textNormal,
    marginRight: 10,
  },
  subItemStyle: {
    ...theme.styles.textNormal,
    marginRight: 10,
  },
}));

export { BulletList };
