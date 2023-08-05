import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export function getVisibleTodos(todos: Todo[], filter: Filter, query: string) {
  let prepared = [...todos];

  if (query.trim()) {
    prepared = prepared
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  }

  switch (filter) {
    case Filter.Active:
      return prepared.filter((todo) => !todo.completed);
    case Filter.Completed:
      return prepared.filter((todo) => todo.completed);
    default:
      return prepared;
  }
}
