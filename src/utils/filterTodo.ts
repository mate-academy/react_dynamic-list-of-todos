import { ITodoFilter, Todo } from '../types/Todo';
import { FilterStatuses } from './enums/FiltersStatus';

export const getFiltredTodo = (
  todos: Todo[],
  { status, filter }: ITodoFilter,
) => {
  let filteredTodos = todos.filter(({ title }) =>
    title.toLowerCase().trim().includes(filter),
  );

  filteredTodos = filteredTodos.filter(({ completed }) => {
    switch (status) {
      case FilterStatuses.Active:
        return !completed;
      case FilterStatuses.Completed:
        return completed;
      default:
        return true;
    }
  });

  return filteredTodos;
};
