import { CompletedStatus } from './types/Status';
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

// export const getTodos = () => get<Todo[]>('/todos');
export const getTodos = (status: CompletedStatus): Promise<Todo[]> => {
  return get<Todo[]>('/todos').then(res => {
    switch (status) {
      case CompletedStatus.all:
        return res;

      case CompletedStatus.active:
        return res.filter(todo => !todo.completed);

      case CompletedStatus.completed:
        return res.filter(todo => todo.completed);

      default:
        return [];
    }
  });
};

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
