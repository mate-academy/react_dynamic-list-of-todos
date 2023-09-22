import { useMemo } from 'react';
import { StatusFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';

export function useFilteredTodos(
  todos: Todo[],
  titleFilter: string,
  statusFilter: StatusFilter,
) {
  const filteredTodos = useMemo(() => {
    const filtered = todos.filter((todo) => {
      const isTitle = todo.title.toLowerCase().includes(
        titleFilter.toLowerCase().trim(),
      );

      if (!isTitle) {
        return false;
      }

      if (statusFilter === 'active' && todo.completed) {
        return false;
      }

      if (statusFilter === 'completed' && !todo.completed) {
        return false;
      }

      return true;
    });

    return filtered;
  }, [titleFilter, statusFilter, todos]);

  return filteredTodos;
}
