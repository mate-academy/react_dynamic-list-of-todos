import { Filters } from './types/Filters';
import { Todo } from './types/Todo';

export const filterTodos = (
  todosArray: Todo[],
  searchQuery: string,
  currentStatus: string,
) => {
  return todosArray.filter(todo => {
    const isMatchingQuery = todo.title
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    const isMatchingStatus = (() => {
      switch (currentStatus) {
        case Filters.Completed:
          return todo.completed;
        case Filters.Active:
          return !todo.completed;
        case Filters.All:
        default:
          return true;
      }
    })();

    return isMatchingQuery && isMatchingStatus;
  });
};
