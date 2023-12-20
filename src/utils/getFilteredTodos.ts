import { SortType } from '../types/SortType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  sortType: SortType,
) => {
  let filteredTodos: Todo[] = [...todos];

  if (query.trim()) {
    filteredTodos = (todos.filter(
      todo => todo.title.toLocaleLowerCase()
        .includes(query.trim().toLocaleLowerCase()),
    ));
  }

  switch (sortType) {
    case SortType.Active:
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
      break;
    case SortType.Completed:
      filteredTodos = filteredTodos.filter(todo => todo.completed);
      break;
    case SortType.All:
    default:
      break;
  }

  return filteredTodos;
};
