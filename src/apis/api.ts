import { Todo, User } from '../react-app-env';

const TODOS_API = 'https://mate.academy/students-api/todos';
const USERS_API = 'https://mate.academy/students-api/users';

export const getAllTodos = (): Promise<Todo[]> => (
  fetch(TODOS_API)
    .then(response => response.json())
);

export const getAllUsers = (): Promise<User[]> => (
  fetch(USERS_API)
    .then(response => response.json())
);

export const getUser = async (userId: number) => {
  const userFromServer = await fetch(`${USERS_API}/${userId}`)
    .then(response => response.json());

  return userFromServer;
};
