import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const findTodos = (content: string, searchText: string) => {
  return content.toLowerCase().includes(searchText.toLowerCase().trim());
};

export const getFilteredTodos = (
  todos: Todo[],
  filterType: FilterType,
  query: string,
) => {
  const shownTodos = todos.filter(({ title }) => findTodos(title, query));

  return shownTodos.filter(todo => {
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
