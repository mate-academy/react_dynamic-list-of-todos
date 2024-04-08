import { FieldFilter } from '../types/FieldFilter';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  filteredBy: FieldFilter,
): Todo[] => {
  let preparedTodos = [...todos];

  if (query) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  switch (filteredBy) {
    case FieldFilter.Active:
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
      break;
    case FieldFilter.Completed:
      preparedTodos = preparedTodos.filter(todo => todo.completed);
      break;
    default:
      return preparedTodos;
  }

  return preparedTodos;
};
