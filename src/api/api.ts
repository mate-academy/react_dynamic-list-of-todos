// eslint-disable-next-line
const API_URL_TODOS = `https://mate.academy/students-api/todos`;

export function getTodos(): Promise<Todo[]> {
  return fetch(API_URL_TODOS)
    .then(response => response.json());
}

// eslint-disable-next-line
const API_URL_USERS = `https://mate.academy/students-api/users/`;

export function getUser(userId: number): Promise<User> {
  return fetch(API_URL_USERS + userId)
    .then(response => response.json());
}
