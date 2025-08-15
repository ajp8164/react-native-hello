import React, { type ReactNode, useState } from 'react';
import { ThemeManager, useDevice, useTheme } from './theme';
import {
  Tooltip as RNTooltip,
  type TooltipProps as RNETooltipProps,
} from '@rn-vui/base';
import { Text, View } from 'react-native';

interface Tooltip extends RNETooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip = ({ ...props }: Tooltip) => {
  const theme = useTheme();
  const s = useStyles();
  const device = useDevice();

  const [open, setOpen] = useState(false);

  return (
    <RNTooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      popover={
        <View style={s.popoverViewContainer}>
          <Text style={s.text}>{props.text}</Text>
        </View>
      }
      containerStyle={s.container}
      width={device.screen.width * 0.6}
      backgroundColor={'#4e5270'}
      overlayColor={theme.colors.transparent}
      withPointer={true}
      {...props}>
      {props.children}
    </RNTooltip>
  );
};

const useStyles = ThemeManager.createStyleSheet(({ theme, device }) => ({
  container: {
    width: device.screen.width * 0.6,
    height: 130,
    borderRadius: 12,
  },

  popoverViewContainer: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  text: {
    ...theme.text.normal,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
}));

export { Tooltip };
