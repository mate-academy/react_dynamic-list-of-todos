import React from 'react';

export const debounce = (
  func: React.Dispatch<React.SetStateAction<string>>,
  delay = 500,
) => {
  let id = 0;

  return (...args: unknown[]) => {
    if (id) {
      clearTimeout(id);
    }

    id = setTimeout(func, delay, ...args);
  };
};
