import { Todo } from './types/Todo';
import { User } from './types/User';

const BASE_URL =
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

function wait(delay: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => resolve(), delay);

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

async function get<T>(url: string, signal?: AbortSignal): Promise<T> {
  await wait(300, signal);

  const res = await fetch(`${BASE_URL}${url}.json`, { signal });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export const getTodos = (signal?: AbortSignal) => get<Todo[]>('/todos', signal);

export const getUser = (userId: number, signal?: AbortSignal) =>
  get<User>(`/users/${userId}`, signal);
