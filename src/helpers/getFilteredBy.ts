export const getFilteredBy = <T> (
  items: T[],
  ...callbacks: ((item: T) => boolean) []
) => {
  return items
    .filter(item => callbacks.every(callback => callback(item)));
};
