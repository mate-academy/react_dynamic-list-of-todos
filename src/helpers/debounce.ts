export const debounce = (
  func: React.Dispatch<React.SetStateAction<string>>,
  delay: number,
) => {
  let timerId: NodeJS.Timeout;

  return (query: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay, query);
  };
};
