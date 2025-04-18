/* global __DEV__, console */ 
import * as Sentry from '@sentry/react-native';

import { getBuildNumber, getVersion } from 'react-native-device-info';

import { ReactNativeHello } from '..';
import { type SentryTransportOptions } from '..';
import type { SeverityLevel } from '@sentry/core';
import type { transportFunctionType } from 'react-native-logs';

enum SentrySeverityMap {
  'debug',
  'info',
  'warning',
  'error',
  'fatal',
}

const init = (userId?: string) => {
  if (!__DEV__ && Sentry.init) {
    Sentry.init({
      dsn: ReactNativeHello.get('sentryEndpoint'),
      environment: ReactNativeHello.get('buildEnvironment'),
      debug: false,
      enableAutoSessionTracking: true,
      release: getVersion(),
      dist: getBuildNumber(),
    });
    if (userId) {
      Sentry.setUser({ id: userId })
    };
  }
};

const sentryTransport: transportFunctionType<
  SentryTransportOptions
> = props => {
  if (props.level.text.includes('session')) {
    return;
  }

  const severity =
    props?.level?.severity === undefined
      ? SentrySeverityMap.error
      : props?.level?.severity;

  const sentrySeverity: SeverityLevel = SentrySeverityMap[
    severity
  ] as SeverityLevel;

  if (__DEV__) {
    let consoleLogger = console.log;
    switch (SentrySeverityMap[severity]) {
      case 'warning':
        consoleLogger = console.warn;
        break;
      case 'error':
        consoleLogger = console.error;
        break;
      default:
        break;
    }
    consoleLogger(props?.msg);
  } else {
    // console.log(`SENTRY: [${sentrySeverity}] ${props?.msg}`);
    if (
      ReactNativeHello.get('sentryLoggingEnabled') === true &&
      severity > SentrySeverityMap.info
    ) {
      Sentry.withScope(scope => {
        scope.setLevel(sentrySeverity);
        Sentry.captureMessage(props?.msg);
      });
    }
  }

  return true;
};

export { init, sentryTransport };
