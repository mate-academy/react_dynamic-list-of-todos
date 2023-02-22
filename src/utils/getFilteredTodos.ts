import { FilterBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filterBy: FilterBy,
  query: string,
) => {
  let allTodos = todos.filter(todo => {
    switch (filterBy) {
      case FilterBy.ACTIVE:
        return !todo.completed;
      case FilterBy.COMPLETE:
        return todo.completed;
      default:
        return true;
    }
  });

  if (query) {
    const lowerCaseQuery = query.toLowerCase();

    allTodos = allTodos.filter(todo => {
      return todo.title.toLowerCase().includes(lowerCaseQuery);
    });
  }

  return allTodos;
};
