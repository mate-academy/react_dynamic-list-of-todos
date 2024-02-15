import { FilterParams } from '../types/FilterParams';
import { FilterType } from '../types/Filter';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  { query, status }: FilterParams,
) => {
  return todos
    .filter(todo => {
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
    })
    .filter(({ completed }) => {
      switch (status) {
        case FilterType.ACTIVE:
          return !completed;
        case FilterType.COMPLETED:
          return completed;
        default:
          return true;
      }
    });
};
