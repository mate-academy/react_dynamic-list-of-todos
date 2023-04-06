import { Todo } from './types/Todo';
import { User } from './types/User';

// eslint-disable-next-line max-len
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

// This function creates a promime
// that is resolved after a given delay
function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  // we add some delay to see now the laoder works
  return wait(300)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

export const getTodos = () => get<Todo[]>('/todos');

// export const getUser = (userId: number) => {
//   return get<User[]>('/users')
//     .then((users) => {
//       // eslint-disable-next-line no-console
//       console.log(users, userId);

//       return users.find((user) => user.id === userId);
//     });
// };

export const getUser = (userId: number) => get<User>(`/users/${userId}`);
