import { Todo } from '../types/Todo';
import { FilteredOptions } from '../types/FilteredOption';

export function handleFilteredTodos(
  todos: Todo[],
  selectedOption: FilteredOptions,
  query: string,
) {
  return todos.filter(todo => {
    const matchesQuery =
      !query || todo.title.toLowerCase().includes(query.toLowerCase().trim());
    const isActive = !todo.completed;
    const isCompleted = todo.completed;

    switch (selectedOption) {
      case FilteredOptions.active:
        return matchesQuery && isActive;
      case FilteredOptions.completed:
        return matchesQuery && isCompleted;
      default:
        return matchesQuery;
    }
  });
}
