import { Todo } from '../types/Todo';
import { StatusFilter } from '../types/todoFilter';

interface FiltersTodos {
  query: string;
  status: StatusFilter;
}

export function getFilterTodos(todos: Todo[], filters: FiltersTodos) {
  let filteredTodos = [...todos];
  const normalizeQuery = filters.query.trim().toLowerCase();

  if (normalizeQuery) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizeQuery),
    );
  }

  if (filters.status !== 'all') {
    filteredTodos = filteredTodos.filter(todo => {
      if (filters.status === 'completed') {
        return todo.completed;
      } else {
        return !todo.completed;
      }
    });
  }

  return filteredTodos;
}
