import { SortField } from '../types/SortField';
import { Todo } from '../types/Todo';

interface Filters {
  sortField: SortField;
  query: string;
}

export function getFilteredTodos(
  todos: Todo[],
  { sortField, query }: Filters,
): Todo[] {
  let copy = [...todos];
  const normQuery = query.trim().toLowerCase();

  if (query) {
    copy = copy.filter(todo => {
      const normTodo = todo.title.trim().toLowerCase();

      return normTodo.includes(normQuery);
    });
  }

  if (sortField) {
    switch (sortField) {
      case SortField.active:
        copy = copy.filter(todo => !todo.completed);
        break;
      case SortField.completed:
        copy = copy.filter(todo => todo.completed);
        break;
      default:
        break;
    }
  }

  return copy;
}
