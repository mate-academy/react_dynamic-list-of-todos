import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

interface FilterParams {
  status: Status;
  query: string;
}

export function getFilteredTodos(
  todos: Todo[],
  { status, query }: FilterParams,
): Todo[] {
  const normalizedQuery = query.trim().toLowerCase();

  return todos.filter(todo => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
}
