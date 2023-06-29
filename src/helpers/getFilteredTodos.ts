import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';
import { FilterOptions } from '../types/filterOptions';
import { getFilteredBy } from './getFilteredBy';
import { filterTodoByStatus, filterTodoByTitle } from './todoFilters';

export const getFilteredTodos = (todos: Todo[], options: FilterOptions) => {
  const { todoStatus, searchQuery } = options;
  const filters = [];

  if (searchQuery) {
    filters.push(filterTodoByTitle(searchQuery));
  }

  if (todoStatus !== TodoStatus.All) {
    filters.push(filterTodoByStatus(todoStatus));
  }

  if (!filters.length) {
    return todos;
  }

  return getFilteredBy(todos, ...filters);
};
