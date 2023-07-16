import { Filters } from './types/Filters';
import { Todo } from './types/Todo';

export const filterTodos = (
  todos: Todo[],
  filter: string,
  query: string,
) => {
  const optimizedQuery = query.toLowerCase().trim();

  return todos.filter(todo => {
    const isTitleIncludeQuery = todo.title
      .toLowerCase().includes(optimizedQuery);

    switch (filter) {
      case Filters.All:
        return todo && isTitleIncludeQuery;
      case Filters.Completed:
        return todo.completed && isTitleIncludeQuery;
      case Filters.Active:
        return !todo.completed && isTitleIncludeQuery;
      default:
        return todo;
    }
  })
    .filter(todo => (
      todo.title.toLowerCase().includes(optimizedQuery)
    ));
};

export const validateFilter = (filter: string) => {
  if (filter === Filters.Active) {
    return Filters.Active;
  }

  if (filter === Filters.Completed) {
    return Filters.Completed;
  }

  return Filters.All;
};
