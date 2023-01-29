import { Todo } from './types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filter: string,
  searchQuery: string,
) => {
  return todos.filter(todo => {
    const isQueryInclude = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());

    let isFilter = true;

    switch (filter) {
      case 'active':
        isFilter = !todo.completed;
        break;

      case 'completed':
        isFilter = todo.completed;
        break;

      default:
        isFilter = true;
        break;
    }

    return isQueryInclude && isFilter;
  });
};
