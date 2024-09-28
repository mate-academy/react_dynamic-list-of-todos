import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filteredTodos = (
  todos: Todo[],
  newStatus: string,
  query: string,
): Todo[] => {
  return todos
    .filter(todo => {
      switch (newStatus) {
        case Status.all:
          return true;

        case Status.active:
          return !todo.completed;

        case Status.completed:
          return todo.completed;

        default:
          return false;
      }
    })
    .filter(todo =>
      todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    );
};
