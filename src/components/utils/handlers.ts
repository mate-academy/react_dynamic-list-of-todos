import { FilterByStatus } from '../../types/FilterByStatus';
import { Todo } from '../../types/Todo';

export const filterTodos = (
  todos: Todo[],
  filterByStatus: FilterByStatus,
  filterByQuery: string,
): Todo[] => {
  return todos.filter(todo => {
    let isFilterByStatus = true;
    const normalizedTodoTitle = todo.title.toLowerCase();
    const normalizedQuery = filterByQuery.toLowerCase();

    switch (filterByStatus) {
      case FilterByStatus.ACTIVE:
        isFilterByStatus = !todo.completed;
        break;

      case FilterByStatus.COMPLETED:
        isFilterByStatus = todo.completed;
        break;

      default:
        break;
    }

    return isFilterByStatus && normalizedTodoTitle.includes(normalizedQuery);
  });
};
