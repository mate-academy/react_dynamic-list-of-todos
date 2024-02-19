import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function filter(todos: Todo[], query: string, status: Status): Todo[] {
  return todos.filter(todo => {
    const isIncludes = todo.title.toLowerCase().includes(query.toLowerCase());

    if (!isIncludes) {
      return false;
    }

    switch (status) {
      case Status.COMPLETED:
        return todo.completed;

      case Status.ACTIVE:
        return !todo.completed;
      default:
        return true;
    }
  });
}
