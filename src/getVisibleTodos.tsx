import { Todo } from './types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  status: string,
) => {
  if (status !== 'full' || query) {
    const normalizedQuery = query
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .join(' ');

    return todos.filter(todo => {
      const isIncludeQuery = todo.title.toLowerCase().includes(normalizedQuery);
      let isStatusMatch;

      switch (status) {
        case 'active':
          isStatusMatch = !todo.completed;
          break;

        case 'completed':
          isStatusMatch = todo.completed;
          break;

        default:
          isStatusMatch = true;
          break;
      }

      return isIncludeQuery && isStatusMatch;
    });
  }

  return todos;
};
