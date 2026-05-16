import { FilterOption } from '../types/FilterOption';
import { Todo } from '../types/Todo';

interface FilterParams {
  query: string;
  statusFilter: FilterOption;
}

export const filterTodo = (
  todos: Todo[],
  { query, statusFilter }: FilterParams,
) => {
  const normalizedQuery = query.trim().toLowerCase();

  return todos.filter(todo => {
    const matchesStatus =
      statusFilter === FilterOption.ALL ||
      (statusFilter === FilterOption.ACTIVE && !todo.completed) ||
      (statusFilter === FilterOption.COMPLETED && todo.completed);

    const matchesQuery =
      !normalizedQuery || todo.title.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
};
