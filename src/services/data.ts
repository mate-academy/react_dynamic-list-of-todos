import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function data(
  todos: Todo[],
  filterValues: Status,
  query: string,
): Todo[] {
  let preparedTodos = [...todos];

  preparedTodos = preparedTodos.filter((todo: Todo) => {
    switch (filterValues) {
      case Status.active:
        return !todo.completed;

      case Status.completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  if (query) {
    const queryNormalize = query.toLowerCase();

    preparedTodos = preparedTodos
      .filter(todo => (
        todo.title.toLowerCase().includes(queryNormalize)
      ));
  }

  return preparedTodos;
}
