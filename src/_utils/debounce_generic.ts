/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<T extends (...args: any[]) => any>(
  f: T,
  delay: number): (...args: Parameters<T>) => void {
  let timerId: number | undefined;

  return (...args: Parameters<T>) => {
    clearTimeout(timerId);
    timerId = window.setTimeout(() => f(...args), delay);
  };
}
