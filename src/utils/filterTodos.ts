import { FilterOptions } from '../types/FilterOptions';
import { FilterStatus } from '../types/FilterStatus';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], { query, status }: FilterOptions) {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredByTitleTodos = query
    ? todos.filter(({ title }) => title.toLowerCase().includes(normalizedQuery))
    : [...todos];

  switch (status) {
    case FilterStatus.Active:
      return filteredByTitleTodos.filter(({ completed }) => !completed);
    case FilterStatus.Completed:
      return filteredByTitleTodos.filter(({ completed }) => completed);
    default:
      return filteredByTitleTodos;
  }
}
