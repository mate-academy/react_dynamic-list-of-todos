import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function data(
  todos: Todo[],
  filterValues: Status,
  query: string,
): Todo[] {
  const queryNormalize = query.toLowerCase();

  const preparedTodos = [...todos].filter(todo => (
    todo.title.toLowerCase().includes(queryNormalize)
  ));

  return preparedTodos.filter((todo: Todo) => {
    switch (filterValues) {
      case Status.active:
        return !todo.completed;

      case Status.completed:
        return todo.completed;

      default:
        return todo;
    }
  });
}
