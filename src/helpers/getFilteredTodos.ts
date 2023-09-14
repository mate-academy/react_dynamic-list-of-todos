import { Todo } from '../types/Todo';
import { FilterType, FilterOptions } from '../types/FilterType';

export const getFilteredTodos = (todos: Todo[], filter: FilterType) => {
  const { filterByTitle, filterByStatus } = filter;
  let filteredTodos: Todo[] = [...todos];

  if (filterByTitle) {
    filteredTodos = filteredTodos.filter(({ title }) => (
      title
        .toLowerCase()
        .includes(filterByTitle.toLowerCase())
    ));
  }

  switch (filterByStatus) {
    case FilterOptions.All:
      return filteredTodos;

    case FilterOptions.Active:
      return filteredTodos.filter(({ completed }) => !completed);

    case FilterOptions.Completed:
      return filteredTodos.filter(({ completed }) => completed);

    default:
      return filteredTodos;
  }
};
