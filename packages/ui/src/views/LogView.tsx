import { Text, View } from 'react-native';

import type { LogEntry } from '@react-native-hello/common';
import React from 'react';
import { useTheme } from '../theme';

interface LogView {
  logContent: LogEntry[];
}

const LogView = ({ logContent }: LogView) => {
  const theme = useTheme();
  let key = 0;

  return (
    <View style={{ width: '100%' }}>
      {logContent.map(l => {
        return (
          <View key={key++} style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={[theme.text.tiny, { fontFamily: theme.fonts.bold }]}>
              {l.ts}
            </Text>
            <Text
              style={[
                theme.text.tiny,
                { fontFamily: theme.fonts.bold },
                // prettier-ignore
                l.level.text === 'warn'
                  ? { color: theme.colors.warning }
                  : l.level.text === 'error'
                  ? { color: theme.colors.assertive }
                  : l.level.text === 'info'
                  ? { color: theme.colors.success }
                  : { color: theme.colors.lightGray },
              ]}>
              {'[' + l.level.text + ']'}
            </Text>
            <Text
              style={[
                theme.text.tiny,
                // prettier-ignore
                l.level.text === 'warn'
                  ? { color: theme.colors.warning }
                  : l.level.text === 'error'
                  ? { color: theme.colors.assertive }
                  : null,
              ]}>
              {l.msg}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export { LogView };
