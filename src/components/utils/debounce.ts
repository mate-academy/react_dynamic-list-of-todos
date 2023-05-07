export function debounce<F extends (...args: any) => any>(f: F, delay: number) {
  let timerId: NodeJS.Timeout;

  return (...args: any) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
}
