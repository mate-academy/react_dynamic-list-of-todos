import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export const filterTodos = (
  todos: Todo[],
  filtredByReady: Filter,
  query: string,
) => {
  let filteredTodos = todos.filter(todo => {
    switch (filtredByReady) {
      case Filter.Active:
        return todo.completed === false;
      case Filter.Completed:
        return todo.completed === true;
      case Filter.All:
      default:
        return true;
    }
  });

  if (query) {
    const normalizedQuery = query.toLowerCase();

    filteredTodos = filteredTodos
      .filter(todo => todo.title.toLowerCase().includes(normalizedQuery));
  }

  return filteredTodos;
};
