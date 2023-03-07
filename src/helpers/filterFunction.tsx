import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const getfilteredTodos = (todos: Todo[], filter: Filter) => (
  todos.filter(({ completed }) => {
    switch (filter) {
      case Filter.All:
        return true;

      case Filter.Active:
        return !completed;

      case Filter.Completed:
        return completed;

      default:
        return 0;
    }
  })
);
