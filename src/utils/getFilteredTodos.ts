import { SelectStatus } from '../enums/SelectStatus';
import { Todo } from '../types/Todo';

type FilterOptions = {
  query: string;
  todosStatus: SelectStatus;
};

export const getFilteredTodos = (
  todos: Todo[],
  option: FilterOptions,
) => {
  const {
    todosStatus,
    query,
  } = option;

  let filteredTodos = [...todos];

  if (todosStatus !== SelectStatus.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (todosStatus) {
        case SelectStatus.Active:
          return !todo.completed;

        case SelectStatus.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => {
      const { title } = todo;
      const lowerQuery = query.toLocaleLowerCase();

      return title.toLowerCase().includes(lowerQuery);
    });
  }

  return filteredTodos;
};
