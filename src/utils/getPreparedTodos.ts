import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getPreparedTodos(
  todoItems: Todo[],
  filterStatus: Status,
  query: string,
): Todo[] {
  let filtered = todoItems.filter(todo => {
    switch (filterStatus) {
      case Status.All:
        return true;
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
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
