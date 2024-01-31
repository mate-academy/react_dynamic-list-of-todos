/* eslint-disable prefer-template */
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
  // we add some delay to see how the loader works
  return wait(300)
    .then(() => fetch(BASE_URL + url + '.json'))
    .then(res => (res.ok ? res.json() : Promise.reject(res.status)));
}

export const getTodos = () => get<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

export const getComplited = () => getTodos()
  .then(todos => todos.filter(todo => todo.completed === true));

export const getActive = () => getTodos()
  .then(todos => todos.filter(todo => todo.completed === false));
