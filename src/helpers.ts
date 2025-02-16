import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export function filteredTodos(
  todos: Todo[],
  query: string,
  currentFilter: Filter,
) {
  let processedTodos;

  processedTodos = todos.filter((todo: Todo) =>
    todo.title.toLowerCase().includes(query),
  );

  switch (currentFilter) {
    case 'active':
      processedTodos = processedTodos.filter((todo: Todo) => !todo.completed);
      break;
    case 'completed':
      processedTodos = processedTodos.filter((todo: Todo) => todo.completed);
      break;
  }

  return processedTodos;
}
