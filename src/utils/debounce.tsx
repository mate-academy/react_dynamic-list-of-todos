export const debounce = (
  f: React.Dispatch<React.SetStateAction<string>>,
  delay: number,
) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};
