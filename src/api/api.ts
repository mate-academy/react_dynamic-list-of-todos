import { Todo } from '../types/Todo';
import { User } from '../types/User';

// helper to simulate network delay
export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export async function getTodos(): Promise<Todo[]> {
  const res = await fetch(
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json',
  );

  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }

  const data = await res.json();

  await wait(500); // artificial wait for loader

  return data;
}

export async function getUser(userId: number): Promise<User> {
  const res = await fetch(
    `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`,
  );

  if (!res.ok) {
    throw new Error('Failed to fetch user');
  }

  const data = await res.json();

  await wait(500); // artificial wait for loader

  return data;
}
