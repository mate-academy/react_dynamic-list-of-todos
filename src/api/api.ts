const TODO_API = 'https://mate.academy/students-api/todos';
const USER_API = 'https://mate.academy/students-api/users/';

export function getTodos(): Promise<Todo[]> {
  return fetch(TODO_API)
    .then(response => response.json());
}

export function getUser(userId: number): Promise<User> {
  return fetch(`${USER_API}${userId}`)
    .then(response => response.json());
}
