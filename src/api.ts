import { API_TODOS, API_USERS } from './constants';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

const getUsers = async () => {
  return getData<Users>(API_USERS);
};

const getTodos = async () => {
  return getData<Todos>(API_TODOS);
};

export const getPreparedTodos = async (): Promise<PreparedTodos[]> => {
  const todos: Todos = await getTodos();
  const users: Users = await getUsers();

  const preparedTodos = todos.map((todo) => ({
    ...todo,
    user: users.find(user => todo.userId === user.id) as User,
  }));

  return preparedTodos;
};
