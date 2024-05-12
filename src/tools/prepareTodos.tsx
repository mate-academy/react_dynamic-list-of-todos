import { Todo } from '../types/Todo';
import { FilterField } from './constants';

export const prepareTodos = (
  readyTodos: Todo[],
  title: string,
  filterField: string,
) => {
  const filteredTodos = readyTodos.filter((todo: Todo) =>
    todo.title.toLowerCase().includes(title.toLowerCase()),
  );

  if (filterField) {
    switch (filterField) {
      case FilterField.ALL:
        return filteredTodos;

      case FilterField.ACTIVE:
        return filteredTodos.filter(todo => !todo.completed);

      case FilterField.COMPLETED:
        return filteredTodos.filter(todo => todo.completed);

      default:
        return filteredTodos;
    }
  }

  return filteredTodos;
};
