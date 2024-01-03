import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export function getPreparedTodos(
  todos: Todo[],
  query: string,
  filterType: FilterType,
) {
  let filteredTodos = todos;
  const filterTodosByQuery = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  if (query) {
    filteredTodos = filteredTodos
      .filter(({ title }) => filterTodosByQuery(title));
  }

  if (filterType) {
    switch (filterType) {
      case FilterType.Active:
        filteredTodos = filteredTodos.filter(({ completed }) => !completed);
        break;

      case FilterType.Completed:
        filteredTodos = filteredTodos.filter(({ completed }) => completed);
        break;

      default:
        break;
    }
  }

  return filteredTodos;
}
