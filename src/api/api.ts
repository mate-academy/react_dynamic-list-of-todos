import { Todo, User, PreparedTodo } from '../types';

const API_URL_TODOS = 'https://mate.academy/students-api/todos';
const API_URL_USERS = 'https://mate.academy/students-api/users';

export const loadTodos = (): Promise<Todo[]> => {
  return fetch(API_URL_TODOS)
    .then(response => response.json())
    .then(({ data }): Todo[] => data);
};

export const loadUsers = (): Promise<User[]> => {
  return fetch(API_URL_USERS)
    .then(response => response.json())
    .then(({ data }): User[] => data);
};

export const getPrepearedTodos = async (): Promise<PreparedTodo[]> => {
  const todos = await loadTodos();
  const users = await loadUsers();

  return (todos.map((todo: Todo) => ({
    ...todo,
    user: users.find((user: User) => user.id === todo.userId),
  })));
};
