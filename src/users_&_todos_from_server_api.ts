import { User,Users, Todo, Todos, PreparedTodos } from './types';

const API_URL = 'https://jsonplaceholder.typicode.com/';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
}

export const getTodos = () => {
  return getData<Todo[]>(`${API_URL}todos`);
};

export const getUsers = () => {
  return getData<User[]>(`${API_URL}users`);
};

export const getPreparedTodos = async (): Promise<PreparedTodos> => {
  const todos: Todos = await getTodos();
  const users: Users = await getUsers();
  const preparedTodos: PreparedTodos = todos.map(todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId),
  }));
  return preparedTodos;
};
