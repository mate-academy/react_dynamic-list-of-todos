const TODO_URL = 'https://mate.academy/students-api/todos';
const USER_URL = 'https://mate.academy/students-api/users/';

export function getAllTodos(): Promise<Todo[]> {
  return fetch(TODO_URL)
    .then(response => response.json());
}

export function getUser(userId: number): Promise<User> {
  return fetch(`${USER_URL}${userId}`)
    .then(response => response.json());
}
