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
  return [...todos]
    .filter(todo => {
      const normalizedQuery = query.trim().toLowerCase();
      const normalizedTitle = todo.title.trim().toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    })
    .filter(todo => {
      switch (sortField) {
        case SortField.ACTIVE:
          return !todo.completed;
        case SortField.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });
}
