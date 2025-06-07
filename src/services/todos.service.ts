import { Todo } from '../types/Todo';

export function getTaskList(): Promise<Todo[]> {
  return fetch('/api/todos.json').then(response => {
    if (!response.ok) {
      throw new Error();
    }

    return response.json();
  });
}
