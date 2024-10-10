import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';

export const getFilteredTodos = (todos: Todo[], filterBy: FilterType) => {
  if (filterBy === FilterType.completed) {
    return todos.filter(todo => todo.completed === true);
  } else if (filterBy === FilterType.active) {
    return todos.filter(todo => todo.completed === false);
  } else {
    return todos;
  }
};
