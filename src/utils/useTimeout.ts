import * as React from 'react';

export const useTimeout = (function_: () => void, wait: number) => {
  return React.useEffect(() => {
    const timeoutId = setTimeout(function_, wait);

    return () => clearTimeout(timeoutId);
  });
};
