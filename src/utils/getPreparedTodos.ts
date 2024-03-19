import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todoList: Todo[],
  select: Status,
  query: string,
) => {
  const visibleTodos = [...todoList];

  return visibleTodos
    .filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .filter(({ completed }) => {
      switch (select) {
        case Status.Active:
          return !completed;

        case Status.Completed:
          return completed;

        default:
          return visibleTodos;
      }
    });
};
