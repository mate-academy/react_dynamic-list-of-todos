import { Todo } from '../types/Todo';
import { FilterStatus } from '../types/FilterStatus';

export function filterTodos(
  todoItems: Todo[],
  filterStatus: FilterStatus,
  query: string,
): Todo[] {
  let filtered = todoItems.filter(todo => {
    switch (filterStatus) {
      case FilterStatus.ALL:
        return true;
      case FilterStatus.ACTIVE:
        return !todo.completed;
      case FilterStatus.COMPLETED:
        return todo.completed;
      default:
        return false;
    }
  });

  filtered = filtered.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  return filtered;
}
