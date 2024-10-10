import { Todo } from '../../types/Todo';
import { FilterOption } from '../../enums/filter-options';

export const getFilteredTodos = (
  todos: Todo[],
  filterOption: FilterOption,
): Todo[] => {
  switch (filterOption) {
    case FilterOption.active:
      return todos.filter(todo => !todo.completed);
    case FilterOption.completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
