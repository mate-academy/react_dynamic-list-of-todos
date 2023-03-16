import { TodoStatus } from '../enums/TodoStatus';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  status: TodoStatus,
  query: string,
) => {
  window.console.log('called');

  if (status !== TodoStatus.All || query) {
    const normalizedQuery = query
      .toLowerCase()
      .split(' ')
      .filter(Boolean)
      .join(' ');

    return todos.filter(({ title, completed }) => {
      const isQueryInTitle = title
        .toLowerCase()
        .includes(normalizedQuery);

      let isCorrectStatus = true;

      switch (status) {
        case TodoStatus.Active:
          isCorrectStatus = completed === false;
          break;

        case TodoStatus.Completed:
          isCorrectStatus = completed === true;
          break;

        default:
          isCorrectStatus = true;
          break;
      }

      return isQueryInTitle && isCorrectStatus;
    });
  }

  return todos;
};
