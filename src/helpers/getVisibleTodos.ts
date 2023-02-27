import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  status: string,
) => {
  if (status !== 'all' || query) {
    const normalizedQuery = query
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .join(' ');

    return todos.filter(todo => {
      const isQueryInTodo = todo.title
        .toLowerCase()
        .includes(normalizedQuery);

      let isStatusMatch = true;

      switch (status) {
        case 'active':
          isStatusMatch = todo.completed === false;
          break;

        case 'completed':
          isStatusMatch = todo.completed === true;
          break;

        default:
          isStatusMatch = true;
          break;
      }

      return isQueryInTodo && isStatusMatch;
    });
  }

  return todos;
};
