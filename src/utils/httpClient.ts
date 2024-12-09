const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';

export function GetData(url: string) {
  return fetch(BASE_URL + url).then(response => {
    return response.json();
  });
}
