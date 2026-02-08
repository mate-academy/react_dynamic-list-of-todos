import { FilterState } from './components/TodoFilter';
import { Todo } from './types/Todo';

export function filterTodos(
  filterState: FilterState,
  searchQuery: string,
  todos: Todo[] = [],
): Todo[] {
  let resTodos = todos;

  if (filterState !== FilterState.All) {
    resTodos = resTodos.filter(
      todo =>
        (filterState === FilterState.Completed && todo.completed) ||
        (filterState === FilterState.Active && !todo.completed),
    );
  }

  if (searchQuery) {
    const normalizedQuery = searchQuery.toLowerCase();

    resTodos = resTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return resTodos;
}
