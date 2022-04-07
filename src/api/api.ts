const API_URL_TODOS = 'https://mate.academy/students-api/todos';
const API_URL_USERS = 'https://mate.academy/students-api/users';

export function getTodos(): Promise<Todo[]> {
  return fetch(API_URL_TODOS)
    .then(response => response.json());
}

export function getUsers(userId: number) {
  return fetch(`${API_URL_USERS}`)
    .then(response => response.json())
    .then(users => {
      return users.find((user: { id: number; }) => user.id === userId);
    });
}
