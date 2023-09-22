import { Todo } from './types/Todo';
import { FilterOptions } from './types/FilterOptions';

export const getVisibleTodos = (todos: Todo[],
  filteredOption: FilterOptions, typedTitle: string) => {
  let filteredTodos;

  if (filteredOption === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (filteredOption === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else {
    filteredTodos = todos;
  }

  return filteredTodos.filter((todo) => (
    todo.title.toLowerCase().includes(typedTitle.trim().toLowerCase())
  ));
};
