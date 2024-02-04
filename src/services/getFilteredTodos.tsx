import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export function getFilteredTodos(todos: Todo[], query: string, status: string) {
  let todosFilter = todos.filter(todo => {
    switch (status) {
      case Status.Active:
        return todo.completed === false;
      case Status.Completed:
        return todo.completed === true;
      default:
        return true;
    }
  });

  if (query) {
    todosFilter = todosFilter.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return todosFilter;
}
