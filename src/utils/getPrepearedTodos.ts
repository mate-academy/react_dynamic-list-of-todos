import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  todoList: Todo[],
  filterBy: string,
  query: string,
) => {
  const visibleTodos = [...todoList];

  return visibleTodos
    .filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    )
    .filter(({ completed }) => {
      switch (filterBy) {
        case FilterType.Active:
          return !completed;

        case FilterType.Completed:
          return completed;

        default:
          return visibleTodos;
      }
    });
};
