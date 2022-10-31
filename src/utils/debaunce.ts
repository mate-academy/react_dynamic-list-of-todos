type Callback = (newQuery: string) => void;

export function debaunce(f: Callback, delay: number) {
  let timerId: number;

  return (...args: []) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(f, delay, ...args);
  };
}
