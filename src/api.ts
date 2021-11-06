const API_URL = 'https://mate.academy/students-api/todos';
const API_USER_URL = 'https://mate.academy/students-api/users/';

export function getTodos(): Promise<Todo[]> {
  return fetch(API_URL)
    .then(promise => promise.json());
}

export function getUser(userId: number): Promise<User> {
  return fetch(`${API_USER_URL}${userId}`)
    .then(promise => promise.json());
}
