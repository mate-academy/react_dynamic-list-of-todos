import { Todo } from '../types/Todo';
import { SortType } from '../enums/SortType';

export const filterTodos = (
  todos:Todo[],
  sortType:SortType,
  query:string,
) => {
  const normalQuery = query
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .join(' ');

  if (query || sortType !== SortType.All) {
    return todos.filter(todo => {
      const isTitleIncludesQuery = todo.title
        .toLowerCase()
        .includes(normalQuery);

      let currentStatus = true;

      switch (sortType) {
        case SortType.Active:
          currentStatus = todo.completed === false;
          break;

        case SortType.Completed:
          currentStatus = todo.completed === true;
          break;

        default:
          currentStatus = true;
          break;
      }

      return isTitleIncludesQuery && currentStatus;
    });
  }

  return todos;
};
