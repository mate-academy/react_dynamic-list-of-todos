import { Todo } from './types/Todo';
import { FilterBy } from './types/FIlterBy';

export const getVisibleTodos = (
  todos:Todo[],
  value: string,
  filter: FilterBy,
) => {
  let filtered = todos;

  switch (filter) {
    case FilterBy.Active:
      filtered = todos.filter(todo => !todo.completed);
      break;

    case FilterBy.Completed:
      filtered = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return filtered.filter(todo => (
    todo.title.toLowerCase().includes(value.toLowerCase())
  ));
};
