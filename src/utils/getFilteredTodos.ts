import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todosFromServer: Todo[],
  filterBy: FilterType,
  query: string,
) => {
  let filteredTodos = [...todosFromServer];

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (filterBy) {
    case FilterType.Active:
      return filteredTodos.filter(todo => !todo.completed);

    case FilterType.Completed:
      return filteredTodos.filter(todo => todo.completed);

    default:
      return filteredTodos;
  }
};
