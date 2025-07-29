import { ListItem } from '.';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { makeStyles } from '@rn-vui/themed';
import React from 'react';
import { View } from 'react-native';
import { type AppTheme, useTheme } from '../theme';

export interface ListItemSegmented extends ListItem {
  fullWidth?: boolean;
  index?: number;
  onChangeIndex: (index: number) => void;
  segments: string[];
  segmentBackgroundColor?: string;
  segmentTintColor?: string;
}

const ListItemSegmented = (props: ListItemSegmented) => {
  const {
    fullWidth = false,
    index = 0,
    onChangeIndex,
    segments,
    segmentBackgroundColor,
    segmentTintColor,
    ...rest
  } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const renderSegments = () => (
    <View style={[fullWidth ? s.segmentedViewFullWidth : {}]}>
      <SegmentedControl
        values={segments}
        style={[{ width: fullWidth ? '100%' : segments.length * 50 }]}
        tintColor={segmentTintColor || theme.colors.viewAltBackground}
        backgroundColor={segmentBackgroundColor || theme.colors.wispGray}
        fontStyle={s.segmentedFont}
        activeFontStyle={s.segmentedActiveFont}
        enabled={rest.disabled !== true}
        selectedIndex={index}
        onChange={event => {
          onChangeIndex(event.nativeEvent.selectedSegmentIndex);
        }}
      />
    </View>
  );

  return (
    <>
      <ListItem
        {...rest}
        containerStyle={[
          fullWidth ? s.containerFullWidth : {},
          ...(rest.containerStyle
            ? Array.isArray(rest.containerStyle)
              ? rest.containerStyle
              : [rest.containerStyle]
            : []),
          s.container,
        ]}
        mainContent={fullWidth ? renderSegments() : undefined}
        rightContent={fullWidth ? undefined : renderSegments()}
      />
    </>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  container: {
    minHeight: 48,
  },
  containerFullWidth: {
    paddingLeft: 0,
  },
  segmentedViewFullWidth: {
    right: 0,
    left: 0,
  },
  segmentedFont: {
    fontSize: 12,
    color: theme.colors.text,
  },
  segmentedActiveFont: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
}));

export { ListItemSegmented };
