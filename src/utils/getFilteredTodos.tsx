import { Status } from '../types/Status';
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

        case Status.All:
        default:
          return visibleTodos;
      }
    });
}
