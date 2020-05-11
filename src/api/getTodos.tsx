import { Todo, User } from '../components/Interfaces';

const API_URL_TODOS = 'https://jsonplaceholder.typicode.com/todos';
const API_URL_USERS = 'https://jsonplaceholder.typicode.com/users';

export const getData = async (url: string) => {
  const response = await fetch(url);
  const json = await response.json();

  return json;
};

export const getTodos = async () => {
  const todos: Todo[] = await getData(API_URL_TODOS);
  const users: User[] = await getData(API_URL_USERS);

  const preparedTodos = todos.map((todo) => {
    return {
      ...todo,
      user: users.find((user) => user.id === todo.userId),
    };
  });

  return preparedTodos;
};
