const BASE_URL = 'https://mate.academy/students-api';

export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(response => {
      if (response.ok) {
      }

      return response.json();
    })
    .then(todos => todos);
}
