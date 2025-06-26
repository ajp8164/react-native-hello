import { type AppTheme, useTheme } from './theme';
import {
  type LayoutChangeEvent,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { makeStyles } from '@rn-vui/themed';
import { DateTime } from 'luxon';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type DotDetail = {
  colors?: string[];
};
export type DayDots = Record<number, DotDetail>; // day, count

interface Calendar {
  containerStyle?: ViewStyle | ViewStyle[];
  dayDots?: DayDots;
  subtitle?: string;
  title?: string;
  todayColor?: string;
}

// Fixed two week calendar.
const Calendar = (props: Calendar) => {
  const { containerStyle, dayDots, subtitle, title, todayColor } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const [dayWidth, setDayWidth] = useState(0);

  const now = DateTime.now();
  // Use local to start week on Sunday.
  const startOfThisWeek = now.startOf('week', { useLocaleWeeks: true }).day;
  const startOfNextWeek = now
    .plus({ days: 7 })
    .startOf('week', { useLocaleWeeks: true }).day;
  const lastDayOfThisMonth = now.endOf('month').day;

  const today = now.day;

  const onLayout = (event: LayoutChangeEvent) => {
    setDayWidth(event.nativeEvent.layout.width / 7);
  };

  const renderDay = (day: number, index: number, row: number) => {
    return (
      <View key={`${index}`} style={[{ width: dayWidth }, s.dayBox]}>
        <View
          style={[
            s.dayContent,
            { width: dayWidth * 0.9, height: dayWidth * 0.9 },
            day === today
              ? { backgroundColor: todayColor || theme.colors.button }
              : {},
          ]}>
          <Text
            style={[
              s.dayNumber,
              row === 0 && day < today ? s.pastDate : {},
              day === today ? s.today : {},
            ]}>
            {day}
          </Text>
          <View style={s.dotContainer}>
            {dayDots &&
              dayDots[day] &&
              new Array(dayDots[day].colors?.length)
                .fill(0)
                .map((_v, index) =>
                  renderDot(day, index, dayDots[day].colors?.[index]),
                )}
          </View>
        </View>
      </View>
    );
  };

  const renderDot = (day: number, key: number, color?: string) => {
    return (
      <View
        key={`${key}`}
        style={[
          s.dot,
          day === today
            ? { backgroundColor: color || theme.colors.stickyWhite }
            : { backgroundColor: color || theme.colors.black },
        ]}
      />
    );
  };

  return (
    <View style={[s.container, containerStyle]}>
      <View style={s.content}>
        <Text style={s.title}>{title}</Text>
        <Text style={s.subtitle}>{subtitle}</Text>
        <View style={s.row} onLayout={onLayout}>
          {days.map((d, index) => {
            return (
              <Text key={`${index}`} style={[{ width: dayWidth }, s.dayName]}>
                {d}
              </Text>
            );
          })}
        </View>
        <View style={s.row}>
          {new Array(7).fill(startOfThisWeek).map((d, index) => {
            let day = d + index;
            if (day > lastDayOfThisMonth) {
              day -= lastDayOfThisMonth;
            }
            return renderDay(day, index, 0);
          })}
        </View>
        <View style={s.row}>
          {new Array(7).fill(startOfNextWeek).map((d, index) => {
            let day = d + index;
            if (day > lastDayOfThisMonth) {
              day -= lastDayOfThisMonth;
            }
            return renderDay(day, index, 1);
          })}
        </View>
      </View>
    </View>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  container: {},
  content: {
    width: '100%',
    alignSelf: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.listItem,
  },
  dayBox: {
    height: 30,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayContent: {
    justifyContent: 'center',
    borderRadius: 25,
  },
  dayName: {
    height: 30,
    ...theme.styles.textMedium,
    textAlign: 'center',
  },
  dayNumber: {
    ...theme.styles.textNormal,
    textAlign: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    marginHorizontal: 2,
    borderRadius: 6,
    backgroundColor: theme.colors.black,
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    bottom: 6,
  },
  pastDate: {
    ...theme.styles.textNormal,
    ...theme.styles.textDim,
  },
  row: {
    flexDirection: 'row',
  },
  subtitle: {
    ...theme.styles.textMedium,
    ...theme.styles.textDim,
    lineHeight: 20,
    marginHorizontal: 10,
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.listItemBorder,
  },
  title: {
    ...theme.styles.textHeading5,
    marginHorizontal: 10,
  },
  today: {
    color: theme.colors.textInv,
  },
}));

export { Calendar };
