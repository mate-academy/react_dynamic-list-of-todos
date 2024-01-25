import { Todo } from '../types/Todo';
import { FilterParams } from '../types/filterParams';

export function getFilteredTodos(
  todos: Todo[],
  filterParams: FilterParams,
  title?: string,
) {
  let filteredTodos = [...todos];

  if (filterParams !== FilterParams.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (filterParams) {
        case FilterParams.Active:
          return !todo.completed;

        case FilterParams.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }

  if (title) {
    filteredTodos = filteredTodos.filter(
      todo => todo.title.toLowerCase().includes(title),
    );
  }

  return filteredTodos;
}
