import { StatusFilter } from './components/TodoFilter';
import { Todo } from './types/Todo';

interface Filters {
  query: string;
  status: StatusFilter;
}

export const getFilteredTodos = (todos: Todo[], filters: Filters) => {
  let filteredTodos = [...todos];

  const normilizedQuery = filters.query.trim().toLowerCase();

  if (normilizedQuery) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normilizedQuery),
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
