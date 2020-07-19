import { User, Todo, PreparedTodos } from './interfaces';

export const URL_USERS = 'https://mate.academy/students-api/users';
export const URL_TODOS = 'https://mate.academy/students-api/todos';

const fetchedURL = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url);
  const result = await response.json();

  return result.data;
};

export const getTodos = async (): Promise<PreparedTodos[]> => {
  const users = await fetchedURL<User>(URL_USERS);
  const todos = await fetchedURL<Todo>(URL_TODOS);

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) as User,
  }));
};
