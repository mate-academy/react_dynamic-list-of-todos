import { Todo } from '../types/Todo';
import { TodosFilter } from '../types/todosFilter';
import { Filter } from '../types/filter';

export const handleFilter = (todos: Todo[], filters: Filter) => {
  return todos
    .filter(todo => {
      switch (filters.sortField) {
        case TodosFilter.Active:
          return !todo.completed;

        case TodosFilter.Completed:
          return todo.completed;

        case TodosFilter.All:
          return true;

        default:
          return true;
      }
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(filters.query.toLowerCase()),
    );
};
