export const debounce = (
  func: React.Dispatch<React.SetStateAction<string>>,
  delay: number,
) => {
  let timerId = 0;

  return (...args: unknown[]) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(func, delay, ...args);
  };
};
