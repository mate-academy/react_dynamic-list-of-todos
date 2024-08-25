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
  return wait(2000)
    .then(() => fetch(fullURL))
    .then(res => res.json());
}

async function getAsynk<T>(url: string): Promise<T> {
  // eslint-disable-next-line prefer-template
  const fullURL = BASE_URL + url + '.json';

  await wait(2000);
  const response: Response = await fetch(fullURL);

  return response.json();
}

export const getTodos = () => getAsynk<Todo[]>('/todos');

export const getUser = (userId: number) => get<User>(`/users/${userId}`);

export const getUserCastom = async (userId: number): Promise<User> => {
  await wait(400);
  const response = await fetch(
    `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`,
  );

  return response.json();
};
