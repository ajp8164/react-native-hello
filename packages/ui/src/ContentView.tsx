import {
  Linking,
  Text,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { BulletList } from './BulletList';
import React from 'react';
import { useTheme } from './theme';

export type ContentLink = {
  prefix?: string;
  text?: string;
  url?: string;
  suffix?: string;
};

export type ContentItem = {
  link?: ContentLink;
  orderedBullets?: string[];
  text?: string;
  title?: string;
  unorderedBullets?: string[];
};

export type ContentContainer = {
  title?: string;
  items?: ContentItem[];
};

export type Content = {
  name: string;
  lists: ContentContainer[][];
};

interface ContentView {
  containerStyle?: ViewStyle | ViewStyle[];
  items: ContentItem[];
  titleStyle?: TextStyle | TextStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const ContentView = ({
  containerStyle,
  items,
  titleStyle,
  textStyle,
}: ContentView) => {
  const theme = useTheme();

  const openURL = (link: string) => {
    const re = /^(http|https|tel|telprompt):\/\//;
    if (!link.trim().match(re)) {
      link = 'http://' + link;
    }
    Linking.openURL(link);
  };

  return (
    <>
      {items.map((i, index) => {
        return (
          <View style={[{ marginTop: 20 }, containerStyle]} key={index}>
            {i.title ? (
              <Text
                style={[
                  theme.styles.textHeading5,
                  { marginBottom: 15, color: theme.colors.text },
                  titleStyle,
                ]}>
                {i.title}
              </Text>
            ) : null}
            {i.text ? (
              <Text style={[theme.styles.textNormal, textStyle]}>{i.text}</Text>
            ) : null}
            {i.orderedBullets ? (
              <BulletList
                containerStyle={{ marginTop: 10 }}
                bulletStyle={[
                  theme.styles.textNormal,
                  { color: theme.colors.lightGray },
                ]}
                itemStyle={theme.styles.textNormal}
                type={'ordered'}
                items={i.orderedBullets.map(b => {
                  return b;
                })}
              />
            ) : null}
            {i.unorderedBullets ? (
              <BulletList
                containerStyle={{ marginTop: 10 }}
                bulletStyle={[
                  theme.styles.textNormal,
                  { color: theme.colors.lightGray },
                ]}
                itemStyle={theme.styles.textNormal}
                type={'unordered'}
                items={i.unorderedBullets.map(b => {
                  return b;
                })}
              />
            ) : null}
            {i.link ? (
              <View
                style={[
                  {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    height: 200,
                  },
                ]}>
                <Text style={theme.styles.textNormal}>
                  {i.link.prefix}
                  <Text
                    style={[theme.styles.textNormal, theme.styles.textLink]}
                    onPress={() => {
                      openURL(i.link?.url || '');
                    }}>
                    {i.link.text}
                  </Text>
                  {i.link.suffix ? (
                    <Text style={theme.styles.textNormal}>{i.link.suffix}</Text>
                  ) : null}
                </Text>
              </View>
            ) : null}
          </View>
        );
      })}
    </>
  );
};

export { ContentView };
