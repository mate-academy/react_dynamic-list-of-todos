import { Todo } from './types/Todo';

export const getFilteredTodos = (
  tasks: Todo[] | null,
  mode: string,
  search: string,
) => {
  return tasks
    ?.filter(todo =>
      todo.title.toLowerCase().includes(search.trim().toLowerCase()),
    )
    .filter(({ completed }) => {
      switch (mode) {
        case 'active':
          return !completed;
        case 'completed':
          return completed;
        case 'all':
        default:
          return tasks;
      }
    });
};
