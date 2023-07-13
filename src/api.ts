import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// This function creates a promise
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }

      return res.json();
    });
}

export const getAllTodos = () => {
  return get<Todo[]>('/todos');
};

export const getCompleted = () => {
  return getAllTodos()
    .then(todos => todos
      .filter(todo => todo.completed));
};

export const getActive = () => {
  return getAllTodos()
    .then(todos => todos
      .filter(todo => !todo.completed));
};

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
