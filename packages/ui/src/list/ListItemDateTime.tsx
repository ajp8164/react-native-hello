import { type AppTheme, useTheme } from '../theme';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React from 'react';
import { DateTime } from 'luxon';
import type { ISODateString } from '@react-native-hello/common';
import { Platform, View, type ViewStyle } from 'react-native';
import { ListItem } from './ListItem';
import { makeStyles } from '@rn-vui/themed';
import CollapsibleView from '@eliav2/react-native-collapsible-view';

type Mode = 'date' | 'time' | 'datetime';

interface Props extends ListItem {
  accentColor?: string;
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
  const s = useStyles(theme);

  const first = rest.position?.includes('first') ? 'first' : undefined;
  const isIOS = Platform.OS === 'ios';

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
        rightContent={expanded ? 'chevron-up' : 'chevron-down'}
        valueStyle={s.valueStyle}
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
                themeVariant: theme.mode,
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
                themeVariant: theme.mode,
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
        </View>
      </CollapsibleView>
    </>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
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
    ...theme.styles.textDim,
  },
}));

export { ListItemDateTime };
