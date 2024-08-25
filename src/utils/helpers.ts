import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export const filterTodos = (
  todos: Todo[],
  filter: Filter,
  query: string,
): Todo[] => {
  return todos
    .filter(todo => {
      switch (filter) {
        case Filter.Completed:
          return todo.completed;
        case Filter.Active:
          return !todo.completed;
        case Filter.All:
        default:
          return true;
      }
    })
    .filter(
      todo => !query || todo.title.toLowerCase().includes(query.toLowerCase()),
    );
};
