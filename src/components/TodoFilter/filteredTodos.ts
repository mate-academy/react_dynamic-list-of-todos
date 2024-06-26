import { Todo } from '../../types/Todo';
import { FilterTypes } from '../../types/filterTypes';

export const filterTodos = (
  searchQuery: string,
  currentFilter: FilterTypes,
  todos: Todo[],
) => {
  const filtered = todos.filter(todo => {
    const isValidQuery = searchQuery
      ? todo.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const isValidStatus =
      currentFilter !== FilterTypes.All
        ? currentFilter === FilterTypes.Active
          ? !todo.completed
          : todo.completed
        : true;

    return isValidQuery && isValidStatus;
  });

  return filtered;
};
