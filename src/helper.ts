import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export function getVisibleTodos(
  todos: Todo[],
  filterType: FilterType,
  query: string,
): Todo[] {
  return todos.filter(todo => {
    const lowerQuery = query.toLowerCase();
    const lowerTitle = todo.title.toLowerCase();

    switch (filterType) {
      case FilterType.ACTIVE:
        return query
          ? lowerTitle.includes(lowerQuery) && !todo.completed
          : !todo.completed;

      case FilterType.COMPLETED:
        return query
          ? lowerTitle.includes(lowerQuery) && todo.completed
          : todo.completed;

      default:
        return query
          ? lowerTitle.includes(lowerQuery)
          : todo;
    }
  });
}
