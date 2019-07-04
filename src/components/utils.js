export const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
export const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

export function doFetch(url) {
  return fetch(url).then(response => response.json());
}
