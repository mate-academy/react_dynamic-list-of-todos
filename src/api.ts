import { Todo } from './types/Todo';
import { User } from './types/User';

export const wait = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export async function getTodos(): Promise<Todo[]> {
  await wait(1000);
  const response = await fetch(
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json'
  );

  if (!response.ok) {
    throw new Error('Failed to load todos');
  }

  return response.json();
}

export async function getUser(userId: number): Promise<User> {
  await wait(1000);
  const response = await fetch(
    `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`
  );

  if (!response.ok) {
    throw new Error(`Failed to load user ${userId}`);
  }

  return response.json();
}
