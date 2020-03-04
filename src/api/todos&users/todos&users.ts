import { TODOS_URL, USERS_URL } from '../../constants/constants';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const getTodos = async () => {
  return getData<Todo[]>(TODOS_URL);
};

export const getUsers = async () => {
  return getData<User[]>(USERS_URL);
};
