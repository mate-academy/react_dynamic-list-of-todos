import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  filterBy: FilterBy,
) => {
  let newTodos = [...todos];

  if (query) {
    const newQuery = query.toLowerCase().trim();

    newTodos = newTodos.filter(todo => (
      todo.title.toLowerCase().includes(newQuery)
    ));
  }

  switch (filterBy) {
    case TodoStatus.Active:
      return newTodos.filter(todo => !todo.completed);
    case TodoStatus.Completed:
      return newTodos.filter(todo => todo.completed);
    default:
      break;
  }

  return newTodos;
};

export function makeFirstToUpperCase(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
