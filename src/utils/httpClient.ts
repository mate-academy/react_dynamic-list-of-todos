const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export function getData(url: string) {
  return fetch(BASE_URL + url).then(response => response.json());
}
