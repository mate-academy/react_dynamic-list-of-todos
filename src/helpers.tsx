import { Todo } from './types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  filterParam: string,
  query: string,
) {
  let result = [];

  switch (filterParam) {
    case 'active':
      result = todos.filter(todo => !todo.completed);
      break;

    case 'completed':
      result = todos.filter(todo => todo.completed);
      break;

    default:
      result = todos;
      break;
  }

  return !query.trim()
    ? result
    : result.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
}
