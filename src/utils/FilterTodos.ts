import { SortField } from '../types/SortField';
import { Todo } from '../types/Todo';

type Filters = {
  sortField: SortField;
  query: string;
};

export function getFilteredTodos(
  todos: Todo[],
  { sortField, query }: Filters,
): Todo[] {
  let todosCopy = [...todos];

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    todosCopy = todosCopy.filter(todo => {
      const normalizedTitle = todo.title.trim().toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  if (sortField) {
    switch (sortField) {
      case SortField.ACTIVE:
        return (todosCopy = todosCopy.filter(todo => todo.completed === false));
      case SortField.COMPLETED:
        return (todosCopy = todosCopy.filter(todo => todo.completed === true));
      default:
        break;
    }
  }

  return todosCopy;
}
