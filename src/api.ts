import { Todo, User } from './types';

const URL_USERS = 'https://mate.academy/students-api/users';
const URL_TODOS = 'https://mate.academy/students-api/todos';

export async function loadUsers(): Promise<User[]> {
  try {
    const response = await fetch(URL_USERS);
    const data = await response.json();

    if (response.ok) {
      return data.data;
    }

    throw new Error(`${response.statusText}`);
  } catch (error) {
    throw new Error(`${error.message} Users, try again`);
  }
}

export async function loadTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(URL_TODOS);
    const data = await response.json();

    if (response.ok) {
      return data.data;
    }

    throw new Error(`${response.statusText}`);
  } catch (error) {
    throw new Error(`${error.message} Todos, try again`);
  }
}
