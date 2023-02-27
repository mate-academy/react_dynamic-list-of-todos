import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getFiltredTodos = (
  todos: Todo[],
  titleFilter: string,
  selectedFilter: FilterType,
) => {
  return todos.filter(todo => {
    const normalizeTodoTitle = todo.title.toLowerCase();

    const isTitleFilterMatch = titleFilter
      ? normalizeTodoTitle.includes(titleFilter.toLowerCase())
      : true;

    switch (selectedFilter) {
      case FilterType.ACTIVE:
        return !todo.completed && isTitleFilterMatch;

      case FilterType.COMPLETED:
        return todo.completed && isTitleFilterMatch;

      case FilterType.NONE:
      default:
        return isTitleFilterMatch;
    }
  });
};
