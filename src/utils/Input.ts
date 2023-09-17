import { Todo } from '../types/Todo';

export function search(input: string, visibleTodos: Todo[]) {
  if (input === '') {
    return visibleTodos;
  }

  return visibleTodos.filter(todo => todo.title.toLowerCase()
    .includes(input.toLowerCase().trim()));
}
