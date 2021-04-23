import { useMemo } from 'react';

function createT(texts) {
  return function t(path) {
    try {
      const text = path.split('.').reduce(lookUp, texts);
      if (typeof text === 'string') {
        return text;
      } else {
        if (process.env.DEBUG) {
          console.warn(`[useT] Typeof ${path} is ${typeof text}. Must be string.`, texts);
        }
        return path;
      }
    } catch {
      return path;
    }
  };
}

export default function useT(texts) {
  return useMemo(() => createT(texts), [texts]);
}

function lookUp(text, key) {
  return text[key];
}
