import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

export const getFilteredTodos = (
  todos: Todo[],
  filterType: FilterType,
  query: string,
) => {
  const copyVisibleTodos = [...todos];

  const searchedTodos = copyVisibleTodos.filter(({ title }) => {
    return title.toLowerCase().includes(query.toLowerCase().trim());
  });

  return searchedTodos.filter((todo) => {
    switch (filterType) {
      case FilterType.ACTIVE:
        return !todo.completed;

      case FilterType.COMPLETED:
        return todo.completed;

      default:
        return todo;
    }
  });
};
