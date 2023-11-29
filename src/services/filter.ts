import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export const filterByQuery = (todosToFilter: Todo[], query: string) => {
  return todosToFilter.filter(
    todo => todo.title.toLowerCase().includes(query.toLowerCase()),
  );
};

export const filterByOption = (todosToFilter: Todo[], option: Filter) => {
  switch (option) {
    case Filter.All:
    default:
      return todosToFilter;

    case Filter.Active:
      return todosToFilter.filter(todo => !todo.completed);

    case Filter.Completed:
      return todosToFilter.filter(todo => todo.completed);
  }
};
