import { type AppTheme, useTheme } from './theme';
import { makeStyles } from '@rn-vui/themed';
import React, { type ReactElement } from 'react';
import { Text, View } from 'react-native';
import { LinearProgress as RNELinearProgress } from '@rn-vui/base';

export interface LinearProgressProps {
  marker?: ReactElement;
  markerPercent?: number;
  percent: number;
  trackColor?: string;
  valueLeft?: string;
  valueRight?: string;
}

const LinearProgress = (props: LinearProgressProps) => {
  const { marker, markerPercent = 0, percent, trackColor, valueLeft, valueRight } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  return (
    <View style={s.progressContainer}>
      <RNELinearProgress
        style={s.progress}
        color={trackColor || theme.colors.button}
        trackColor={`${trackColor || theme.colors.button}30`}
        variant={'determinate'}
        value={percent}
      />
      <View style={{ marginTop: -11, left: -7, marginLeft: `${markerPercent * 100}%` }}>
        {marker}
      </View>
      <View style={s.progressValuesContainer}>
        <Text style={s.progressAmount}>{valueLeft}</Text>
        <Text style={[s.progressAmount, s.right]}>{valueRight}</Text>
      </View>
    </View>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  progress: {
    marginVertical: 10,
    borderRadius: 10,
    height: 7,
  },
  progressAmount: {
    ...theme.styles.textSmall,
    color: theme.colors.textLight,
  },
  progressContainer: {
    paddingHorizontal: 15,
    marginTop: -15,
  },
  progressValuesContainer: {
    flexDirection: 'row',
    paddingBottom: 15,
  },
  right: {
    textAlign: 'right',
    flex: 1,
  },
}));

export default LinearProgress;
