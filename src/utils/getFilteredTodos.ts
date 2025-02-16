import { FilterBy } from '../App';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filterBy: FilterBy,
  query: string,
) => {
  let filteredTodos = todos;

  if (filterBy) {
    switch (filterBy) {
      case FilterBy.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case FilterBy.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      case FilterBy.All:
      default:
        break;
    }
  }

  const trimmedQuery = query.trim().toLowerCase();

  if (trimmedQuery) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(trimmedQuery),
    );
  }

  return filteredTodos;
};
