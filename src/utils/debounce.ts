type Callback = (str: string) => void;

export const debounce = (f: Callback, delay: number) => {
  let timerId: NodeJS.Timeout;

  return (str: string) => {
    clearTimeout(timerId);

    timerId = setTimeout(f, delay, str);
  };
};
