import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function filteredTodos(
  todos: Todo[],
  { query, status }: { query: string; status: string },
): Todo[] {
  let copyTodos = [...todos];

  if (query) {
    copyTodos = copyTodos.filter((todo) => todo.title.toLowerCase()
      .includes(query.toLowerCase()));
  }

  if (status) {
    copyTodos = copyTodos.filter((todo) => {
      switch (status) {
        case Status.ACTIVE:
          return !todo.completed;
        case Status.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  return copyTodos;
}
