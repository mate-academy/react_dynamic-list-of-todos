import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  return todos.filter(todo => {
    const normalizedQuery = query.toLowerCase().trim();
    const normalizedTitle = todo.title.toLowerCase();

    const titleMatch = normalizedTitle.includes(normalizedQuery);

    const statusMatch = status === Status.All
      || (status === Status.Active && !todo.completed)
      || (status === Status.Completed && todo.completed);

    return titleMatch && statusMatch;
  });
};
