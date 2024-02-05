import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function getFilteredTodos(todos:Todo[], filter: Filter) {
  return todos.filter(
    todo => todo.title
      .toLowerCase().includes(filter.title.toLowerCase())
  && (filter.status === 'all'
  || (filter.status === 'active' && !todo.completed)
  || (filter.status === 'completed' && todo.completed)),
  );
}
