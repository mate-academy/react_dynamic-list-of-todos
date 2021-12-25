// eslint-disable-next-line
const API_URL = `https://mate.academy/students-api/todos`;

export function getTodos(): Promise<Todo[]> {
  return fetch(API_URL)
    .then(response => response.json());
}

const USER_API_URL = 'https://mate.academy/students-api/users/';

export function getUser(id: number | null): Promise<User> {
  return fetch(`${USER_API_URL}${id}`)
    .then(response => response.json());
}
