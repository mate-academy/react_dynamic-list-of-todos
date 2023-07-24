// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then((response) => response.json());
}
