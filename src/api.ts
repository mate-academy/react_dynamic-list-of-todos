import { Todo, User } from './types';

const URL_USERS = 'https://mate.academy/students-api/users';
const URL_TODOS = 'https://mate.academy/students-api/todos';

interface ResponseData<D> {
  data: D;
  error?: string;
}

type UsersData = ResponseData<User[]>;
type TodosData = ResponseData<Todo[]>;

export function loadUsers(): Promise<User[]> {
  return fetch(URL_USERS)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Response of Users API not successful ${response.statusText}`);
    })
    .then(({ data }: UsersData) => data)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error.message);

      throw new Error('Failed to Fetch Users');
    });
}

export function loadTodos(): Promise<Todo[]> {
  return fetch(URL_TODOS)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Response of Todos API ot successful ${response.statusText}`);
    })
    .then(({ data }: TodosData) => data)
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(error.message);

      throw new Error('Failed to Fetch Todos');
    });
}
