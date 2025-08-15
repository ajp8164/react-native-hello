import { ThemeManager, useTheme } from '../../theme';
import React, { useImperativeHandle } from 'react';
import type { ScannerViewMethods, ScannerViewProps } from './types';

import { Camera } from 'react-native-camera-kit';
import { View } from 'react-native';
import lodash from 'lodash';
import { Button } from '../..';

type ScannerView = ScannerViewMethods;

const ScannerView = React.forwardRef<ScannerView, ScannerViewProps>(
  (props, ref) => {
    const { cameraStyle, containerStyle, OverlayComponent, onCancel, onScan } =
      props;

    const theme = useTheme();
    const s = useStyles();

    useImperativeHandle(ref, () => ({
      //  These functions exposed to the parent component through the ref.
    }));

    // Prevent camera from calling us more than once on a scan.
    const success = lodash.debounce(
      (data: string) => {
        onScan(data);
      },
      1000,
      { leading: true, trailing: false },
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onBarCodeRead = (event: any) => {
      success(event.nativeEvent.codeStringValue);
    };

    return (
      <View style={[s.container, containerStyle]}>
        <Camera
          style={[s.camera, cameraStyle]}
          scanBarcode={true}
          onReadCode={onBarCodeRead}
        />
        {OverlayComponent}
        {onCancel && (
          <Button
            title={'Cancel'}
            titleStyle={s.buttonTitle}
            buttonStyle={[
              theme.styles.buttonOutline,
              { backgroundColor: theme.colors.transparent },
            ]}
            containerStyle={s.buttonContainer}
            onPress={onCancel}
          />
        )}
      </View>
    );
  },
);

const useStyles = ThemeManager.createStyleSheet(({ theme }) => ({
  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    alignItems: 'center',
  },
  buttonTitle: {
    ...theme.styles.buttonTitle,
    color: theme.colors.stickyWhite,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    height: '100%',
  },
}));

export { ScannerView };
