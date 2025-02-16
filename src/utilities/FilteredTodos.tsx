import { FilterTodoBy } from '../components/TodoFilter';
import { Todo } from '../types/Todo';

export const FilteredTodos = (
  todos: Todo[],
  query: string,
  filterBy: FilterTodoBy,
) => {
  let filteredTodos = [...todos];

  if (filterBy) {
    switch (filterBy) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      case 'all':
      default:
        break;
    }
  }

  const normalizedQuery = query.trim().toLowerCase();

  if (normalizedQuery) {
    filteredTodos = filteredTodos.filter(todo => {
      const normalizedTodoTitle = todo.title.trim().toLowerCase();

      return normalizedTodoTitle.includes(normalizedQuery);
    });
  }

  return filteredTodos;
};
