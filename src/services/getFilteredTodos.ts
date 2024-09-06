import { CompletedStatus } from '../types/CompletedStatus';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  completedStatus: CompletedStatus,
  query: string,
) {
  let filteredTodos = [...todos];

  if (completedStatus !== CompletedStatus.All) {
    filteredTodos = filteredTodos.filter(todo => {
      return completedStatus === CompletedStatus.Completed
        ? todo.completed
        : !todo.completed;
    });
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return filteredTodos;
}
