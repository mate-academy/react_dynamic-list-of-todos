import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getVisibleTodos(todos: Todo[], status: Status, query: string) {
  return todos.filter(todo => {
    const matchesStatus =
      status === Status.All ||
      (status === Status.Active && !todo.completed) ||
      (status === Status.Completed && todo.completed);

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    return matchesStatus && matchesQuery;
  });
}
