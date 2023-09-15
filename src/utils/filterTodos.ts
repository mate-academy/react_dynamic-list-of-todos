import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';
import { FilterParams } from './FilterParams';

export const filterTodos = (filter: Filters, todos: Todo[]) => {
  const { select, query } = filter;
  let visibleTodos = [...todos];
  const normalaziedQuery = query.toLowerCase();

  if (query) {
    visibleTodos = visibleTodos.filter(({ title }) => (
      title.toLowerCase().includes(normalaziedQuery)));
  }

  switch (select) {
    case FilterParams.Active:
      visibleTodos = visibleTodos.filter(({ completed }) => !completed);
      break;

    case FilterParams.Completed:
      visibleTodos = visibleTodos.filter(({ completed }) => {
        return completed;
      });
      break;

    default:
      break;
  }

  return visibleTodos;
};
