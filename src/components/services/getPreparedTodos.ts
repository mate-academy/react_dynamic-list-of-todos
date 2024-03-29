import { FilterOption } from '../../types/FilterOption';
import { Todo } from '../../types/Todo';

export const getPreparedTodos = (
  todos: Todo[],
  query: string,
  filterOption: string,
) => {
  let todosCopy = [...todos];

  if (query) {
    todosCopy = todosCopy.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return todosCopy.filter(todo => {
    switch (filterOption) {
      case FilterOption.Completed:
        return todo.completed;

      case FilterOption.Active:
        return !todo.completed;

      case FilterOption.All:
      default:
        return true;
    }
  });
};
