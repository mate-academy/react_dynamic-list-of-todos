export function debounce(f:(finalQuery: string) => void, delay: number) {
  let timerId: NodeJS.Timeout;

  return (arg: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, arg);
  };
}
