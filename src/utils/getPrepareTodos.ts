import { SortFields } from '../types/SortFields';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todoList: Todo[],
  select: SortFields,
  query: string,
) => {
  const visibleTodos = [...todoList];

  return visibleTodos
    .filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .filter(({ completed }) => {
      switch (select) {
        case SortFields.Active:
          return !completed;

        case SortFields.Completed:
          return completed;

        default:
          return visibleTodos;
      }
    });
};
