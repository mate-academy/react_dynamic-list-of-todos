export const debounce = (func: (qwery: string) => void, delay: number) => {
  let timer: NodeJS.Timeout;

  return (newQwery: string) => {
    clearTimeout(timer);

    timer = setTimeout(func, delay, newQwery);
  };
};
