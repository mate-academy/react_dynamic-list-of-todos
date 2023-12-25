import { Filters } from '../enums';
import { Todo } from '../types/Todo';

type SearchParams = {
  query?: string,
  filter?: Filters,
};

export const getPreparedTodos = (
  todos: Todo[],
  { query, filter }: SearchParams,
): Todo[] => {
  let preparedTodos = [...todos];

  if (query) {
    const prepearedQuery = query.trim().toLowerCase();

    preparedTodos = preparedTodos.filter(todo => (
      todo.title.toLowerCase().includes(prepearedQuery)
    ));
  }

  if (filter) {
    preparedTodos = preparedTodos.filter(todo => {
      switch (filter) {
        case Filters.Active:
          return !todo.completed;

        case Filters.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }

  return preparedTodos;
};
