import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todoList: Todo[],
  select: Status,
  query: string,
) => {
  const trimQuery = query.trim().toLocaleLowerCase();
  const visibleTodos = todoList.filter(
    todo => !trimQuery || todo.title.toLocaleLowerCase().includes(trimQuery),
  );

  return visibleTodos.filter(({ completed }) => {
    switch (select) {
      case Status.Active:
        return !completed;

      case Status.Completed:
        return completed;

      default:
        return true;
    }
  });
};
