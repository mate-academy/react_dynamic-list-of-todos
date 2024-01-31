import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  query: string,
  status: Status,
) {
  return todos
    .filter(todo => {
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
    })
    .filter(({ completed }) => {
      switch (status) {
        case Status.Active:
          return !completed;
        case Status.Completed:
          return completed;
        default:
          return true;
      }
    });
}
