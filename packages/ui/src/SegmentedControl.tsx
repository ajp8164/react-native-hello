import React, { useState } from 'react';
import { ThemeManager, useTheme } from './theme';
import RNSegmentedControl, {
  type SegmentedControlProps as RNSegmentedControlProps,
} from '@react-native-segmented-control/segmented-control';
import { View, type ViewStyle } from 'react-native';

const controlHeight = 28;

interface SegmentedControl extends Omit<RNSegmentedControlProps, 'onChange'> {
  containerStyle?: ViewStyle | ViewStyle[];
  initialIndex?: number;
  onChange: (index: number) => void;
}

const SegmentedControl = (props: SegmentedControl) => {
  const { containerStyle, initialIndex, onChange, ...rest } = props;

  const theme = useTheme();
  const s = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(initialIndex || 0);

  return (
    <View style={[containerStyle]}>
      <View style={[s.borderClip]}>
        <View style={[s.border, s.borderClip]} />
        <RNSegmentedControl
          selectedIndex={selectedIndex}
          backgroundColor={theme.colors.segmentBackground}
          tintColor={theme.colors.segmentActive}
          activeFontStyle={{ ...s.itemText, ...s.activeItemText }}
          fontStyle={s.itemText}
          style={[s.control, rest.style]}
          appearance={ThemeManager.name}
          onChange={event => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            onChange(event.nativeEvent.selectedSegmentIndex);
          }}
          {...rest}
        />
      </View>
    </View>
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  activeItemText: {},
  // iOS native component is used and doesn't provide border styling. We create our own border and
  // clip the radius border of the iOS control (overflow hidden).
  border: {
    borderColor: theme.colors.segmentBorder,
    borderWidth: 2,
    height: controlHeight,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    pointerEvents: 'none',
  },
  borderClip: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  control: {
    height: controlHeight,
  },
  itemText: {
    fontSize: theme.fontSize.small,
    fontFamily: theme.fonts.regular,
    allowFontScaling: false,
  },
}));

export { SegmentedControl };
