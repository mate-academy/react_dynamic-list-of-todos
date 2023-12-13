import { ProgressStatus } from './types/ProgressEnum';
import { Todo } from './types/Todo';

export function getTodosToRender(
  todos: Todo[],
  searchQuery: string,
  progress: string,
): Todo[] {
  const preparedQuery = searchQuery.toLowerCase();

  return todos.filter(todo => {
    switch (progress) {
      case ProgressStatus.Completed:
        return todo.completed;

      case ProgressStatus.Active:
        return !todo.completed;

      default:
        return true;
    }
  })

    .filter(todo => todo.title.toLowerCase().includes(preparedQuery));
}
