import { ThemeManager, useTheme } from '../theme';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useEffect, type ReactElement } from 'react';
import { DateTime } from 'luxon';
import type { ISODateString } from '@react-native-hello/common';
import { Platform, View, type ViewStyle } from 'react-native';
import { ListItem } from './ListItem';
import { CollapsibleView } from '../CollapsibleView';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { ChevronDown } from 'lucide-react-native';

type Mode = 'date' | 'time' | 'datetime' | 'custom';

interface Props extends ListItem {
  accentColor?: string;
  customContent?: ReactElement;
  datePickerContainerStyle?: ViewStyle;
  expanded?: boolean;
  expandableContainerStyle?: ViewStyle;
  maximumDate?: Date;
  minimumDate?: Date;
  mode?: Mode;
  onChange: (date?: Date) => void;
  pickerValue: ISODateString | undefined;
}

const ListItemDateTime = (props: Props) => {
  const {
    accentColor,
    customContent,
    datePickerContainerStyle,
    expanded = false,
    expandableContainerStyle,
    maximumDate = new Date(),
    minimumDate,
    mode = 'datetime',
    onChange,
    pickerValue,
    ...rest
  } = props;

  const theme = useTheme();
  const s = useStyles();

  const first = rest.position?.includes('first') ? 'first' : undefined;
  const isIOS = Platform.OS === 'ios';

  const rotation = useSharedValue(0);

  const animatedCaret = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    if (expanded) {
      openRotation();
    } else {
      closeRotation();
    }
  }, [expanded]);

  const closeRotation = () => {
    rotation.value = withTiming(0, {
      duration: 200,
    });
  };

  const openRotation = () => {
    rotation.value = withTiming(180, {
      duration: 200,
    });
  };

  return (
    <>
      <ListItem
        {...rest}
        containerStyle={[
          ...(rest.containerStyle
            ? Array.isArray(rest.containerStyle)
              ? rest.containerStyle
              : [rest.containerStyle]
            : []),
          s.container,
        ]}
        position={expanded ? [first] : rest.position}
        rightContent={
          <Animated.View style={animatedCaret}>
            <ChevronDown color={theme.colors.listItemIconNav} />
          </Animated.View>
        }
        valueStyle={[s.valueStyle, rest.valueStyle]}
      />
      <CollapsibleView
        expanded={expanded}
        style={{
          ...expandableContainerStyle,
          ...(rest.position?.includes('last') ? s.collapsibleBorder : {}),
        }}>
        <View style={[s.datePickerContainer, datePickerContainerStyle]}>
          {/* Separate date and time pickers since Android doesn't have a single datetime version. */}
          {mode === 'date' || mode === 'datetime' ? (
            <DateTimePicker
              mode={'date'}
              {...(isIOS && {
                // iOS only options
                accentColor,
                themeVariant: ThemeManager.name,
              })}
              {...(!isIOS &&
                {
                  // Android only options
                })}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              value={DateTime.fromISO(
                pickerValue || new Date().toISOString(),
              ).toJSDate()}
              onChange={(_event: DateTimePickerEvent, date?: Date) =>
                onChange(date)
              }
            />
          ) : null}
          {mode === 'time' || mode === 'datetime' ? (
            <DateTimePicker
              mode={'time'}
              {...(isIOS && {
                // iOS only options
                accentColor,
                themeVariant: ThemeManager.name,
              })}
              {...(!isIOS &&
                {
                  // Android only options
                })}
              value={DateTime.fromISO(
                pickerValue || new Date().toISOString(),
              ).toJSDate()}
              onChange={(_event: DateTimePickerEvent, date?: Date) =>
                onChange(date)
              }
            />
          ) : null}
          {mode === 'custom' ? customContent : null}
        </View>
      </CollapsibleView>
    </>
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  collapsibleBorder: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  container: {},
  datePickerContainer: {
    marginVertical: 10,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  valueStyle: {
    ...theme.text.normal,
  },
}));

export { ListItemDateTime };
