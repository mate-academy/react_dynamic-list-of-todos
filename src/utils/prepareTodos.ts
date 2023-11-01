import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const prepareTodos = (
  filter: FilterType,
  query: string,
  todos: Todo[],
) => {
  let filteredTodos = [...todos];

  if (filter) {
    switch (filter) {
      case FilterType.Active:
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case FilterType.Completed:
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => {
      const normaliedQuery = query.toLowerCase().trim();

      return todo.title.toLowerCase().includes(normaliedQuery);
    });
  }

  return filteredTodos;
};
