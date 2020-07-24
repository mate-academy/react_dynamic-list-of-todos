import { Todo, User } from './interfaces';

const TODOS_URL = 'https://mate.academy/students-api/todos';
const USERS_URL = 'https://mate.academy/students-api/users';

export const fetchTodos = async () => {
  const response = await fetch(TODOS_URL);

  return response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(USERS_URL);

  return response.json();
};

export const fetchData = async () => {
  const todos = await fetchTodos();
  const users = await fetchUsers();

  return todos.data.map((todo: Todo) => ({
    ...todo,
    user: users.data.find((user: User) => user.id === todo.userId),
  }));
};
