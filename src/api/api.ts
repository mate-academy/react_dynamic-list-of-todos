import { Todo, User } from '../types/type';

// eslint-disable-next-line
const API_TODOS_URL = `https://mate.academy/students-api/todos`;
// eslint-disable-next-line
const API_USERS_URL = `https://mate.academy/students-api/users`;

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(API_TODOS_URL);

  if (response.ok) {
    const todos = await response.json();

    return todos;
  }

  throw new Error('Failed to load todos');
}

export async function getUser(id: number): Promise<User> {
  const response = await fetch(`${API_USERS_URL}/${id}`);

  if (response.ok) {
    const users = await response.json();

    return users;
  }

  throw new Error('Failed to load users');
}
