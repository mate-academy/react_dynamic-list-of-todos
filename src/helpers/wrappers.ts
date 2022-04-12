/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = (f:Function, delay:number) => {
  let timerId: number;

  return (...args:any[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};
