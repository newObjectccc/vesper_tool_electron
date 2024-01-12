import { useEffect, useRef } from 'react';

export const useMounted = (fn: () => void) => {
  const isMounted = useRef<boolean>(false);
  useEffect(() => {
    isMounted.current && fn();
    isMounted.current = true;
  }, []);
};
