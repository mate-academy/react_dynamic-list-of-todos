import { StatusFilter } from '../modules/StatusFilter';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  filters: { query: string; status: StatusFilter },
) {
  let filteredTodos = [...todos];

  if (filters.status) {
    switch (filters.status) {
      case StatusFilter.ACTIVE:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case StatusFilter.COMPLETED:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }
  }

  const normalizedQuery = filters.query.trim().toLowerCase();

  if (normalizedQuery) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return filteredTodos;
}
