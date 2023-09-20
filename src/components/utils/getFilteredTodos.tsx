import { TodoStatus } from '../../types/TodoStatus';
import { Todo } from '../../types/Todo';

export function getFilteredTodos(
  visibleTodos: Todo[],
  filterField : string,
  selectFilter: TodoStatus | null,
) {
  let filteredTodos = [...visibleTodos];

  if (filterField) {
    filteredTodos = filteredTodos
      .filter(todo => todo.title
        .toLowerCase()
        .includes(filterField.toLowerCase().trim()));
  }

  switch (selectFilter) {
    case TodoStatus.Active:
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;

    case TodoStatus.Completed:
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;

    default:
      return filteredTodos;
  }

  return filteredTodos;
}
