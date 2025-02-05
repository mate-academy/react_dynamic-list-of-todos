import { Todo } from './types/Todo';
import { User } from './types/User';

const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string, status?: string, query?: string): Promise<T> {
  const fullURL = BASE_URL + url + '.json';

  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json())
    .then(data => {
      if (url === '/todos') {
        let filteredData = data as Todo[];

        if (query) {
          filteredData = filteredData.filter(todo =>
            todo.title.toLowerCase().includes(query.toLowerCase()),
          );
        }

        if (status === 'active') {
          filteredData = filteredData.filter(todo => !todo.completed);
        } else if (status === 'completed') {
          filteredData = filteredData.filter(todo => todo.completed);
        }

        return filteredData as T;
      }

      return data as T;
    })
    .catch(() => {
      throw new Error('Something went wrong...');
    });
}

export const getTodos = (status?: string, query?: string) =>
  get<Todo[]>('/todos', status, query);

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
