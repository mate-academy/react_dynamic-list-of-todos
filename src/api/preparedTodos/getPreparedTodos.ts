import { TODOS_URL, USERS_URL } from '../../constants/constants';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

const getTodos = async () => {
  return getData<Todo[]>(TODOS_URL);
};

const getUsers = async () => {
  return getData<User[]>(USERS_URL);
};

export const getPreparedTodos = async (): Promise<PreparedTodo[]> => {
  const todos = await getTodos();
  const users = await getUsers();

  const preparedTodos: PreparedTodo[] = todos.map(todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId),
  }));

  return preparedTodos;
};
