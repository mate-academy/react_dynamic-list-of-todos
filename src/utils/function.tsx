import { SelectFilter } from '../types/SelectFilter';
import { Todo } from '../types/Todo';

export const filteredTodos = (
  todosToUse: Todo[], selectFilter: string, query: string,
) => {
  return todosToUse.filter((todo) => {
    const filteredByQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase());

    switch (selectFilter) {
      case SelectFilter.Active:
        return !todo.completed && filteredByQuery;

      case SelectFilter.Completed:
        return todo.completed && filteredByQuery;

      case SelectFilter.All:
      default:
        return filteredByQuery;
    }
  });
};
