import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filterType: FilterType,
  query: string,
) => {
  return todos.filter(todo => {
    const lowecasedQuery = query.toLocaleLowerCase();
    const lowercasedTitle = todo.title.toLocaleLowerCase();
    const fitsQuery = lowercasedTitle.includes(lowecasedQuery);

    switch (filterType) {
      case FilterType.Active:
        return !todo.completed && fitsQuery;
      case FilterType.Completed:
        return todo.completed && fitsQuery;
      default:
        return fitsQuery;
    }
  });
};
