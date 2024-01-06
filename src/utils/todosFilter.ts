import { Filter, SortType } from '../types/Filter';
import { Todo } from '../types/Todo';

export const todosFilter = (todos: Todo[], { sortBy, query }: SortType) => {
  let res = [...todos];
  const prepearedQuery = query.trim().toLowerCase();

  switch (sortBy) {
    case Filter.Active:
      res = res.filter(todo => !todo.completed);
      break;

    case Filter.Completed:
      res = res.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (prepearedQuery) {
    return res
      .filter(todo => todo.title.toLowerCase().includes(prepearedQuery));
  }

  return res;
};
