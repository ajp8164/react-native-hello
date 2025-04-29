import { useRef, type EffectCallback, type DependencyList, useEffect } from 'react';

export function useNoInitialEffect(effect: EffectCallback, dependencies?: DependencyList) {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns: void | (() => void) = () => {
      return;
    };

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    // Preserve the destructor returned by the effect to execute on component unmount.
    if (effectReturns && typeof effectReturns === 'function') {
      return effectReturns;
    }
    return undefined;
  }, dependencies);
}
