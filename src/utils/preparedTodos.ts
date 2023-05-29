import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

export function preparedTodos(
  todos: Todo[],
  status: string,
  query: string,
): Todo[] {
  let visibleTodos = [...todos];

  switch (status) {
    case TodoStatus.ACTIVE:
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;
    case TodoStatus.COMPLETED:
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;
    case TodoStatus.ALL:
    default:
      visibleTodos = [...todos];
      break;
  }

  if (query) {
    const normalizedQuery = query
      .split(' ')
      .map(word => word.trim().toLowerCase())
      .join(' ');

    visibleTodos = visibleTodos
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }

  return visibleTodos;
}
