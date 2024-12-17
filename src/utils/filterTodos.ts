import { Todo } from '../types/Todo';
import { FilterByState } from '../types/FilterByState';

export function filterTodos(
  todos: Todo[],
  filterBy: FilterByState,
  query: string,
): Todo[] {
  return todos
    .filter(todo => {
      if (filterBy === FilterByState.ACTIVE) {
        return !todo.completed;
      }

      if (filterBy === FilterByState.COMPLETED) {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => {
      const formatQuery = query.toLowerCase().trim();

      return todo.title.toLowerCase().includes(formatQuery);
    });
}
