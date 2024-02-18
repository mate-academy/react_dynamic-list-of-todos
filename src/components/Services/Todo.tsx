import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filter: Filter,
  query: string,
) => {
  return todos
    .filter(todo => {
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
    })
    .filter(({ completed }) => {
      switch (filter) {
        case Filter.Active:
          return !completed;
        case Filter.Completed:
          return completed;
        default:
          return true;
      }
    });
};
