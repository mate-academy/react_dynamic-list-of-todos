// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export function getWait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export function getData<T>(url: string): Promise<T> {
  return getWait(300)
    .then(() => fetch(BASE_URL + url))
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return response.json();
    });
}
