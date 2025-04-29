import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { type Key, useEffect, useState } from 'react';
import { Text, type TextStyle, View, type ViewStyle } from 'react-native';

import { Picker as RNPicker } from '@react-native-picker/picker';
import { isEqual } from 'lodash';
import { makeStyles } from '@rneui/themed';
import { type AppTheme, fontFamily, useTheme, viewport } from './theme';

type PickerInternalValue = string | Date;
type PickerInternalOnChangeValue = {
  wheelIndex: number;
  value: PickerInternalValue;
  index: number;
};

export enum PickerMode {
  Date = 'Date',
  Custom = 'Custom',
}

export type WheelPickerItem = {
  label: string;
  value: string | number;
  color?: string;
  style?: ViewStyle;
  fontFamily?: string;
  enabled?: boolean;
};

export type WheelPickerWidth = string | number;

export interface WheelPickerProps {
  androidDialogPrompt?: string;
  androidMode?: 'dialog' | 'dropdown';
  androidOnBlur?: () => void;
  androidOnFocus?: () => void;
  dropdownIconColor?: string;
  mode?: PickerMode;
  items?: WheelPickerItem[] | WheelPickerItem[][];
  itemStyle?: TextStyle;
  itemWidth?: WheelPickerWidth | WheelPickerWidth[];
  labels?: string | string[];
  labelWidth?: WheelPickerWidth | WheelPickerWidth[];
  placeholder?: string | WheelPickerItem | WheelPickerItem[];
  pickerContainerStyle?: ViewStyle | ViewStyle[];
  pickerStyle?: ViewStyle | ViewStyle[];
  value?: Date | string | string[];
  wheelVisible?: boolean | boolean[];
  onValueChange: (
    wheelIndex: number,
    value: Date | string[],
    index: number,
  ) => void;
}

const defaultPlaceholder: WheelPickerItem = {
  label: 'Select an item...',
  value: 'placeholder',
  color: '#9EA0A4',
};

const WheelPicker = ({
  androidDialogPrompt,
  androidMode,
  androidOnBlur,
  androidOnFocus,
  dropdownIconColor,
  mode = PickerMode.Custom,
  items,
  itemStyle,
  itemWidth,
  labels,
  labelWidth,
  placeholder = defaultPlaceholder,
  pickerContainerStyle,
  pickerStyle,
  value,
  wheelVisible = true,
  onValueChange,
}: WheelPickerProps) => {
  const theme = useTheme();
  const s = useStyles(theme);

  const [pickerItems, setPickerItems] = useState<WheelPickerItem[][]>(
    (Array.isArray(items && items[0]) ? items : [items]) as WheelPickerItem[][],
  );

  useEffect(() => {
    // If caller changes the items then a re-render is needed to update wheel(s).
    let placeholderItem;
    if (placeholder !== 'none') {
      placeholderItem = pickerItems[0];
    }
    setPickerItems(
      (Array.isArray(items && items[0])
        ? [placeholderItem].concat(items)
        : [placeholderItem, items]) as WheelPickerItem[][],
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

  const renderPickerItems = (items: WheelPickerItem[]) => {
    return items.map(item => (
      <RNPicker.Item
        label={item.label}
        value={item.value}
        key={item.value as Key}
        color={item.color || theme.colors.text}
        style={item.style}
        fontFamily={item.fontFamily}
        enabled={item.enabled}
      />
    ));
  };

  const onDateValueChange = (_event: DateTimePickerEvent, date?: Date) => {
    const now = Date();
    // setPickerValue([date || now]);
    setPickerValue([date || now]);
    onValueChange(0, date || [now], 0);
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
          display="spinner"
          onChange={onDateValueChange}
          value={pickerValue[0] as Date}
        />
      ) : (
        <View style={[s.pickerContainer, pickerContainerStyle]}>
          {pickerItems.map((wheel, wheelIndex) => {
            if (!pickerWheelVisible[wheelIndex]) {
              return null;
            }
            let iWidth: string | number =
              (itemWidth && pickerItemWidth[wheelIndex]) || '100%';
            if (typeof iWidth === 'string') {
              iWidth = (parseFloat(iWidth) / 100) * viewport.width;
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
                    <Text style={s.label}>{pickerLabels[wheelIndex]}</Text>
                  </View>
                ) : null}
                <View style={{ width: iWidth }}>
                  <RNPicker
                    prompt={androidDialogPrompt}
                    mode={androidMode || 'dropdown'}
                    onValueChange={(value, index) =>
                      onChange({ wheelIndex, value, index })
                    }
                    onBlur={androidOnBlur}
                    onFocus={androidOnFocus}
                    selectedValue={pickerValue[wheelIndex]}
                    dropdownIconColor={dropdownIconColor}
                    style={[s.picker, pickerStyle]}
                    itemStyle={itemStyle}
                    // @ts-expect-error - themeVariant is not typed
                    themeVariant={theme.mode}>
                    {renderPickerItems(wheel)}
                  </RNPicker>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
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
    fontFamily,
    textAlign: 'right',
    color: theme.colors.text,
  },
  picker: {
    alignItems: 'center',
  },
}));

export { WheelPicker };
