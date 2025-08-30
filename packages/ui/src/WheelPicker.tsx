import React, { useEffect, useState } from 'react';
import { Text, View, type ViewStyle, type TextStyle } from 'react-native';

import RNWheelPicker, { DatePicker } from '@quidone/react-native-wheel-picker';
import { type OnlyDateFormat } from '@quidone/react-native-wheel-picker/dest/typescript/date/date';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { ThemeManager, useDevice } from '@react-native-hello/ui';
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
  placeholder = defaultPlaceholder,
  value,
  visibleItemCount,
  wheelVisible = true,
  onValueChange,
}: WheelPicker) => {
  const s = useStyles();
  const device = useDevice();

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
    (labels && Array.isArray(labels) ? labels : [labels]) as string[],
  );
  const [pickerLabelWidth, _setPickerLabelWidth] = useState<WheelPickerWidth[]>(
    (labelWidth && Array.isArray(labelWidth)
      ? labelWidth
      : [labelWidth]) as WheelPickerWidth[],
  );

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

  return (
    <View>
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
              iWidth = (parseFloat(iWidth) / 100) * device.screen.width;
            }
            let lWidth = pickerLabelWidth[wheelIndex] || 0;
            if (typeof lWidth === 'string') {
              lWidth = parseFloat(lWidth) / 100;
            }
            const tWidth = iWidth + lWidth;
            return (
              <View
                key={wheelIndex}
                style={[s.wheelContainer, { width: tWidth }]}>
                {pickerLabels ? (
                  <View style={[s.labelContainer, { width: lWidth }]}>
                    <Text style={[s.label, labelStyle]}>
                      {pickerLabels[wheelIndex]}
                    </Text>
                  </View>
                ) : null}
                <View style={{ width: iWidth }}>
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
    opacity: 0.15,
    marginBottom: 16,
  },
}));

export { WheelPicker };
