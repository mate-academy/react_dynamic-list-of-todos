import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const TodosFilter = (todos: Todo[], status: Status) => {
  return todos.filter(todo => {
    switch (status) {
      case Status.ALL:
        return true;

      case Status.ACTIVE:
        return !todo.completed;

      case Status.COMPLETED:
        return todo.completed;

      default:
        throw new Error('Unexpected status');
    }
  });
};
