import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line operator-linebreak
const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// This function creates a promise
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getTodos = (): Promise<Todo[]> => {
  return fetch(BASE_URL + '/todos.json').then(response => {
    if (!response.ok) {
      throw new Error('Failed to load todos');
    }

    return response.json();
  });
};

export const getUser = (userId: number): Promise<User> => {
  return wait(500)
    .then(() => fetch(`${BASE_URL}/users/${userId}.json`))
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Not found');
    })
    .catch(() => {
      return fetch(`${BASE_URL}/users.json`)
        .then(response => response.json())
        .then((users: User[]) => {
          const found = users.find(u => u.id === userId);

          return found || Promise.reject('User not found');
        });
    });
};
