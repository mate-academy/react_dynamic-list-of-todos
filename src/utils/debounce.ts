export function debounce<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) {
  let timerId: ReturnType<typeof setTimeout>;

  const debounced = (...args: Args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback(...args), delay);
  };

  debounced.cancel = () => clearTimeout(timerId);

  return debounced;
}
