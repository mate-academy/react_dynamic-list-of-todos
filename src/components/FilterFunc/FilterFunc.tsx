import { Todo } from '../../types/Todo';
import { FilterType, SortField } from '../../types/filter';

export function getFilterFunc(
  todos: Todo[],
  { sortField, query }: FilterType,
): Todo[] {
  let copy = [...todos];

  if (query) {
    copy = copy.filter(todo => {
      const normTitle = todo.title.trim().toLowerCase();
      const normQuery = query.trim().toLowerCase();

      return normTitle.includes(normQuery);
    });
  }

  if (sortField) {
    switch (sortField) {
      case SortField.Active:
        return (copy = copy.filter(todo => todo.completed === false));
      case SortField.Completed:
        return (copy = copy.filter(todo => todo.completed === true));
      default:
        break;
    }
  }

  return copy;
}
