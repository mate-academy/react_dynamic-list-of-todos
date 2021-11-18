import { Todo, User } from '../types/type';

// eslint-disable-next-line
const API_TODOS_URL = `https://mate.academy/students-api/todos`;
// eslint-disable-next-line
const API_USERS_URL = `https://mate.academy/students-api/users`;

export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(API_TODOS_URL);

    if (response.ok) {
      return await response.json();
    }

    throw new Error('ERROR Todos');
  } catch (error) {
    throw new Error(`There is a problem: ${error}`);
  }
}

export async function getUser(id: number): Promise<User> {
  try {
    const response = await fetch(`${API_USERS_URL}/${id}`);

    if (response.ok) {
      return await response.json();
    }

    throw new Error('ERROR Users');
  } catch (error) {
    throw new Error(`There is a problem: ${error}`);
  }
}
