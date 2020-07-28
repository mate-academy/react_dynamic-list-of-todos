import { User, Todo, PreparedTodos } from './interfaces';

const fetchedData = async <T>(nameData: string): Promise<T[]> => {
  const response = await fetch(`https://mate.academy/students-api/${nameData}`);
  const result = await response.json();

  return result.data;
};

export const getTodos = async (): Promise<PreparedTodos[]> => {
  const users = await fetchedData<User>('users');
  const todos = await fetchedData<Todo>('todos');

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) as User,
  }));
};
