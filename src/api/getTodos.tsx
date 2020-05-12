import { Todo, User } from '../components/Interfaces';

const API_URL = '../api';
const API_URL_TODOS = `${API_URL}/todos.json`;
const API_URL_USERS = `${API_URL}/users.json`;

export const getData = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

export const getTodos = async () => {
  const [todos, users] = await Promise.all([
    getData(API_URL_TODOS),
    getData(API_URL_USERS),
  ]);

  const preparedTodos = todos.map((todo: Todo) => {
    return {
      ...todo,
      user: users.find((user: User) => user.id === todo.userId),
    };
  });

  return preparedTodos;
};
