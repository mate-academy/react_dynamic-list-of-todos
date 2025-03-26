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
    .then(res => res.json())
    .catch(error => {
      window.alert(error);

      return [];
    });
}

export const getTodos = async (
  setValue: (v: Todo[]) => void,
  setIsPending: (v: boolean) => void,
) => {
  setIsPending(true);
  await get<Todo[]>('/todos').then(resp => setValue(resp));
  setIsPending(false);
};

export const getUser = async (
  userId: number,
  setUser: (v: User) => void,
  setIsPending: (v: boolean) => void,
) => {
  setIsPending(true);
  const data = await get<User>(`/users/${userId}`);

  setUser(data);
  setIsPending(false);
};
