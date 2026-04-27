//.. getTodos.ts
import type { Todo } from '../types/Todo';
import { wait } from './wait';

export function getTodos(): Promise<Todo[]> {
  const TODOS_LIST =
    'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json';

  return wait()
    .then(() => fetch(TODOS_LIST))
    .then(response => {
      if (!response.ok) {
        throw new Error('Opps !!!');
      }

      return response.json();
    });
}
