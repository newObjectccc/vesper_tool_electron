import { useEffect, useRef } from 'react';

export const useMounted = (fn: () => void) => {
  const isMounted = useRef<boolean>(false);
  useEffect(() => {
    let hasCallback;
    if (isMounted.current) {
      hasCallback = fn();
    }
    isMounted.current = true;
    return hasCallback;
  }, []);
};
