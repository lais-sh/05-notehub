import { useEffect, useState } from 'react';

export default function useDebounce<T>(input: T, delayMs: number): T {
  const [debounced, setDebounced] = useState<T>(input);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounced(input);
    }, delayMs);

    return () => clearTimeout(timeoutId);
  }, [input, delayMs]);

  return debounced;
}
