import React, { useImperativeHandle } from 'react';
import { type AppTheme, useTheme } from './theme';
import { makeStyles } from '@rn-vui/themed';
import { View, type ViewStyle } from 'react-native';
import RNACarousel, {
  type ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import {
  type CarouselRenderItemInfo,
  type TCarouselActionOptions,
  type TCarouselProps,
} from 'react-native-reanimated-carousel/lib/typescript/types';
import { type TStackModeProps } from 'react-native-reanimated-carousel/lib/typescript/layouts/stack';
import { type TParallaxModeProps } from 'react-native-reanimated-carousel/lib/typescript/layouts/parallax';

export interface CarouselMethods {
  getCurrentIndex: () => number;
  next: (opts?: Omit<TCarouselActionOptions, 'index'>) => void;
  previous: (opts?: Omit<TCarouselActionOptions, 'index'>) => void;
  scrollTo: (opts?: TCarouselActionOptions) => void;
}

export type CarouselProps = Omit<
  TCarouselProps<JSX.Element>,
  'renderItem' | 'data'
> & {
  hidePagination?: boolean;
  pages: JSX.Element[];
  paginationContainer?: ViewStyle | ViewStyle[];
} & (TParallaxModeProps | TStackModeProps);

const Carousel = React.forwardRef<CarouselMethods, CarouselProps>(
  (props, ref) => {
    const { hidePagination, pages, paginationContainer, ...rest } = props;

    const theme = useTheme();
    const s = useStyles(theme);

    const innerRef = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);

    useImperativeHandle(ref, () => ({
      // These functions exposed to the parent component through the ref.
      getCurrentIndex,
      next,
      previous,
      scrollTo,
    }));

    const getCurrentIndex = () => {
      return innerRef.current?.getCurrentIndex() || -1;
    };

    const next = (opts?: Omit<TCarouselActionOptions, 'index'>) => {
      innerRef.current?.next(opts);
    };

    const previous = (opts?: Omit<TCarouselActionOptions, 'index'>) => {
      innerRef.current?.prev(opts);
    };

    const scrollTo = (opts?: TCarouselActionOptions) => {
      innerRef.current?.scrollTo(opts);
    };

    const onPressPagination = (index: number) => {
      innerRef.current?.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    };

    return (
      <View style={{ flex: 1 }}>
        <RNACarousel
          ref={innerRef}
          onConfigurePanGesture={panGesture => {
            panGesture.activeOffsetX([-10, 10]);
          }}
          data={pages}
          onProgressChange={progress}
          renderItem={({ item }: CarouselRenderItemInfo<JSX.Element>) => item}
          {...rest}
        />
        {!hidePagination ? (
          <Pagination.Basic
            size={8}
            progress={progress}
            data={pages}
            activeDotStyle={s.activeDot}
            dotStyle={s.inactiveDot}
            containerStyle={[s.paginationContainer, paginationContainer]}
            onPress={onPressPagination}
          />
        ) : null}
      </View>
    );
  },
);

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  activeDot: {
    backgroundColor: theme.colors.lightGray,
    borderRadius: 8,
  },
  inactiveDot: {
    backgroundColor: theme.colors.subtleGray,
    borderRadius: 8,
  },
  paginationContainer: {
    gap: 5,
    marginTop: 10,
  },
}));

export { Carousel };
