import { Status } from './types/Status';
import { Todo } from './types/Todo';

export const filterTodos = (
  todos: Todo[],
  statusFilter: string,
  titleFilter: string,
) => {
  return todos
    .filter(todo => {
      switch (statusFilter) {
        case Status.All:
          return true;

        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return true;
      }
    })
    .filter(todo => todo.title.toLowerCase()
      .includes(titleFilter.toLowerCase()));
};
