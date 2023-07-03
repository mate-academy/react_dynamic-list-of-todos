import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  filter: FilterBy,
) => {
  let todosToFilter = todos;

  switch (filter) {
    case FilterBy.Active:
      todosToFilter = todos.filter(todo => !todo.completed);
      break;

    case FilterBy.Completed:
      todosToFilter = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return todosToFilter.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));
};
