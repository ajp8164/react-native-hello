import { type AppTheme, useTheme } from '../../../../theme';
import { Button, Icon } from '@rn-vui/base';
import { Image, StyleSheet, View } from 'react-native';
import type { MediaViewMethods, MediaViewProps } from './types';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Video, {
  type OnVideoErrorData,
  type OnLoadData,
} from 'react-native-video';

import type { ImageLoadEventData } from 'react-native';
import type { NativeSyntheticEvent } from 'react-native';
import { log } from '@react-native-hello/core';
import { makeStyles } from '@rn-vui/themed';
import { saveToCameraRoll } from '../../helpers';
import { useIsFocused } from '@react-navigation/core';
import { useIsForeground } from '../../../../hooks/useIsForeground';

const actionButtonSize = 65;

const isVideoOnLoadEvent = (
  event: OnLoadData | NativeSyntheticEvent<ImageLoadEventData>,
): event is OnLoadData => 'duration' in event && 'naturalSize' in event;

type MediaView = MediaViewMethods;

const MediaView = React.forwardRef<MediaView, MediaViewProps>((props, _ref) => {
  const { actionButton, onPress, path, saveOnAction = false, type } = props;

  const theme = useTheme();
  const s = useStyles(theme);

  const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
  const isForeground = useIsForeground();
  const isScreenFocused = useIsFocused();
  const isVideoPaused = !isForeground || !isScreenFocused;

  const mediaWidth = useRef(0);
  const mediaHeight = useRef(0);

  const onMediaLoad = useCallback(
    (event: OnLoadData | NativeSyntheticEvent<ImageLoadEventData>) => {
      if (isVideoOnLoadEvent(event)) {
        mediaWidth.current = event.naturalSize.width;
        mediaHeight.current = event.naturalSize.height;
        log.debug(
          `Video loaded. Size: ${event.naturalSize.width}x${event.naturalSize.height} (${event.naturalSize.orientation}, ${event.duration} seconds)`,
        );
      } else {
        mediaWidth.current = event.nativeEvent.source.width;
        mediaHeight.current = event.nativeEvent.source.height;
        log.debug(
          `Image loaded. Size: ${event.nativeEvent.source.width}x${event.nativeEvent.source.height}`,
        );
      }
    },
    [],
  );

  const onMediaLoadEnd = useCallback(() => {
    log.debug('Media has loaded.');
    setHasMediaLoaded(true);
  }, []);

  const onMediaLoadError = useCallback((error: OnVideoErrorData) => {
    log.debug(`Failed to load media: ${JSON.stringify(error)}`);
  }, []);

  const source = useMemo(() => ({ uri: `file://${path}` }), [path]);

  const screenStyle = useMemo(
    () => ({ opacity: hasMediaLoaded ? 1 : 0 }),
    [hasMediaLoaded],
  );

  return (
    <View style={[s.container, screenStyle]}>
      {type === 'photo' && (
        <Image
          source={source}
          style={StyleSheet.absoluteFill}
          resizeMode="contain"
          onLoadEnd={onMediaLoadEnd}
          onLoad={onMediaLoad}
        />
      )}
      {type === 'video' && (
        <Video
          source={source}
          style={StyleSheet.absoluteFill}
          paused={isVideoPaused}
          resizeMode="contain"
          posterResizeMode="contain"
          allowsExternalPlayback={false}
          automaticallyWaitsToMinimizeStalling={false}
          disableFocus={true}
          repeat={true}
          useTextureView={false}
          controls={false}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onReadyForDisplay={onMediaLoadEnd}
          onLoad={onMediaLoad}
          onError={onMediaLoadError}
        />
      )}
      <Button
        type={'clear'}
        containerStyle={[s.actionButton, actionButton?.containerStyle]}
        icon={
          <Icon
            name={'send'}
            type={'material'}
            color={theme.colors.stickyWhite}
            size={35}
            style={{ width: actionButtonSize, left: 4 }}
            {...actionButton?.icon}
          />
        }
        onPress={() => {
          if (onPress) onPress(mediaWidth.current, mediaHeight.current);
          if (saveOnAction) saveToCameraRoll(path, type);
        }}
      />
    </View>
  );
});

const useStyles = makeStyles((_theme, theme: AppTheme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.stickyBlack,
  },
  actionButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: theme.insets.bottom + 30,
    width: actionButtonSize,
    height: actionButtonSize,
    borderRadius: actionButtonSize / 2,
    borderWidth: 3.5,
    borderColor: theme.colors.stickyWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default MediaView;
