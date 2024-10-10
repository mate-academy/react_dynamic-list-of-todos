import { FilterBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], filter: FilterBy) => {
  const filteredConditions = {
    [FilterBy.all]: () => true,
    [FilterBy.active]: (todo: Todo) => !todo.completed,
    [FilterBy.completed]: (todo: Todo) => todo.completed,
  };

  return todos.filter(filteredConditions[filter]);
};
