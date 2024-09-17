import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getPreparedTodos = (
  query: string,
  filter: Status,
  todos: Todo[],
) => {
  const visibleTodos = [...todos];

  return visibleTodos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      switch (filter) {
        case Status.All:
          return true;

        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return visibleTodos;
      }
    });
};
