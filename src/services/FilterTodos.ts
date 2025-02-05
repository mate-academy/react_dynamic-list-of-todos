import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], selectedFilters: Filter) => {
  return todos
    .filter(todo =>
      todo.title.toLowerCase().includes(selectedFilters.query.toLowerCase()),
    )
    .filter(todo => {
      if (selectedFilters.status === 'all') {
        return true;
      }

      return selectedFilters.status === 'completed'
        ? todo.completed
        : !todo.completed;
    });
};
