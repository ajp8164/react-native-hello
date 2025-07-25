/* eslint-disable @typescript-eslint/no-explicit-any */

// See https://github.com/streamich/react-use/blob/master/docs/useSetState.md

import { useCallback, useState } from 'react';

import lodash from 'lodash';

export type UseSetStateOptions = {
  assign: boolean;
};

const useSetState = <T extends object>(
  initialState: T = {} as T,
): [
  T,
  (
    patch: Partial<T> | ((prevState: T) => Partial<T>),
    options?: UseSetStateOptions,
  ) => void,
] => {
  const [state, set] = useState<T>(initialState);
  const setState = useCallback((patch: any, options?: UseSetStateOptions) => {
    const replacer = options?.assign ? lodash.assign : lodash.merge;
    set(prevState =>
      replacer(
        {},
        prevState,
        patch instanceof Function ? patch(prevState) : patch,
      ),
    );
  }, []);

  return [state, setState];
};

export { useSetState };
