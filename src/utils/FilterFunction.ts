import { FilterType } from '../types/FilterTypes';
import { Todo } from '../types/Todo';

export const preparedTodos = (
  todos: Todo[],
  query: string,
  filterType: FilterType,
) => {
  let copyTodos = [...todos];

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    copyTodos = copyTodos.filter(
      todo => todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  if (filterType) {
    switch (filterType) {
      case FilterType.Active:
        copyTodos = copyTodos.filter(todo => !todo.completed);
        break;

      case FilterType.Completed:
        copyTodos = copyTodos.filter(todo => todo.completed);
        break;

      case FilterType.All:
      default:
        return copyTodos;
    }
  }

  return copyTodos;
};
