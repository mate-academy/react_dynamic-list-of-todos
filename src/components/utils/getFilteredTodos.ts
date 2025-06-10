import { Todo } from '../../types/Todo';
import { StatusFilter } from '../TodoFilter';

interface Filters {
  query: string;
  status: StatusFilter;
}

export const getFilteredTodos = (todos: Todo[], filters: Filters) => {
  let filteredTodos = [...todos];

  const normalizedQuery = filters.query.trim().toLowerCase();

  if (normalizedQuery) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  if (filters.status !== 'all') {
    filteredTodos = filteredTodos.filter(todo => {
      if (filters.status === 'completed') {
        return todo.completed;
      }

      return !todo.completed;
    });
  }

  return filteredTodos;
};
