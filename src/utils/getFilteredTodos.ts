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
  // const copyTodos = [...todos];

  if (query) {
    return todos.filter(todo => {
      todo.title.trim().toLowerCase().includes(query.trim().toLowerCase());
    });
  }

  if (sortField) {
    switch (sortField) {
      case SortField.active:
        return todos.filter(todo => !todo.completed);
      case SortField.completed:
        return todos.filter(todo => todo.completed);
      default:
        break;
    }
  }

  return todos;
}
