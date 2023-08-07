import { Filter } from './types/constants';
import { Todo } from './types/Todo';

export function getVisibleTodos(query: string, filter: Filter, todos: Todo[]) {
  let prepared = [...todos];

  if (query) {
    prepared = prepared.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (filter) {
    case Filter.Completed:
      return prepared.filter((todo) => todo.completed);
    case Filter.Active:
      return prepared.filter((todo) => !todo.completed);
    default:
      return prepared;
  }
}
