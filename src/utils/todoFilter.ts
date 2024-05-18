import {Todo} from "../types/Todo";
import {IQuery, SortField} from "../types/Filter";


export const getFilteredTodos = (initialTodos: Todo[], query: IQuery) => {
  const { status, query: searchQuery } = query;

  return initialTodos.filter(todo => {
    const isMatchingStatus =
      status === SortField.Active
        ? !todo.completed
        : status === SortField.Completed
          ? todo.completed
          : true;
    const isMatchingSearchQuery =
      !searchQuery ||
      todo.title.toLowerCase().includes(searchQuery.toLowerCase());

    return isMatchingStatus && isMatchingSearchQuery;
  });
};
