import { Status } from '../servises/filter-types';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  titles: string,
  filter: Status,
) {
  const visibleTodos = [...todos];

  return visibleTodos
    .filter(todo =>
      todo.title.toLowerCase().includes(titles.trim().toLowerCase()),
    )
    .filter(todo => {
      switch (filter) {
        case Status.Active:
          return !todo.completed;
        case Status.Completed:
          return todo.completed;
        default:
          return visibleTodos;
      }
    });
}
