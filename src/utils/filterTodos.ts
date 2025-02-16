import { FilterConfig } from '../types/FilterConfig';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], config: FilterConfig) {
  const { filterOption, query } = config;

  return todos.filter((value: Todo): boolean => {
    if (!value.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    switch (filterOption) {
      case 'active':
        return !value.completed;

      case 'completed':
        return value.completed;

      case 'all':
      default:
        return true;
    }
  });
}
