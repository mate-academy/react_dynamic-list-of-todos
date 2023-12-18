import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';

export const filterBy = (todos: Todo[], filter: FilterBy) => {
  let prepearedTodos = [...todos];

  if (filter) {
    switch (filter) {
      case FilterBy.active:
        prepearedTodos = todos.filter(todo => !todo.completed);
        break;
      case FilterBy.completed:
        prepearedTodos = todos.filter(todo => todo.completed);
        break;
      case FilterBy.all:
        break;
      default:
        break;
    }
  }

  return prepearedTodos;
};
