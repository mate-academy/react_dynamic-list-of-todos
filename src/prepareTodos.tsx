import { Todo } from './types/Todo';
import { Select } from './types/Select';

export function prepareTodos(listOfTodos: Todo[],
  filterField: string,
  debouncedQuery: string) {
  let preparedTodos = [...listOfTodos];

  preparedTodos = preparedTodos.filter(todo => {
    switch (filterField) {
      case Select.Active:
        return !todo.completed;

      case Select.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  if (debouncedQuery) {
    const queryNormalize = debouncedQuery.toLowerCase();

    preparedTodos = preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(queryNormalize));
  }

  return preparedTodos;
}
