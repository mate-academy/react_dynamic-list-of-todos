import { API_URL } from './constants';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

const getUsers = async () => {
  return getData<Users>(`${API_URL}/users`);
};

const getTodos = async () => {
  return getData<Todos>(`${API_URL}/todos`);
};

export const getPreparedTodos = async (): Promise<PreparedTodos> => {
  const todos: Todos = await getTodos();
  const users: Users = await getUsers();

  const preparedTodos = todos.map((todo) => ({
    ...todo,
    user: users.find(user => todo.userId === user.id) as User,
  }));

  return preparedTodos;
};
