import { Todo } from '../types/Todo';

export const findVisibleTodos = (
  todos: Todo[],
  searchQuery: string,
  todoStatus: string,
) => {
  if (todoStatus !== 'all' || searchQuery) {
    const normalizedSearchQuery = searchQuery
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .join(' ');

    return todos.filter(todo => {
      const isQueryMatch
      = todo.title.toLowerCase().includes(normalizedSearchQuery);
      let isStatusMatch;

      switch (todoStatus) {
        case 'active':
          isStatusMatch = !todo.completed;
          break;

        case 'completed':
          isStatusMatch = todo.completed === true;
          break;

        default:
          isStatusMatch = true;
          break;
      }

      return isQueryMatch && isStatusMatch;
    });
  }

  return todos;
};
