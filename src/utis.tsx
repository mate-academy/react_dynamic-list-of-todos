import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export function getDisplayedTodos(
  todos: Todo[],
  filter: Filter,
  query: string,
) {
  let displayedTodos = [...todos];

  if (filter) {
    displayedTodos = displayedTodos.filter(todo => {
      switch (filter) {
        case Filter.active:
          return todo.completed === false;
        case Filter.completed:
          return todo.completed === true;
        default:
          return todo;
      }
    });
  }

  if (query) {
    displayedTodos = displayedTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase();
      const normalizedQuery = query.toLowerCase();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  return displayedTodos;
}
