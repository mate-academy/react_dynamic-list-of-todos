import { Status } from '../enums/Status';
import { Todo } from '../types/Todo';

interface Options {
  [key: string]: string;
}

export const prepareTodos = (todos: Todo[], options: Options): Todo[] => {
  const { query, filterStatus } = options;
  let todosCopy = [...todos];

  if (query) {
    todosCopy = todosCopy.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (filterStatus) {
    todosCopy = todosCopy.filter(todo => {
      switch (filterStatus) {
        case Status.Active: {
          return !todo.completed;
        }

        case Status.Completed: {
          return todo.completed;
        }

        default:
          return true;
      }
    });
  }

  return todosCopy;
};
