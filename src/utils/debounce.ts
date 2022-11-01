type SetQuery = (str: string) => void;

export const debounce = (f: SetQuery, delay: number) => {
  let timerId: NodeJS.Timeout;

  return (currQuery: string) => {
    clearTimeout(timerId);

    timerId = setTimeout(f, delay, currQuery);
  };
};
