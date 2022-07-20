import { Todo, User } from '../react-app-env';

const TODO_URL = 'https://mate.academy/students-api/todos';
const USER_URL = 'https://mate.academy/students-api/users/';

export function getTodo(): Promise<Todo[]> {
  return fetch(TODO_URL)
    .then(response => {
      if (!response.ok) {
        Promise.reject();
      }

      return response.json();
    });
}

export function getUser(userId: number): Promise<User> {
  return fetch(`${USER_URL}${userId}`)
    .then(response => {
      if (!response.ok) {
        Promise.reject();
      }

      return response.json();
    });
}
