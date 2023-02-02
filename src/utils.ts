import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';

export const getVisibleTodos = (
  todos: Todo[],
  filterType: FilterType,
  query: string,
) => {
  const regex = new RegExp(query, 'i');

  return todos.filter(({ title, completed }) => {
    switch (filterType) {
      case FilterType.ALL:
        return regex.test(title);
      case FilterType.ACTIVE:
        return !completed && regex.test(title);
      case FilterType.COMPLETED:
        return completed && regex.test(title);
      default:
        throw new Error('Invalid filterType');
    }
  });
};
