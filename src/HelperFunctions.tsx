import { FilterBySelect } from './types/FilterBySelect';
import { Todo } from './types/Todo';

export function filterTodos(todos: Todo[], filterBy: FilterBySelect): Todo[] {
  switch (filterBy) {
    case FilterBySelect.Active:
      return todos.filter(todo => !todo.completed);

    case FilterBySelect.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return [...todos];
  }
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
