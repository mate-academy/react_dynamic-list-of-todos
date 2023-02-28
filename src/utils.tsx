import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';

export const preparingTodos = (
  todos: Todo[],
  filterBy: FilterBy,
  query: string,
) => {
  let preparedTodos = todos.filter(todo => {
    switch (filterBy) {
      case FilterBy.All:
      default:
        return [];
      case FilterBy.Active:
        return todo.completed === false;
      case FilterBy.Completed:
        return todo.completed === true;
    }
  });

  const queryToLowerCase = query.toLocaleLowerCase();

  if (query) {
    preparedTodos = [...preparedTodos]
      .filter(todo => todo.title
        .toLocaleLowerCase().includes(queryToLowerCase));
  }

  return preparedTodos;
};
