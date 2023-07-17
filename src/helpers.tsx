import { StatusFilter } from './types/StatusFilter';
import { Todo } from './types/Todo';

export const filterTodos = (
  todos: Todo[],
  filterType: string = StatusFilter.All,
  query: string,
) => {
  const preparedQuery = query.toLowerCase().trim();

  return todos.filter(todo => {
    const isTitleIncludesQuery = todo.title
      .toLowerCase()
      .includes(preparedQuery);

    switch (filterType) {
      case StatusFilter.All:
        return isTitleIncludesQuery;

      case StatusFilter.Completed:
        return isTitleIncludesQuery && todo.completed;

      case StatusFilter.Active:
        return isTitleIncludesQuery && !todo.completed;

      default:
        return todo;
    }
  });
};
