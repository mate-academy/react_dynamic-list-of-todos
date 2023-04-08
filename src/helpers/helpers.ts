import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

export const prepareTodos = (
  todos: Todo[],
  status: string,
  query: string,
): Todo[] => {
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
      break;
  }

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    visibleTodos = visibleTodos
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }

  return visibleTodos;
};
