import { Todo } from '../types/Todo';
import { TodosFilter } from '../types/TodoFilter';

export const getpreparedTodos = (
  todos: Todo[],
  query: string,
  filterState: TodosFilter,
) => {
  let filteredTodos = [...todos];

  if (query) {
    const preparedQuery = query.toLowerCase();

    filteredTodos = filteredTodos.filter(
      ({ title }) => title.toLowerCase().includes(preparedQuery),
    );
  }

  if (filterState === TodosFilter.Active) {
    filteredTodos = filteredTodos.filter(({ completed }) => !completed);
  }

  if (filterState === TodosFilter.Completed) {
    filteredTodos = filteredTodos.filter(({ completed }) => completed);
  }

  return filteredTodos;
};
