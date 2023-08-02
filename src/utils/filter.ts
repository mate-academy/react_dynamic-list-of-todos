import { FilteredBy } from '../types/FilterBy';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  { filterBy, query }: { filterBy: FilteredBy, query: string },
) {
  let preparedTodos = [...todos];

  if (filterBy === 'active') {
    preparedTodos = todos.filter(todo => !todo.completed);
  }

  if (filterBy === 'completed') {
    preparedTodos = todos.filter(todo => todo.completed);
  }

  if (query) {
    return preparedTodos.filter(todo => todo.title
      .toLowerCase()
      .includes(query.toLowerCase()));
  }

  return preparedTodos;
}
