import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const flterByTypes = (type: string, todos: Todo[], query: string) => {
  let filtered = todos;

  switch (type) {
    case FilterType.active:
      filtered = todos.filter(todo => !todo.completed);
      break;
    case FilterType.completed:
      filtered = todos.filter(todo => todo.completed);
      break;
    default:
      filtered = todos;
      break;
  }

  if (query) {
    filtered = filtered.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filtered;
};
