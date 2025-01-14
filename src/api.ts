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

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  // we add some delay to see how the loader works
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

// interface GetTodosResponse {
//   todos: Todo[];
// }

export const getTodos = (
  filter: 'all' | 'active' | 'completed',
): Promise<Todo[]> => {
  const todos = get<Todo[]>('/todos');

  switch (filter) {
    case 'all':
      return todos;
    case 'active':
      return todos.then(todo => todo.filter(data => !data.completed));
    case 'completed':
      return todos.then(todo => todo.filter(data => data.completed));
    default:
      return todos;
  }

  // return todos.then(data => ({ todos: data }));
};

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
