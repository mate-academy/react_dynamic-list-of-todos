import { USERS_URL, TOODS_URL, BASE_URL } from '../constants/api';
import {
  Todo,
  UserI,
  TodoWithUser,
} from '../constants/types';

const getDataFromServer = async <T>(url: string): Promise<T> => {
  const data = await fetch(`${BASE_URL}${url}`);

  return data.json();
};

const getUsers: () => Promise<UserI[]> = async () => {
  const users = await getDataFromServer<UserI[]>(USERS_URL);

  return users;
};

const getToddos: () => Promise<Todo[]> = async () => {
  const todos = await getDataFromServer<Todo[]>(TOODS_URL);

  return todos;
};

export const getTodosWithUser: () => Promise<TodoWithUser[]> = async () => {
  const [todos, users] = await Promise.all([
    getToddos(),
    getUsers(),
  ]);

  const todosWithUser = todos.map((todo: Todo) => {
    const user = users.find((person: UserI) => person.id === todo.userId) as UserI;

    return {
      ...todo,
      user,
    };
  });

  return todosWithUser;
};
