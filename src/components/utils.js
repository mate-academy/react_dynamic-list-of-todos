export const usersUrl = 'https://jsonplaceholder.typicode.com/users';
export const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

export function getData(url) {
  return fetch(url).then(response => response.json());
}
