import { Todo } from './types/Todo';
import { FilterBy } from './types/FIlterBy';

export const getVisibleTodos = (
  todos:Todo[],
  value: string,
  filter: FilterBy,
) => {
  let copy = [...todos];

  switch (filter) {
    case FilterBy.Active:
      copy = todos.filter(todo => !todo.completed);
      break;

    case FilterBy.Completed:
      copy = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return copy.filter(todo => (
    todo.title.toLowerCase().includes(value.toLowerCase())
  ));
};
