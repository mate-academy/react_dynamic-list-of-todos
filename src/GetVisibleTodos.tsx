import { Todo } from './types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  status: string,
) => {
  if (status !== 'all' || query) {
    return todos.filter(todo => {
      const isIncluded = todo.title.toLowerCase().includes(query);
      let isCompleted;

      switch (status) {
        case 'active':
          isCompleted = todo.completed === false;
          break;

        case 'completed':
          isCompleted = todo.completed === true;
          break;

        default:
          isCompleted = true;
          break;
      }

      return isIncluded && isCompleted;
    });
  }

  return todos;
};
