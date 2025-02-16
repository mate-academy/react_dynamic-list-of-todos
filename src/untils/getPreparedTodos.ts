import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todoList: Todo[],
  selected: Status,
  query: string,
) => {
  const visible = [...todoList];

  return visible
    .filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .filter(({ completed }) => {
      switch (selected) {
        case Status.Active:
          return !completed;
        case Status.Completed:
          return completed;
        default:
          return visible;
      }
    });
};
