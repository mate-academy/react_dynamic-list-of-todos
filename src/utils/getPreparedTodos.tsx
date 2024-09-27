import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function getPreparedTodos(
  todos: Todo[],
  filter: Filter,
  query: string,
): Todo[] {
  let preparedTodos;

  switch (filter) {
    case Filter.ACTIVE:
      preparedTodos = todos.filter(todo => !todo.completed);
      break;
    case Filter.COMPLETED:
      preparedTodos = todos.filter(todo => todo.completed);
      break;
    default:
      preparedTodos = todos;
  }

  if (query) {
    preparedTodos = preparedTodos.filter(todo => {
      return todo.title.toLowerCase().includes(query.toLowerCase());
    });
  }

  return preparedTodos;
}
