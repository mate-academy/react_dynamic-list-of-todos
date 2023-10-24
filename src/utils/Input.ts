import { Todo } from '../types/Todo';

export function search(inputQuery: string, visibleTodos: Todo[]) {
  if (inputQuery === '') {
    return visibleTodos;
  }

  return visibleTodos.filter(todo => todo.title.toLowerCase()
    .includes(inputQuery.toLowerCase().trim()));
}
