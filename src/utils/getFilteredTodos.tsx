import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filter: Status,
  query: string,
) => {
  return todos
    .filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .filter(({ completed }) => {
      switch (filter) {
        case Status.active:
          return !completed;
        case Status.completed:
          return completed;
        default:
          return todos;
      }
    });
};
