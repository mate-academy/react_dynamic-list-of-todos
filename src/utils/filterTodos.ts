import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';
import { FilterParams } from './FilterParams';

export const filterTodos = (filter: Filters, todos: Todo[]) => {
  const { select, query } = filter;
  let visibleTodos = [...todos];
  const normalaziedQuery = query.toLowerCase();

  switch (select) {
    case FilterParams.Active:
      visibleTodos = visibleTodos.filter(({ completed, title }) => (
        !completed
        && title.toLowerCase().includes(normalaziedQuery)));
      break;

    case FilterParams.Completed:
      visibleTodos = visibleTodos.filter(({ completed, title }) => {
        return completed
          && title.toLowerCase().includes(normalaziedQuery);
      });
      break;

    default:
      break;
  }

  return visibleTodos;
};
