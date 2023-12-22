import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  query: string,
  status: Status,
): Todo[] => {
  return todos.filter(todo => {
    const titleMatch = todo.title.toLowerCase().includes(query.toLowerCase());

    switch (status) {
      case Status.All:
        return titleMatch;
      case Status.Active:
        return titleMatch && !todo.completed;
      case Status.Completed:
        return titleMatch && todo.completed;
      default:
        return titleMatch;
    }
  });
};
