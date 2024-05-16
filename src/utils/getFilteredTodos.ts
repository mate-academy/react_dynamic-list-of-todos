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
  const filteredTodosCopy = [...todos];
  const normQuery = query.trim().toLowerCase();

  if (query) {
    return filteredTodosCopy.filter(todo => {
      const normTodo = todo.title.trim().toLowerCase();

      normTodo.includes(normQuery);
    });
  }

  if (sortField) {
    switch (sortField) {
      case SortField.active:
        return filteredTodosCopy.filter(todo => !todo.completed);
      case SortField.completed:
        return filteredTodosCopy.filter(todo => todo.completed);
      default:
        break;
    }
  }

  return filteredTodosCopy;
}
