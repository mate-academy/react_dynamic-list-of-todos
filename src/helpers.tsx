import { Filters } from './types/Filters';
import { Todo } from './types/Todo';

export const filterTodos = (
  todos: Todo[],
  filter: string,
  query: string,
) => {
  const optimizedQuery = query.toLowerCase().trim();

  return todos.filter(todo => {
    switch (filter) {
      case Filters.All:
        return todo;
      case Filters.Completed:
        return todo.completed;
      case Filters.Active:
        return !todo.completed;
      default:
        return todo;
    }
  })
    .filter(todo => (
      todo.title.toLowerCase().includes(optimizedQuery)
    ));
};
