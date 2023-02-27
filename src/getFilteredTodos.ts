import { Todo } from './types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  selectedFilter: string,
  searchQuery: string,
) => {
  if (selectedFilter !== 'all' || searchQuery) {
    const preparedSearchQuery = searchQuery.toLowerCase();

    return todos.filter(todo => {
      const isSearchQueryMatch = todo.title.toLowerCase()
        .includes(preparedSearchQuery);
      let isFilterMatch;

      switch (selectedFilter) {
        case 'active':
          isFilterMatch = todo.completed === false;
          break;

        case 'completed':
          isFilterMatch = todo.completed === true;
          break;

        default:
          isFilterMatch = true;
          break;
      }

      return isFilterMatch && isSearchQueryMatch;
    });
  }

  return todos;
};
