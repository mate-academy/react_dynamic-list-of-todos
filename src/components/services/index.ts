import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export function filterData(todos: Todo[], query: string, status: Status) {
  const preparedTodos = [...todos];

  preparedTodos.filter((todo) => {
    switch (status) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  if (query) {
    const preparedQuery = query.toLowerCase().trim();

    preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(preparedQuery));
  }

  return preparedTodos;
}
