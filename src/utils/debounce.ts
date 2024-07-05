export const debounce = (callback: (args: string) => void) => {
  let timerId = 0;

  return (args: string) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => {
      callback(args);
    }, 300);
  };
};
