import { Todo } from '../types/Todo';
import { FilterField } from './constants';

export const prepareTodos = (
  readyTodos: Todo[],
  title: string,
  filterField: string,
) => {
  return readyTodos.filter((todo: Todo) => {
    const titleCondition = todo.title
      .toLowerCase()
      .includes(title.toLowerCase());

    if (filterField) {
      switch (filterField) {
        case FilterField.ALL:
          return titleCondition;

        case FilterField.ACTIVE:
          return titleCondition && !todo.completed;

        case FilterField.COMPLETED:
          return titleCondition && todo.completed;

        default:
          return titleCondition;
      }
    }

    return titleCondition;
  });
};
