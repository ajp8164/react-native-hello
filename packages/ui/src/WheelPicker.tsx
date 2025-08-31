import React, { useEffect, useState } from 'react';
import {
  type LayoutChangeEvent,
  type LayoutRectangle,
  Text,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import RNWheelPicker, { DatePicker } from '@quidone/react-native-wheel-picker';
import { type OnlyDateFormat } from '@quidone/react-native-wheel-picker/dest/typescript/date/date';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { ThemeManager } from './theme';
import { isEqual } from 'lodash';

type PickerInternalValue = string | Date;
type PickerInternalOnChangeValue = {
  wheelIndex: number;
  value: PickerInternalValue;
  index: number;
};

export enum PickerMode {
  Date = 'Date',
  DateBeta = 'DateBeta',
  Custom = 'Custom',
}

export type WheelPickerItem = {
  label: string;
  value: string | number;
};

export type WheelPickerWidth = string | number;

export interface WheelPicker {
  mode?: PickerMode;
  items?: WheelPickerItem[] | WheelPickerItem[][];
  itemHeight?: number;
  itemStyle?: TextStyle | TextStyle[];
  itemWidth?: WheelPickerWidth | WheelPickerWidth[];
  labels?: string | string[];
  labelStyle?: TextStyle | TextStyle[];
  labelWidth?: WheelPickerWidth | WheelPickerWidth[];
  overlayStyle?: ViewStyle | ViewStyle[];
  paddingWheel?: number;
  placeholder?: string | WheelPickerItem | WheelPickerItem[];
  value?: Date | string | string[];
  visibleItemCount?: number;
  wheelVisible?: boolean | boolean[];
  onValueChange: (
    wheelIndex: number,
    value: Date | string | string[],
    index: number,
  ) => void;
}

const defaultPlaceholder: WheelPickerItem = {
  label: 'Select an item...',
  value: 'placeholder',
};

const WheelPicker = ({
  mode = PickerMode.Custom,
  items,
  itemHeight = 35,
  itemStyle,
  itemWidth,
  labels,
  labelStyle,
  labelWidth,
  overlayStyle,
  paddingWheel = 5,
  placeholder = defaultPlaceholder,
  value,
  visibleItemCount,
  wheelVisible = true,
  onValueChange,
}: WheelPicker) => {
  const s = useStyles();

  const [pickerItems, setPickerItems] = useState<WheelPickerItem[][]>(
    (Array.isArray(items && items[0]) ? items : [items]) as WheelPickerItem[][],
  );

  useEffect(() => {
    // If caller changes the items then a re-render is needed to update wheel(s).
    setPickerItems(
      (Array.isArray(items && items[0])
        ? items
        : [items]) as WheelPickerItem[][],
    );
  }, [items]);

  useEffect(() => {
    // If caller changes wheel visibility then a re-render is needed to update wheel(s).
    setPickerWheelVisible(
      Array.isArray(wheelVisible) ? wheelVisible : [wheelVisible],
    );
  }, [wheelVisible]);

  useEffect(() => {
    // If caller changes wheel width then a re-render is needed to update wheel(s).
    setPickerItemWidth(
      (itemWidth && Array.isArray(itemWidth)
        ? itemWidth
        : [itemWidth]) as WheelPickerWidth[],
    );
  }, [itemWidth]);

  const [pickerValue, setPickerValue] = useState<PickerInternalValue[]>(
    (Array.isArray(value) ? value : [value]) as PickerInternalValue[],
  );
  const [pickerItemWidth, setPickerItemWidth] = useState<WheelPickerWidth[]>(
    (itemWidth && Array.isArray(itemWidth)
      ? itemWidth
      : [itemWidth]) as WheelPickerWidth[],
  );
  const [pickerWheelVisible, setPickerWheelVisible] = useState<boolean[]>(
    (wheelVisible && Array.isArray(wheelVisible)
      ? wheelVisible
      : [wheelVisible]) as boolean[],
  );
  const [pickerLabels, _setPickerLabels] = useState<string[]>(
    (labels && Array.isArray(labels)
      ? labels
      : labels
        ? [labels]
        : []) as string[],
  );
  const [pickerLabelWidth, _setPickerLabelWidth] = useState<WheelPickerWidth[]>(
    (labelWidth && Array.isArray(labelWidth)
      ? labelWidth
      : [labelWidth]) as WheelPickerWidth[],
  );

  const [containerLayout, setContainerLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handlePlaceholder = () => {
      const pi = ([] as WheelPickerItem[][]).concat(pickerItems);
      if (placeholder !== 'none') {
        let phValue = placeholder;
        if (typeof placeholder === 'string') {
          phValue = { ...defaultPlaceholder, label: placeholder };
        }
        const ph = (
          Array.isArray(phValue) ? phValue : [phValue]
        ) as WheelPickerItem[];

        pi.forEach((i, idx) => {
          if (!isEqual(ph[idx], {}) && i[0].value !== 'placeholder') {
            i.splice(0, 0, ph[idx] || ph[0]);
          }
        });
      }
      return pi;
    };

    if (mode === PickerMode.Custom) {
      const pi = handlePlaceholder();
      setPickerItems(pi);
    }
  }, []);

  const onDateValueChange = (_event: DateTimePickerEvent, date?: Date) => {
    const now = Date();
    setPickerValue([date || now]);
    onValueChange(0, date || now, 0);
  };

  const onDateValueChangeBeta = (event: { date: OnlyDateFormat }) => {
    const now = Date();
    setPickerValue([event.date || now]);
    onValueChange(0, event.date || now, 0);
  };

  const onChange = ({
    wheelIndex,
    value,
    index,
  }: PickerInternalOnChangeValue) => {
    const pv = ([] as string[]).concat(pickerValue as string[]);
    pv[wheelIndex] = (value === 'placeholder' ? '' : value) as string;
    setPickerValue(pv);
    onValueChange(wheelIndex, pv, index);
  };

  const onLayout = (e: LayoutChangeEvent) => {
    console.log(e.nativeEvent.layout);
    setContainerLayout(e.nativeEvent.layout);
  };

  return (
    <View onLayout={onLayout}>
      {mode === PickerMode.Date ? (
        <DateTimePicker
          display={'spinner'}
          onChange={onDateValueChange}
          value={pickerValue[0] as Date}
        />
      ) : mode === PickerMode.DateBeta ? (
        <DatePicker
          date={pickerValue[0] as string}
          onDateChanged={onDateValueChangeBeta}
          enableScrollByTapOnItem={true}
          itemTextStyle={itemStyle}
          overlayItemStyle={[s.overlay, overlayStyle]}
          itemHeight={itemHeight}
          visibleItemCount={visibleItemCount}
        />
      ) : (
        <View style={s.pickerContainer}>
          {pickerItems.map((wheel, wheelIndex) => {
            if (!pickerWheelVisible[wheelIndex]) {
              return null;
            }
            let iWidth: string | number =
              (itemWidth && pickerItemWidth[wheelIndex]) || '100%';
            if (typeof iWidth === 'string') {
              iWidth = (parseFloat(iWidth) / 100) * containerLayout?.width;
            }
            let lWidth = pickerLabelWidth[wheelIndex] || 0;
            if (typeof lWidth === 'string') {
              lWidth = (parseFloat(lWidth) / 100) * containerLayout?.width;
            }
            const tWidth = iWidth + lWidth;
            return (
              <View
                key={wheelIndex}
                style={[s.wheelContainer, { width: tWidth }]}>
                {pickerLabels?.[wheelIndex]?.length ? (
                  <View
                    style={[
                      s.labelContainer,
                      {
                        width: lWidth,
                        paddingHorizontal: paddingWheel,
                      },
                    ]}>
                    <Text style={[s.label, labelStyle]}>
                      {pickerLabels[wheelIndex]}
                    </Text>
                  </View>
                ) : null}
                <View
                  style={{ width: iWidth, paddingHorizontal: paddingWheel }}>
                  <RNWheelPicker
                    data={wheel}
                    value={pickerValue[wheelIndex] as string | number}
                    onValueChanged={({ item: { value }, index }) =>
                      onChange({
                        wheelIndex,
                        value: value as PickerInternalValue,
                        index,
                      })
                    }
                    enableScrollByTapOnItem={true}
                    itemTextStyle={itemStyle}
                    overlayItemStyle={[s.overlay, overlayStyle]}
                    itemHeight={itemHeight}
                    visibleItemCount={visibleItemCount}
                  />
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  wheelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  labelContainer: {
    justifyContent: 'center',
    marginTop: -1,
  },
  label: {
    fontSize: 22,
    fontFamily: theme.fonts.regular,
    textAlign: 'right',
    color: theme.colors.text,
  },
  overlay: {
    backgroundColor: theme.colors.stickyBlack,
    opacity: 0.1,
  },
}));

export { WheelPicker };
