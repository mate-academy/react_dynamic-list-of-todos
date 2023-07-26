import { Todo } from '../types/Todo';
import { SortKeys } from '../enum';

export function getPreperedTodos(
  todos: Todo[],
  filter: string,
  select: SortKeys,
) {
  let preperedTodos = [...todos];

  if (filter) {
    preperedTodos = preperedTodos.filter((todo) => {
      const title = todo.title.toLowerCase();
      const filterQuery = filter.trim().toLowerCase();

      return title.includes(filterQuery);
    });
  }

  if (select) {
    switch (select) {
      case SortKeys.All:
        return preperedTodos;
      case SortKeys.Active:
        return preperedTodos.filter(todo => todo.completed === false);
      case SortKeys.Completed:
        return preperedTodos.filter(todo => todo.completed === true);
      default:
        return preperedTodos;
    }
  }

  return preperedTodos;
}
