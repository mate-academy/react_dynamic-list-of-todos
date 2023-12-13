import { ProgressStatus } from './types/ProgressEnum';
import { Todo } from './types/Todo';

function includesIgnoreCase(str: string, query: string) {
  return str.toLowerCase().includes(query);
}

export function getTodosToRender(
  todos: Todo[],
  searchQuery: string,
  progress: ProgressStatus,
): Todo[] {
  const preparedQuery = searchQuery.toLocaleLowerCase();

  return todos.filter(todo => {
    switch (progress) {
      case ProgressStatus.Completed:
        return todo.completed && includesIgnoreCase(todo.title, preparedQuery);

      case ProgressStatus.Active:
        return !todo.completed && includesIgnoreCase(todo.title, preparedQuery);

      default:
        return includesIgnoreCase(todo.title, preparedQuery);
    }
  });
}
