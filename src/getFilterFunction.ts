import { FilterType } from './types/FilterType';
import { SortType } from './types/SortType';
import { Todo } from './types/Todo';

export function getFilterFunction(
  todos: Todo[],
  { filter, query }: SortType,
): Todo[] {
  let copy = [...todos];

  if (query) {
    copy = copy.filter(todo => {
      const lowerTitle = todo.title.trim().toLowerCase();
      const lowerQuery = query.trim().toLowerCase();

      return lowerTitle.includes(lowerQuery);
    });
  }

  if (filter) {
    switch (filter) {
      case FilterType.Active:
        return copy.filter(todo => todo.completed === false);
      case FilterType.Completed:
        return copy.filter(todo => todo.completed === true);
      default:
        break;
    }
  }

  return copy;
}
