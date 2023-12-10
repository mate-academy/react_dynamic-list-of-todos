import { Todo } from './types/Todo';

export const filterTodos = (
  todos: Todo[],
  statusFilter: string,
  titleFilter: string,
) => {
  return todos
    .filter(todo => {
      switch (statusFilter) {
        case 'all':
          return true;

        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase()
      .includes(titleFilter.toLowerCase()));
};
