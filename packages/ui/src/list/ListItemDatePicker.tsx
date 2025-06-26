import { type AppTheme, useTheme } from '../theme';
import { View, type ViewStyle } from 'react-native';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { makeStyles } from '@rn-vui/themed';
import { ListItem } from './ListItem';
import { CollapsibleView } from '../CollapsibleView';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { DateTime } from 'luxon';

export interface ListItemDatePicker
  extends Omit<ListItem, 'title' | 'style' | 'value'> {
  expanded?: boolean;
  minimumDate?: Date;
  maximumDate?: Date;
  onChangeDate: (date?: Date) => void;
  style?: ViewStyle;
  title?: string;
  value?: Date;
}

export interface ListItemDatePickerMethods {
  collapse: () => void;
}

const ListItemDatePicker = React.forwardRef<
  ListItemDatePickerMethods,
  ListItemDatePicker
>((props, ref) => {
  const {
    expanded: initExpanded,
    minimumDate,
    maximumDate,
    onChangeDate,
    style,
    title,
    value,
    ...rest
  } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const [expanded, setExpanded] = useState(
    initExpanded !== undefined ? initExpanded : false,
  );
  const [expandedStyle, setExpandedStyle] = useState<ViewStyle>({});

  // Restore list item bottom border when collapsible has finished animation.
  useEffect(() => {
    if (!expanded) {
      setTimeout(() => {
        setExpandedStyle({});
      }, 230);
    } else {
      setExpandedStyle(s.expanded);
    }
  }, [expanded]);

  useImperativeHandle(ref, () => ({
    // These functions exposed to the parent component through the ref.
    collapse,
  }));

  const collapse = () => {
    setExpanded(false);
  };

  return (
    <>
      <ListItem
        rightContent={expanded ? 'chevron-up' : 'chevron-down'}
        bottomDividerForceHide={expanded}
        style={[s.item, expandedStyle, style ? style : {}]}
        titleStyle={value ? s.titleShrink : s.title}
        subtitleStyle={[value ? s.subtitle : s.placeholder]}
        title={title}
        subtitle={
          value
            ? // See https://stackoverflow.com/questions/71025060/react-native-datetimepicker-datetimepicker-is-1-day-off
              DateTime.fromJSDate(value, {
                zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              }).toFormat('MMM d, yyyy')
            : undefined
        }
        onPress={() => setExpanded(!expanded)}
        {...rest}
      />
      <CollapsibleView
        expanded={expanded}
        duration={initExpanded === true ? 0 : undefined}>
        <View style={s.collapsibleContainer}>
          <DateTimePicker
            mode={'date'}
            style={{}}
            themeVariant={theme.mode}
            display={'inline'}
            accentColor={theme.colors.datePickerAccent}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            // See https://stackoverflow.com/questions/71025060/react-native-datetimepicker-datetimepicker-is-1-day-off
            timeZoneName={Intl.DateTimeFormat().resolvedOptions().timeZone}
            value={value ? value : new Date()}
            onChange={(_event: DateTimePickerEvent, date?: Date) =>
              onChangeDate(date)
            }
          />
        </View>
        <View
          style={[
            s.footer,
            rest.position?.includes('last')
              ? s.collapsibleContainerLastExpanded
              : {},
          ]}
        />
      </CollapsibleView>
    </>
  );
});

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  collapsibleContainer: {
    width: '100%',
    backgroundColor: theme.colors.collapsibleBackground,
  },
  collapsibleContainerLastExpanded: {
    borderBottomStartRadius: theme.styles.button.borderRadius,
    borderBottomEndRadius: theme.styles.button.borderRadius,
  },
  expanded: {
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  footer: {
    height: theme.styles.button.borderRadius as number,
    width: '100%',
    backgroundColor: theme.colors.collapsibleBackground,
  },
  item: {},
  placeholder: {
    color: theme.colors.textPlaceholder,
  },
  subtitle: {
    top: 8,
    left: 12,
    ...theme.styles.textNormal,
  },
  title: {
    position: 'absolute',
    top: -10,
    left: 12,
    ...theme.styles.textNormal,
    ...theme.styles.textDim,
  },
  titleShrink: {
    position: 'absolute',
    top: -7,
    left: 12,
    ...theme.styles.textSmall,
    ...theme.styles.textDim,
  },
}));

export { ListItemDatePicker };
