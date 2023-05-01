import { Todo } from '../types/Todo';
import { FilteringOptions } from '../types/FilteringOptions';

export const getTodosFilteredByStatus = (
  todos: Todo[],
  filteringOption: FilteringOptions,
) => {
  return todos.filter(({ completed }) => {
    switch (filteringOption) {
      case FilteringOptions.Active:
        return !completed;

      case FilteringOptions.Completed:
        return completed;

      default:
        break;
    }

    return true;
  });
};

export const getTodosIncludeSearchQuery = (
  todos: Todo[],
  searchQuery: string,
) => {
  if (!searchQuery.trim().length) {
    return todos;
  }

  return todos.filter(({ title }) => {
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });
};
