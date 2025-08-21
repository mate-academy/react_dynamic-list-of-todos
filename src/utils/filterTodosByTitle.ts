import { Todo } from '../types/Todo';

export function filterTodosByTitle(arr: Todo[], query: string) {
  return arr.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );
}
