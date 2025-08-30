import React from 'react';
import { Text, type TextStyle, View, type ViewStyle } from 'react-native';
import SVG, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { ThemeManager } from './theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRing {
  arc?: number;
  color1?: string;
  color2?: string;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
  footNote?: string;
  label?: string;
  lineCap?: 'butt' | 'square' | 'round';
  progress: number;
  radius?: number;
  range?: number[];
  ringContainerStyle?: ViewStyle;
  animationDuration?: number;
  startAngle?: number;
  strokeWidth?: number;
  title?: string;
  titleStyle?: TextStyle;
  value?: string;
  valueStyle?: TextStyle;
  ContentComponent?: JSX.Element | null;
  InfoComponent?: JSX.Element | null;
}

const ProgressRing = (props: ProgressRing) => {
  const {
    arc = 1,
    color1,
    color2,
    containerStyle,
    contentStyle,
    footNote,
    label,
    lineCap = 'butt',
    progress,
    radius = 100,
    range,
    ringContainerStyle,
    animationDuration = 1500,
    startAngle = -90,
    strokeWidth = 10,
    title,
    titleStyle,
    value,
    valueStyle,
    ContentComponent,
    InfoComponent,
  } = props;

  const s = useStyles();

  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;
  const fill = useSharedValue(0);

  // Progress is positive for clockwise, negative for counter-clockwise.
  const sign = progress < 0 ? -1 : 1;

  useEffect(() => {
    fill.value = withTiming(progress, { duration: animationDuration });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDasharray: [sign * circumference * fill.value, circumference],
  }));

  return (
    <View style={[{ height: radius * 2 }, containerStyle]}>
      <View style={[s.container, ringContainerStyle]}>
        <View style={[{ width: radius * 2, height: radius * 2 }]}>
          <SVG style={{ flex: 1, transform: [{ scaleX: sign }] }}>
            {/* Background */}
            <Circle
              r={innerRadius}
              cx={radius}
              cy={radius}
              fill={'transparent'}
              stroke={color1}
              strokeWidth={strokeWidth}
              strokeDasharray={[circumference * arc]}
              strokeLinecap={lineCap}
              transform={`rotate(${startAngle} ${radius} ${radius})`}
            />
            {/* Foreground */}
            <AnimatedCircle
              animatedProps={animatedProps}
              r={innerRadius}
              cx={radius}
              cy={radius}
              fill={'transparent'}
              stroke={color2}
              strokeWidth={strokeWidth}
              strokeDasharray={[circumference * progress * arc]}
              strokeLinecap={lineCap}
              transform={`rotate(${startAngle} ${radius} ${radius})`}
              originX={radius}
              originY={radius}
            />
          </SVG>
        </View>
        {ContentComponent ? (
          <View style={[s.content, contentStyle]}>{ContentComponent}</View>
        ) : (
          <View style={[s.content, contentStyle]}>
            <Text style={[s.title, titleStyle]}>{title}</Text>
            <Text style={[s.value, valueStyle]}>{value}</Text>
          </View>
        )}
      </View>
      {InfoComponent ? (
        <View style={s.infoComponent}>{InfoComponent}</View>
      ) : (
        <>
          {range ? (
            <View style={[s.range, { top: radius * 1.46 }]}>
              <Text style={s.rangeLow}>{range[0]}</Text>
              <Text style={s.rangeHigh}>{range[1]}</Text>
              {label && (
                <Text
                  style={[
                    s.label,
                    { color: color1, backgroundColor: `${color1}33` },
                  ]}>
                  {label}
                </Text>
              )}
              <Text style={s.footNote}>{footNote}</Text>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  container: {
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  content: {
    position: 'absolute',
    top: '28%',
  },
  footNote: {
    ...theme.text.small,
    ...theme.styles.textDim,
    alignSelf: 'center',
    top: 35,
    textAlign: 'center',
  },
  infoComponent: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderWidth: 0,
  },
  label: {
    ...theme.text.normal,
    fontFamily: theme.fonts.bold,
    position: 'absolute',
    alignSelf: 'center',
    borderRadius: 7,
    overflow: 'hidden',
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  range: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
  },
  rangeLow: {
    ...theme.text.normal,
    left: '22%',
    position: 'absolute',
    width: 35,
    textAlign: 'right',
  },
  rangeHigh: {
    ...theme.text.normal,
    right: '22%',
    position: 'absolute',
    width: 35,
    textAlign: 'left',
  },
  title: {
    ...theme.text.normal,
  },
  value: {
    ...theme.text.h1,
    textAlign: 'center',
    marginTop: -5,
  },
}));

export { ProgressRing };
