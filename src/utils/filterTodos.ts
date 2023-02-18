import { SortBy } from '../types/SortBy';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  formatedQuery: string,
  sortBy: SortBy,
): Todo[] => {
  return todos.filter((todo) => {
    const titleIncludesQuery = todo.title.toLowerCase().includes(formatedQuery);

    switch (sortBy) {
      case SortBy.Active:
        return !todo.completed && titleIncludesQuery;

      case SortBy.Completed:
        return todo.completed && titleIncludesQuery;

      case SortBy.All:
      default:
        return titleIncludesQuery;
    }
  });
};
