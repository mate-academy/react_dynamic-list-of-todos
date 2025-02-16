import { Todo } from './types/Todo';
import { Filter } from './types/filter';

interface Params {
  filter: string;
  query: string;
}

export function getFilteredTodos(todos: Todo[], { filter, query }: Params) {
  let filteredTodos = [...todos];
  const newQuery = query.trim().toLowerCase();

  switch (filter) {
    case Filter.Active:
      filteredTodos = todos.filter(todo => !todo.completed);
      break;

    case Filter.Completed:
      filteredTodos = todos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (newQuery) {
    return filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(newQuery),
    );
  }

  return filteredTodos;
}
