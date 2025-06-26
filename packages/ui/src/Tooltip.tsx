import { makeStyles } from '@rn-vui/themed';
import React, { type ReactNode, useState } from 'react';
import { type AppTheme, useTheme, viewport } from './theme';
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
  const s = useStyles(theme);

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
      width={viewport.width * 0.6}
      backgroundColor={'#4e5270'}
      overlayColor={theme.colors.transparent}
      withPointer={true}
      {...props}>
      {props.children}
    </RNTooltip>
  );
};

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  container: {
    width: viewport.width * 0.6,
    height: 130,
    borderRadius: 12,
  },

  popoverViewContainer: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  text: {
    ...theme.styles.textNormal,
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
}));

export { Tooltip };
