import { SortType } from '../types/SortType';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  sortType: SortType,
  query: string,
): Todo[] => {
  let filtered = todos;

  switch (sortType) {
    case SortType.Active:
      filtered = todos.filter(todo => !todo.completed);
      break;

    case SortType.Completed:
      filtered = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return filtered.filter(todo => (
    todo.title.toLowerCase().includes(query.toLowerCase())
  ));
};
