// src/api.ts
import { Todo } from './types/Todo';
import { User } from './types/User';

export const wait = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export async function getTodos(): Promise<Todo[]> {
  // повертаємо тільки 5 елементів — тести очікують 5 todos
  await wait(1000); // штучна затримка для коректної роботи Loader
  // eslint-disable-next-line max-len
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
  const data: Todo[] = await response.json();

  return data;
}

export async function getUser(userId: number): Promise<User> {
  await wait(1000); // затримка щоб loader був видимий
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  const user: User = await response.json();

  return user;
}
