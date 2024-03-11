import { Todo } from './types/Todo';
import { State } from './types/enumState';

export const getFilteredTodos = (
  tasks: Todo[],
  mode: State | string,
  search: string,
) => {
  return tasks
    .filter(todo =>
      todo.title.toLowerCase().includes(search.trim().toLowerCase()),
    )
    .filter(({ completed }) => {
      switch (mode) {
        case State.active:
          return !completed;
        case State.completed:
          return completed;
        case State.all:
        default:
          return tasks;
      }
    });
};
